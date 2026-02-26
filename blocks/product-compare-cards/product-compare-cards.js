// export default function decorate(block) {
//   const rows = [...block.children];

//   block.innerHTML = '';

//   const grid = document.createElement('div');
//   grid.classList.add('product-compare-cards__grid');

//   rows.forEach((row) => {
//     const columns = [...row.children];

//     const image = columns[0];
//     const title = columns[1];
//     const description = columns[2];
//     const specs = columns[3];
//     const ctaText = columns[4];
//     const ctaStyle = columns[5];

//     const card = document.createElement('div');
//     card.classList.add('product-card');

//     card.innerHTML = `
//       <div class="product-card__image">
//         ${image ? image.innerHTML : ''}
//       </div>

//       <h3 class="product-card__title">
//         ${title ? title.textContent : ''}
//       </h3>

//       <div class="product-card__description">
//         ${description ? description.innerHTML : ''}
//       </div>

//       <div class="product-card__specs">
//         ${specs ? specs.innerHTML : ''}
//       </div>

//       <div class="product-card__cta">
//         <a href="#" class="${ctaStyle ? ctaStyle.textContent.trim() : 'button'}">
//           ${ctaText ? ctaText.textContent.trim() : 'Learn More'}
//         </a>
//       </div>
//     `;

//     grid.appendChild(card);
//   });

//   block.appendChild(grid);
// }