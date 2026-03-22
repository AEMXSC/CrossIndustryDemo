import { readBlockConfig } from '../../scripts/aem.js';

const DEFAULT_PUBLISH_ORIGIN = 'https://publish-p153659-e1796191.adobeaemcloud.com';
const DEFAULT_API_PATH = '/graphql/execute.json/global/product-index-component';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const DEFAULT_VISIBLE_COUNT = 5;

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizePath(path) {
  if (!path) return DEFAULT_API_PATH;
  return path.startsWith('/') ? path : `/${path}`;
}

function sanitizeOrigin(origin) {
  if (!origin) return DEFAULT_PUBLISH_ORIGIN;
  return origin.endsWith('/') ? origin.slice(0, -1) : origin;
}

function getResolvedEndpoint(config) {
  const configuredOrigin = sanitizeOrigin(config['publish-origin']);
  const configuredPath = sanitizePath(config['api-path']);
  return `${configuredOrigin}${configuredPath}`;
}

function arrayValue(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function asHtml(value) {
  if (value && typeof value === 'object' && typeof value.html === 'string') return value.html;
  if (typeof value === 'string') return escapeHtml(value);
  return '';
}

function asText(value) {
  if (value && typeof value === 'object' && typeof value.html === 'string') {
    return value.html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }
  return typeof value === 'string' ? value : '';
}

function getModelFromPayload(payload) {
  const data = payload?.data;
  if (!data || typeof data !== 'object') return null;

  const firstRoot = Object.values(data).find((entry) => entry && typeof entry === 'object');
  if (!firstRoot) return null;

  if (Array.isArray(firstRoot.items) && firstRoot.items.length) {
    return firstRoot.items[0];
  }

  if (Array.isArray(firstRoot) && firstRoot.length) {
    return firstRoot[0];
  }

  return firstRoot;
}

function normalizeEntries(model) {
  if (!model || typeof model !== 'object') return [];

  if (Array.isArray(model.products)) {
    return model.products
      .map((entry, index) => ({
        id: entry?.id || `${index}`,
        code: entry?.code || entry?.productCode || '',
        title: entry?.title || entry?.name || '',
        subtitle: entry?.subtitle || entry?.description || '',
      }))
      .filter((entry) => entry.title || entry.code || entry.subtitle);
  }

  const cardNoLabel = arrayValue(model.cardNoLabel);
  const cardTitleLabel = arrayValue(model.cardTitleLabel);
  const cardDescriptionLabel = arrayValue(model.cardDescriptionLabel);

  return cardNoLabel.map((code, index) => ({
    id: `${index}`,
    code: asText(code),
    title: asText(cardTitleLabel[index]),
    subtitle: asText(cardDescriptionLabel[index]),
  }));
}

async function fetchIndexData(config) {
  const endpoint = getResolvedEndpoint(config);
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to load product index: ${response.status}`);
  }

  const payload = await response.json();
  const model = getModelFromPayload(payload);

  return {
    heading: asText(model?.titleLabel || model?.title || model?.heading || ''),
    description: asHtml(model?.descriptionLabel || model?.description || ''),
    entries: normalizeEntries(model),
  };
}

function buildEntryCard(entry) {
  return `<button class="product-index-chip" type="button" aria-label="${escapeHtml(entry.title || entry.code)}">
    <span class="product-index-chip-code">${escapeHtml(entry.code || '')}</span>
    <span class="product-index-chip-title">${escapeHtml(entry.title || '')}</span>
    <span class="product-index-chip-subtitle">${escapeHtml(entry.subtitle || '')}</span>
  </button>`;
}

function renderEntries(container, entries, visibleCount) {
  container.innerHTML = entries
    .slice(0, visibleCount)
    .map((entry) => buildEntryCard(entry))
    .join('');
}

function matchEntry(entry, activeLetter, searchTerm) {
  const title = (entry.title || '').trim();
  const subtitle = (entry.subtitle || '').trim();
  const code = (entry.code || '').trim();
  const source = `${title} ${subtitle} ${code}`.toLowerCase();

  const matchesSearch = !searchTerm || source.includes(searchTerm);
  const startsWithLetter = !activeLetter || (title[0] || '').toUpperCase() === activeLetter;
  return matchesSearch && startsWithLetter;
}

function toggleSelectedLetter(alphabetContainer, activeLetter) {
  const buttons = alphabetContainer.querySelectorAll('.product-index-letter');
  buttons.forEach((button) => {
    const isActive = button.dataset.letter === activeLetter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function buildAlphabet(container) {
  container.innerHTML = ALPHABET.map((letter) => (
    `<button class="product-index-letter" data-letter="${letter}" type="button" aria-pressed="false">${letter}</button>`
  )).join('');
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const visibleCount = Number.parseInt(config['max-items'], 10) || DEFAULT_VISIBLE_COUNT;

  block.innerHTML = `
    <div class="product-index-shell">
      <div class="product-index-copy">
        <h2 class="product-index-title"></h2>
        <div class="product-index-description"></div>
      </div>
      <div class="product-index-search-wrap">
        <input class="product-index-search" type="search" placeholder="Looking for a product?" aria-label="Search products" />
        <span class="product-index-search-icon" aria-hidden="true">⌕</span>
      </div>
      <div class="product-index-alphabet" role="group" aria-label="Filter products by first letter"></div>
      <div class="product-index-results"></div>
      <div class="product-index-footer">
        <button class="product-index-view-all" type="button">View all</button>
      </div>
    </div>
  `;

  const titleEl = block.querySelector('.product-index-title');
  const descEl = block.querySelector('.product-index-description');
  const searchEl = block.querySelector('.product-index-search');
  const alphabetEl = block.querySelector('.product-index-alphabet');
  const resultsEl = block.querySelector('.product-index-results');
  const viewAllButton = block.querySelector('.product-index-view-all');

  buildAlphabet(alphabetEl);

  let state = {
    allEntries: [],
    activeLetter: '',
    searchTerm: '',
    expanded: false,
  };

  const applyFilters = () => {
    const filtered = state.allEntries.filter((entry) => matchEntry(entry, state.activeLetter, state.searchTerm));
    const count = state.expanded ? filtered.length : visibleCount;
    renderEntries(resultsEl, filtered, count);

    if (!filtered.length) {
      resultsEl.innerHTML = '<p class="product-index-empty">No products found.</p>';
    }

    if (filtered.length <= visibleCount) {
      viewAllButton.style.display = 'none';
      return;
    }

    viewAllButton.style.display = 'inline-flex';
    viewAllButton.textContent = state.expanded ? 'View less' : 'View all';
  };

  alphabetEl.addEventListener('click', (event) => {
    const button = event.target.closest('.product-index-letter');
    if (!button) return;

    const { letter } = button.dataset;
    state.activeLetter = state.activeLetter === letter ? '' : letter;
    state.expanded = false;
    toggleSelectedLetter(alphabetEl, state.activeLetter);
    applyFilters();
  });

  searchEl.addEventListener('input', () => {
    state.searchTerm = searchEl.value.trim().toLowerCase();
    state.expanded = false;
    applyFilters();
  });

  viewAllButton.addEventListener('click', () => {
    state.expanded = !state.expanded;
    applyFilters();
  });

  try {
    const data = await fetchIndexData(config);
    titleEl.innerHTML = escapeHtml(data.heading || 'Product index');
    descEl.innerHTML = data.description || '';

    state = {
      ...state,
      allEntries: data.entries,
    };

    applyFilters();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    titleEl.textContent = 'Product index';
    descEl.innerHTML = '<p>Unable to load product data at the moment.</p>';
    resultsEl.innerHTML = '<p class="product-index-empty">Please try again later.</p>';
    viewAllButton.style.display = 'none';
  }
}
