export default function decorate(block) {
  // 1. Get the container where all rows live
  const rows = [...block.children];
  if (!rows.length) return;

  // 2. Create a grid wrapper (this doesn't need to be editable, so we create it)
  const grid = document.createElement('div');
  grid.classList.add('compare-grid');

  rows.forEach((row) => {
    // Each 'row' is a <div> containing the <div> columns from your spreadsheet/UE
    const cols = [...row.children];
    if (cols.length < 8) return;

    // Mapping columns based on your description
    const [
      iconField,        // cols[0]
      colorField,       // cols[1]
      titleEl,          // cols[2]
      descriptionEl,    // cols[3]
      productModelEl,   // cols[4]
      specsEl,          // cols[5]
      ctaTextEl,        // cols[6]
      ctaStyleEl        // cols[7]
    ] = cols;

    // --- TRANSFORMATION ---
    // Instead of creating new <div>s, we add classes to the EXISTING elements
    // This keeps the "data-aue-prop" attributes intact so UE works.
    
    row.classList.add('compare-card');
    titleEl.classList.add('compare-card__title');
    descriptionEl.classList.add('compare-card__desc');
    productModelEl.classList.add('compare-card__model');
    specsEl.classList.add('compare-card__specs');

    // --- DYNAMIC IMAGE LOGIC ---
    // Since the image isn't in the authoring, we create a placeholder for it
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('compare-card__image');
    const img = document.createElement('img');
    imageWrapper.append(img);

    // --- SWATCH LOGIC ---
    const swatchWrapper = document.createElement('div');
    swatchWrapper.classList.add('compare-card__swatches');

    // Extract colors from the editable list
    const colorList = colorField.querySelectorAll('li');
    colorList.forEach((li, index) => {
      const colorHex = li.textContent.trim();
      const swatch = document.createElement('span');
      swatch.classList.add('compare-swatch');
      swatch.style.backgroundColor = colorHex;

      // Click to change image
      swatch.addEventListener('click', () => {
        const cleanColor = colorHex.replace('#', '');
        const cleanTitle = titleEl.textContent.trim().replace(/[^a-zA-Z0-9]/g, '');
        const cleanModel = productModelEl.textContent.trim().split('·')[0].replace(/[^a-zA-Z0-9]/g, '');
        
        img.src = `/content/dam/dept-crossIndustry/hi-tech-images/product_${cleanTitle}_${cleanModel}_${cleanColor}.png`;
      });

      // Set default (first color)
      if (index === 0) swatch.click();
      swatchWrapper.append(swatch);
    });

    // --- CTA LOGIC ---
    const ctaWrapper = document.createElement('div');
    ctaWrapper.classList.add('compare-card__cta');
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = ctaTextEl.textContent.trim();
    link.className = ctaStyleEl.textContent.trim() || 'button-dark';
    ctaWrapper.append(link);

    // --- RE-ASSEMBLING THE ROW ---
    // We move the existing, editable elements into the desired order.
    // row.replaceChildren() clears the old layout and injects our new one
    row.replaceChildren(
      imageWrapper,
      swatchWrapper,
      titleEl,
      descriptionEl,
      productModelEl,
      specsEl,
      ctaWrapper
    );

    // Move the row into our grid
    grid.append(row);
  });

  // Finally, put the grid into the block
  block.replaceChildren(grid);
}