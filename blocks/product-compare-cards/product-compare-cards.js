
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const colors = ['red', 'blue', 'black', 'white'];
  let currentColorIndex = 0;

  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'cards-container';

  [...block.children].forEach((cardColumn) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Apply initial color
    card.style.backgroundColor = colors[currentColorIndex];

    // Add color plate
    const colorPlate = document.createElement('div');
    colorPlate.className = 'color-plate';
    colorPlate.innerHTML = `
      <div class="color-option" style="background-color: red;"></div>
      <div class="color-option" style="background-color: blue;"></div>
      <div class="color-option" style="background-color: black;"></div>
      <div class="color-option" style="background-color: white;"></div>
    `;

    // Add event listeners to color options
    colorPlate.querySelectorAll('.color-option').forEach((option) => {
      option.addEventListener('click', () => {
        card.style.backgroundColor = option.style.backgroundColor;
      });
    });

    // Move card content
    while (cardColumn.firstElementChild) {
      card.appendChild(cardColumn.firstElementChild);
    }

    // Add color plate to card
    card.appendChild(colorPlate);

    // Move instrumentation
    moveInstrumentation(cardColumn, card);

    // Add card to container
    cardsContainer.appendChild(card);

    // Update color index for next card
    currentColorIndex = (currentColorIndex + 1) % colors.length;
  });

  // Replace block content
  block.replaceChildren(cardsContainer);
}
    