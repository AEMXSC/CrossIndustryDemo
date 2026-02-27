export default function decorate(block) {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  // Switched to your provided publish URL for more stable asset delivery
  const authorBase = 'https://publish-p153659-e1796191.adobeaemcloud.com';
  
  const blockName = block.classList[0];
  const firstRow = block.querySelector(':scope > div');
  const potentialTitle = firstRow?.children.length < 8 ? firstRow.textContent.trim() : '';

  const cleanSuffix = potentialTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-') 
    .substring(0, 20);

  block.id = cleanSuffix ? `${blockName}-${cleanSuffix}` : blockName;

  const rows = [...block.children];
  if (!rows.length) return;

  const grid = document.createElement('div');
  grid.classList.add('compare-grid');

  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length < 8) return;

    const [icon, colorField, titleEl, descriptionEl, productModelEl, specsEl, ctaTextEl, ctaStyleEl] = cols;

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('compare-card__image');
    const img = document.createElement('img');
    imageWrapper.append(img);

    const updateImage = (colorHex) => {
      const cleanColor = colorHex.replace('#', '');
      const cleanTitle = titleEl.textContent.trim().replace(/[^a-zA-Z0-9]/g, '').replace('inch', '');
      const cleanModel = productModelEl.textContent.trim().split('·')[0].replace(/[^a-zA-Z0-9]/g, '');
      
      const fileName = `product_${cleanTitle}_${cleanModel}_${cleanColor}.png`;
      const path = `/content/dam/dept-crossIndustry/hi-tech-images/${fileName}`;
      
      img.src = isLocalhost ? `${authorBase}${path}` : path;
      img.alt = titleEl.textContent.trim();
    };

    // --- UPDATED SWATCH LOGIC ---
    const swatchWrapper = document.createElement('div');
    swatchWrapper.classList.add('compare-card__swatches');
    
    const colors = [...colorField.querySelectorAll('li')].map(li => li.textContent.trim());
    colors.forEach((color, index) => {
      const swatch = document.createElement('span');
      swatch.classList.add('compare-swatch');
      swatch.style.backgroundColor = color;
      
      swatch.addEventListener('click', () => {
        // Remove active class from other swatches in this specific card
        swatchWrapper.querySelectorAll('.compare-swatch').forEach(s => s.classList.remove('is-active'));
        // Add active class to the one clicked
        swatch.classList.add('is-active');
        updateImage(color);
      });
      
      if (index === 0) {
        swatch.classList.add('is-active');
        updateImage(color); 
      }
      swatchWrapper.append(swatch);
    });

    row.classList.add('compare-card');
    titleEl.classList.add('compare-card__title');
    descriptionEl.classList.add('compare-card__desc');
    productModelEl.classList.add('compare-card__model');
    specsEl.classList.add('compare-card__specs');

    // ---- CTA (Add to Cart Button) ----
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('compare-card__cta');

    const ctaButton = document.createElement('button');
    // Use the text from the ctaTextEl column (preserves UE editing)
    ctaButton.textContent = ctaTextEl?.textContent.trim() || 'Add to Cart';
    
    // Apply the class from ctaStyleEl column, or default to 'button-dark'
    const buttonStyle = ctaStyleEl?.textContent.trim() || 'button-dark';
    ctaButton.classList.add(buttonStyle);

    ctaWrapper.append(ctaButton);

    row.replaceChildren(imageWrapper, swatchWrapper, titleEl, descriptionEl, productModelEl, specsEl , ctaWrapper);
    grid.append(row);
  });

  block.replaceChildren(grid);
}