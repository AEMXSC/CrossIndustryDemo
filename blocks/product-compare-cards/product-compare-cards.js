export default function decorate(block) {
  // 1. Determine the environment
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const authorBase = 'https://author-p153659-e1796191.adobeaemcloud.com';
  
  const rows = [...block.children];
  if (!rows.length) return;

  const grid = document.createElement('div');
  grid.classList.add('compare-grid');

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 8) return;

    // Destructure columns to keep UE metadata intact
    const [icon, colorField, titleEl, descriptionEl, productModelEl, specsEl, ctaTextEl, ctaStyleEl] = cols;

    // Create Image Wrapper
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('compare-card__image');
    const img = document.createElement('img');
    imageWrapper.append(img);

    // Function to update the source based on environment
    const updateImage = (colorHex) => {
      const cleanColor = colorHex.replace('#', '');
      const cleanTitle = titleEl.textContent.trim().replace(/[^a-zA-Z0-9]/g, '').replace('inch', '');
      const cleanModel = productModelEl.textContent.trim().split('·')[0].replace(/[^a-zA-Z0-9]/g, '');
      
      const fileName = `product_${cleanTitle}_${cleanModel}_${cleanColor}.png`;
      const path = `/content/dam/dept-crossIndustry/hi-tech-images/${fileName}`;
      
      // If on localhost, add the Author URL prefix
      img.src = isLocalhost ? `${authorBase}${path}` : path;
      img.alt = titleEl.textContent.trim();
    };

    // Swatch Logic
    const swatchWrapper = document.createElement('div');
    swatchWrapper.classList.add('compare-card__swatches');
    
    const colors = [...colorField.querySelectorAll('li')].map(li => li.textContent.trim());
    colors.forEach((color, index) => {
      const swatch = document.createElement('span');
      swatch.classList.add('compare-swatch');
      swatch.style.backgroundColor = color;
      swatch.addEventListener('click', () => updateImage(color));
      
      if (index === 0) updateImage(color); // Set initial image
      swatchWrapper.append(swatch);
    });

    // Final Assembly (Moving elements to preserve UE Authoring)
    row.classList.add('compare-card');
    
    // Add classes to existing elements
    titleEl.classList.add('compare-card__title');
    descriptionEl.classList.add('compare-card__desc');
    productModelEl.classList.add('compare-card__model');
    specsEl.classList.add('compare-card__specs');

    // Re-structure the row
    row.replaceChildren(
      imageWrapper,
      swatchWrapper,
      titleEl,
      descriptionEl,
      productModelEl,
      specsEl
    );

    grid.append(row);
  });

  block.replaceChildren(grid);
}