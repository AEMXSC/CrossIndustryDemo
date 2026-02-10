/**
 * Section Style Configuration
 * Maps section names/types to their available style options
 * 
 * This configuration drives the dynamic style multi-select dropdown
 * in the Universal Editor section dialog.
 * 
 * How to extend:
 * 1. Add new section type as a key
 * 2. Define its available styles with name and value
 * 3. Styles are applied as CSS classes at render time
 */

export const SECTION_STYLE_CONFIG = {
  // Hero Section - Full-width, prominent sections
  'hero-section': [
    { name: 'Full Width', value: 'full-width' },
    { name: 'Gradient Background', value: 'gradient-bg' },
    { name: 'Center Content', value: 'center-content' },
    { name: 'Dark Overlay', value: 'dark-overlay' },
    { name: 'Animated', value: 'animated' }
  ],

  // BFSI (Banking, Financial Services, Insurance) Section
  'bfsi-section': [
    { name: 'Light Background', value: 'light-bg' },
    { name: 'Trust Border', value: 'trust-border' },
    { name: 'Icon Left', value: 'icon-left' },
    { name: 'Professional', value: 'professional' },
    { name: 'Secure Badge', value: 'secure-badge' },
    { name: 'Data Table', value: 'data-table' }
  ],

  // Promotional Section - Marketing and CTA focused
  'promo-section': [
    { name: 'Highlight', value: 'highlight' },
    { name: 'Shadow Card', value: 'shadow-card' },
    { name: 'CTA Emphasis', value: 'cta-emphasis' },
    { name: 'Urgency Banner', value: 'urgency-banner' },
    { name: 'Limited Offer', value: 'limited-offer' }
  ],

  // Healthcare Section
  'healthcare-section': [
    { name: 'Caring Theme', value: 'caring-theme' },
    { name: 'Clean Layout', value: 'clean-layout' },
    { name: 'Patient Focused', value: 'patient-focused' },
    { name: 'Trust Elements', value: 'trust-elements' },
    { name: 'Accessibility Enhanced', value: 'accessibility-enhanced' }
  ],

  // Product Section - E-commerce and product showcases
  'product-section': [
    { name: 'Grid Layout', value: 'grid-layout' },
    { name: 'Featured Badge', value: 'featured-badge' },
    { name: 'Price Highlight', value: 'price-highlight' },
    { name: 'Quick View', value: 'quick-view' },
    { name: 'Compare Mode', value: 'compare-mode' }
  ],

  // Testimonial Section
  'testimonial-section': [
    { name: 'Quote Style', value: 'quote-style' },
    { name: 'Avatar Prominent', value: 'avatar-prominent' },
    { name: 'Star Rating', value: 'star-rating' },
    { name: 'Carousel View', value: 'carousel-view' },
    { name: 'Video Testimonials', value: 'video-testimonials' }
  ],

  // Content Section - Generic content areas
  'content-section': [
    { name: 'Two Column', value: 'two-column' },
    { name: 'Sidebar Layout', value: 'sidebar-layout' },
    { name: 'Reading Mode', value: 'reading-mode' },
    { name: 'Rich Media', value: 'rich-media' }
  ],

  // CTA (Call-to-Action) Section
  'cta-section': [
    { name: 'Primary CTA', value: 'primary-cta' },
    { name: 'Secondary CTA', value: 'secondary-cta' },
    { name: 'Split Action', value: 'split-action' },
    { name: 'Full Width Button', value: 'full-width-button' },
    { name: 'Sticky CTA', value: 'sticky-cta' }
  ],

  // Footer Section
  'footer-section': [
    { name: 'Multi Column', value: 'multi-column' },
    { name: 'Social Links', value: 'social-links' },
    { name: 'Newsletter', value: 'newsletter' },
    { name: 'Minimal', value: 'minimal' }
  ]
};

/**
 * Default/fallback styles available for any section type
 * These are shown when section name is not specified or not found
 */
export const DEFAULT_SECTION_STYLES = [
  { name: 'Light Background', value: 'light-bg' },
  { name: 'Dark Background', value: 'dark-bg' },
  { name: 'Full Width', value: 'full-width' },
  { name: 'Contained', value: 'contained' },
  { name: 'Padded', value: 'padded' },
  { name: 'No Padding', value: 'no-padding' }
];

/**
 * Get available styles for a given section name
 * @param {string} sectionName - The section name/type identifier
 * @returns {Array} Array of style options with name and value
 */
export function getStylesForSection(sectionName) {
  if (!sectionName) {
    return DEFAULT_SECTION_STYLES;
  }

  // Normalize section name (lowercase, trim)
  const normalizedName = sectionName.toLowerCase().trim();
  
  // Return configured styles or fallback to defaults
  return SECTION_STYLE_CONFIG[normalizedName] || DEFAULT_SECTION_STYLES;
}

/**
 * Validate if a style value is valid for a given section
 * Useful for backend validation or migration scripts
 * @param {string} sectionName - The section name/type
 * @param {string} styleValue - The style value to validate
 * @returns {boolean} True if style is valid for this section
 */
export function isValidStyleForSection(sectionName, styleValue) {
  const availableStyles = getStylesForSection(sectionName);
  return availableStyles.some(style => style.value === styleValue);
}

/**
 * Get all registered section types
 * Useful for admin interfaces or documentation
 * @returns {Array<string>} Array of section type names
 */
export function getAllSectionTypes() {
  return Object.keys(SECTION_STYLE_CONFIG);
}

/**
 * Merge section styles with existing metadata styles
 * This ensures backward compatibility with existing style system
 * @param {Array<string>} existingStyles - Currently applied styles
 * @param {Array<string>} newStyles - Styles from section name config
 * @returns {Array<string>} Merged unique styles
 */
export function mergeStyles(existingStyles = [], newStyles = []) {
  return [...new Set([...existingStyles, ...newStyles])];
}
