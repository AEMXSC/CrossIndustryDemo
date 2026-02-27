export default function decorate(block) {
  try {
    const rows = [...block.children];
    if (!rows.length) return;

    const grid = document.createElement('div');
    grid.classList.add('compare-grid');

    rows.forEach((row) => {
      const cols = [...row.children];
      if (cols.length < 8) return;

      const colorField = cols[1];
      const titleEl = cols[2];
      const descriptionEl = cols[3];
      const productModelEl = cols[4];
      const specsEl = cols[5];
      const ctaTextEl = cols[6];
      const ctaStyleEl = cols[7];

      const titleText = titleEl?.textContent.trim() || '';
      const modelText = productModelEl?.textContent.trim() || '';

      // Clean title + model for image name
      const cleanTitle = titleText.replace(/[^a-zA-Z0-9]/g, '');
      const cleanModel = modelText.split('·')[0].replace(/[^a-zA-Z0-9]/g, '');

      // Create card container
      const card = document.createElement('div');
      card.classList.add('compare-card');

      // ---- IMAGE ----
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('compare-card__image');

      const img = document.createElement('img');
      imageWrapper.appendChild(img);

      // ---- SWATCHES ----
      const swatchWrapper = document.createElement('div');
      swatchWrapper.classList.add('compare-card__swatches');

      const colors = colorField
        ? [...colorField.querySelectorAll('li')].map(li => li.textContent.trim())
        : [];

      function updateImage(colorHex) {
        const cleanColor = colorHex.replace('#', '');
        const imageName = `_${cleanTitle}_${cleanModel}_${cleanColor}`;
        img.src = `/images/${imageName}.png`;
        img.alt = titleText;
      }

      colors.forEach((color, index) => {
        const swatch = document.createElement('span');
        swatch.classList.add('compare-swatch');
        swatch.style.background = color;

        swatch.addEventListener('click', () => {
          updateImage(color);
        });

        // Load first image by default
        if (index === 0) {
          updateImage(color);
        }

        swatchWrapper.appendChild(swatch);
      });

      // ---- TITLE ----
      const title = document.createElement('h3');
      title.classList.add('compare-card__title');
      title.textContent = titleText;

      // ---- DESCRIPTION ----
      const desc = document.createElement('p');
      desc.classList.add('compare-card__desc');
      desc.textContent = descriptionEl?.textContent.trim() || '';

      // ---- MODEL BADGE ----
      const modelBadge = document.createElement('div');
      modelBadge.classList.add('compare-card__model');
      modelBadge.textContent = modelText;

      // ---- SPECS ----
      const specs = document.createElement('div');
      specs.classList.add('compare-card__specs');
      if (specsEl) {
        specs.append(...specsEl.children);
      }

      // ---- CTA ----
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('compare-card__cta');

      const cta = document.createElement('a');
      cta.href = '#';
      cta.textContent = ctaTextEl?.textContent.trim() || 'Add to Cart';
      cta.className = ctaStyleEl?.textContent.trim() || 'button-dark';

      ctaWrapper.appendChild(cta);

      // ---- Assemble Card ----
      card.append(
        imageWrapper,
        swatchWrapper,
        title,
        desc,
        modelBadge,
        specs,
        ctaWrapper
      );

      grid.appendChild(card);
    });

    block.textContent = ''; // safer than innerHTML
    block.appendChild(grid);

  } catch (error) {
    console.error('Compare Block Error:', error);
  }
}