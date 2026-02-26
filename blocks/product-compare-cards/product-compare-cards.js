export default function decorate(block) {
    const rows = [...block.children];
    block.innerHTML = '';

    const grid = document.createElement('div');
    grid.classList.add('compare-grid');

    rows.forEach((row) => {
        const cols = [...row.children];

        const image = cols[0];
        const colorField = cols[1];
        const title = cols[2];
        const description = cols[3];
        const specs = cols[4];
        const ctaText = cols[5];
        const ctaStyle = cols[6];

        /* Handle comma separated colors */
        const colors = colorField
            ? [...colorField.querySelectorAll('li')].map(li => li.textContent.trim())
            : [];

        const swatchesHTML = colors
            .map(color => `<span class="compare-swatch" style="background:${color}"></span>`)
            .join('');

        const card = document.createElement('div');
        card.classList.add('compare-card');

        card.innerHTML = `
      <div class="compare-card__image">
        ${image ? image.innerHTML : ''}
      </div>

      <div class="compare-card__swatches">
        ${swatchesHTML}
      </div>

      <h3 class="compare-card__title">
        ${title ? title.textContent : ''}
      </h3>

      <p class="compare-card__desc">
        ${description ? description.textContent : ''}
      </p>

      <div class="compare-card__specs">
        ${specs ? specs.innerHTML : ''}
      </div>

      <div class="compare-card__cta">
        <a href="#" class="${ctaStyle ? ctaStyle.textContent.trim() : 'button-dark'}">
          ${ctaText ? ctaText.textContent.trim() : 'Add to Cart'}
        </a>
      </div>
    `;

        grid.appendChild(card);
    });

    block.appendChild(grid);
}