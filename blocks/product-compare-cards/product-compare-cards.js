export default function decorate(block) {

    try {

        const rows = [...block.children];
        block.innerHTML = '';

        if (!rows.length) return;


        const grid = document.createElement('div');
        grid.classList.add('compare-grid');

        rows?.forEach((row) => {
            const cols = [...row.children];
            if (cols.length < 8) return; // Prevent crash

            const image = cols[0];
            const colorField = cols[1];
            const title = cols[2];
            const description = cols[3];
            const productModel = cols[4];
            const specs = cols[5];
            const ctaText = cols[6];
            const ctaStyle = cols[7];

            const colors = colorField
                ? [...colorField.querySelectorAll('li')].map(li => li.textContent.trim())
                : [];

            const swatchesHTML = colors
                ?.map(color => `<span class="compare-swatch" style="background:${color}"></span>`)
                ?.join('');

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

      ${productModel && productModel.textContent.trim() ? `
        <div class="compare-card__model">
          ${productModel.textContent.trim()}
        </div>
      ` : ''}

      <div class="compare-card__specs">
        ${specs ? specs.innerHTML : ''}
      </div>

      <div class="compare-card__cta">
        <a href="#" class="${ctaStyle ? ctaStyle.textContent.trim() : 'button-dark'}">
          ${ctaText ? ctaText.textContent.trim() : 'Add to Cart'}
        </a>
      </div>
    `;

            grid?.appendChild(card);
        });

        block?.appendChild(grid);
    }catch(error){
        console.log(error);
    }

}