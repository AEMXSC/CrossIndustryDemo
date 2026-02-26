export default function decorate(block) {
  const cards = [...block.children];

  block.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('product-compare-cards__grid');

  cards.forEach((card) => {
    const image = card.querySelector('[data-name="image"]');
    const title = card.querySelector('[data-name="title"]');
    const description = card.querySelector('[data-name="description"]');
    const specs = card.querySelector('[data-name="specs"]');
    const ctaText = card.querySelector('[data-name="ctaText"]');
    const ctaStyle = card.querySelector('[data-name="ctaStyle"]');

    const newCard = document.createElement('div');
    newCard.classList.add('product-card');

    newCard.innerHTML = `
      <div class="product-card__image">
        ${image ? image.innerHTML : ''}
      </div>
      <h3 class="product-card__title">
        ${title ? title.textContent : ''}
      </h3>
      <div class="product-card__description">
        ${description ? description.innerHTML : ''}
      </div>
      <div class="product-card__specs">
        ${specs ? specs.innerHTML : ''}
      </div>
      <div class="product-card__cta">
        <a href="#" class="${ctaStyle ? ctaStyle.textContent : 'button'}">
          ${ctaText ? ctaText.textContent : 'Learn More'}
        </a>
      </div>
    `;

    container.appendChild(newCard);
  });

  block.appendChild(container);
}