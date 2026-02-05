/**
 * Helper function to check if a value is a valid color
 * @param {string} color - The color value to validate
 * @returns {boolean} - True if valid color, false otherwise
 */
function isValidColor(color) {
  if (!color) return false;
  
  // Check for hex colors
  const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  if (hexPattern.test(color)) return true;
  
  // Check for rgb/rgba/hsl/hsla
  const colorFunctionPattern = /^(rgb|rgba|hsl|hsla)\(/i;
  if (colorFunctionPattern.test(color)) return true;
  
  // Check for named colors by creating a temporary element
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}

export default function decorate(block) {
  // Read the block content (2 rows: key and value)
  const rows = [...block.children];

  // Extract key and value from block rows
  const keyRow = rows[0];
  const valueRow = rows[1];

  const cssKey = keyRow?.textContent?.trim() || '';
  const cssValue = valueRow?.textContent?.trim() || '';

  // Clear the block
  block.innerHTML = '';

  // Set data attributes
  block.setAttribute('data-key', cssKey);
  block.setAttribute('data-value', cssValue);

  // Create key div
  const keyDiv = document.createElement('div');
  keyDiv.className = 'css-variable-key';
  keyDiv.textContent = `key ${cssKey}`;

  // Create value container
  const valueContainer = document.createElement('div');
  valueContainer.className = 'css-variable-value-container';

  // Create value div
  const valueDiv = document.createElement('div');
  valueDiv.className = 'css-variable-value';
  valueDiv.textContent = `value ${cssValue}`;

  // Check if the value is a color and add color swatch
  if (isValidColor(cssValue)) {
    const colorSwatch = document.createElement('span');
    colorSwatch.className = 'css-variable-color-swatch';
    colorSwatch.style.backgroundColor = cssValue;
    colorSwatch.setAttribute('title', `Color preview: ${cssValue}`);
    valueContainer.appendChild(colorSwatch);
  }

  valueContainer.appendChild(valueDiv);

  // Append to block
  block.appendChild(keyDiv);
  block.appendChild(valueContainer);
}
