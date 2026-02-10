/**
 * Dynamic Section Styles Editor Support
 * 
 * This script enhances the Universal Editor experience by:
 * 1. Dynamically populating the section-styles multi-select based on section-name
 * 2. Validating style selections
 * 3. Providing real-time feedback to authors
 * 
 * Integration: This should be loaded in the Universal Editor context
 */

import { 
  getStylesForSection, 
  isValidStyleForSection,
  DEFAULT_SECTION_STYLES 
} from './section-style-config.js';

/**
 * Initialize dynamic section styles support
 * Should be called when Universal Editor is ready
 */
export function initDynamicSectionStyles() {
  // Wait for Universal Editor to be ready
  if (window.Granite && window.Granite.author) {
    setupSectionStylesListener();
  } else {
    // For Universal Editor (modern)
    document.addEventListener('aue:ui-ready', () => {
      setupSectionStylesListener();
    });
  }
}

/**
 * Setup listener for section name changes
 * Updates the section-styles field options dynamically
 */
function setupSectionStylesListener() {
  // Listen for field value changes in the Universal Editor
  document.addEventListener('aue:content-patch', (event) => {
    const { detail } = event;
    
    // Check if the change is to section-name field
    if (detail?.update?.path?.includes('section-name')) {
      updateSectionStylesOptions(detail.update.value);
    }
  });

  // Also handle initial load
  const sectionElements = document.querySelectorAll('[data-section-name]');
  sectionElements.forEach((section) => {
    const sectionName = section.dataset.sectionName;
    if (sectionName) {
      updateSectionStylesOptions(sectionName, section);
    }
  });
}

/**
 * Update the options available in the section-styles multi-select
 * @param {string} sectionName - The selected section name/type
 * @param {Element} sectionElement - The section DOM element (optional)
 */
function updateSectionStylesOptions(sectionName, sectionElement) {
  const availableStyles = getStylesForSection(sectionName);
  
  // If we're in the Universal Editor dialog
  if (window.Granite?.UI) {
    updateGraniteUIMultiSelect(availableStyles, sectionElement);
  } else {
    // Modern Universal Editor approach
    updateModernEditorMultiSelect(availableStyles, sectionElement);
  }
}

/**
 * Update Granite UI (Classic AEM) multi-select component
 * @param {Array} styleOptions - Available style options
 */
function updateGraniteUIMultiSelect(styleOptions, sectionElement) {
  // Find the section-styles coral-multiselect element
  const multiSelect = document.querySelector('[name="./section-styles"]');
  if (!multiSelect) return;

  // Capture currently selected values before clearing
  const dataValue = sectionElement?.dataset?.sectionStyles || '';
  const currentValue = dataValue || multiSelect.value || '';
  const selectedValues = currentValue
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  // Clear existing options
  multiSelect.items.clear();

  // Add new options based on section type
  styleOptions.forEach((option) => {
    const item = document.createElement('coral-multiselect-item');
    item.value = option.value;
    item.textContent = option.name;
    if (selectedValues.includes(option.value)) {
      item.selected = true;
    }
    multiSelect.items.add(item);
  });

  // Remove selections that are no longer valid
  const validSelections = selectedValues.filter((value) =>
    styleOptions.some((option) => option.value === value)
  );
  multiSelect.value = validSelections.join(',');
}

/**
 * Update modern Universal Editor multi-select
 * @param {Array} styleOptions - Available style options
 * @param {Element} sectionElement - The section element
 */
function updateModernEditorMultiSelect(styleOptions, sectionElement) {
  // This would integrate with the Universal Editor's field system
  // The actual implementation depends on how AEM Universal Editor exposes field APIs
  
  // Store available options as a data attribute for reference
  if (sectionElement) {
    sectionElement.dataset.availableStyles = JSON.stringify(
      styleOptions.map(opt => opt.value)
    );
  }

  // Dispatch custom event that editor plugins can listen to
  const event = new CustomEvent('section-styles-updated', {
    detail: {
      options: styleOptions,
      element: sectionElement
    },
    bubbles: true
  });
  document.dispatchEvent(event);
}

/**
 * Validate selected styles against section type
 * Called before save/publish to ensure data integrity
 * @param {string} sectionName - The section type
 * @param {Array<string>} selectedStyles - Currently selected styles
 * @returns {Object} Validation result with isValid and invalidStyles
 */
export function validateSectionStyles(sectionName, selectedStyles) {
  const invalidStyles = selectedStyles.filter(
    style => !isValidStyleForSection(sectionName, style)
  );

  return {
    isValid: invalidStyles.length === 0,
    invalidStyles,
    message: invalidStyles.length > 0 
      ? `Invalid styles for ${sectionName}: ${invalidStyles.join(', ')}` 
      : 'All styles are valid'
  };
}

/**
 * Get current section configuration from a section element
 * @param {Element} sectionElement - The section DOM element
 * @returns {Object} Section configuration
 */
export function getSectionConfig(sectionElement) {
  return {
    sectionName: sectionElement.dataset.sectionName || '',
    styles: (sectionElement.dataset.sectionStyles || '').split(',').filter(Boolean),
    element: sectionElement
  };
}

/**
 * Apply section styles to a section element
 * This runs at render time to apply the configured styles as CSS classes
 * @param {Element} section - The section element
 */
export function applySectionStyles(section) {
  const sectionName = section.dataset.sectionName;
  const sectionStyles = section.dataset.sectionStyles;

  if (!sectionStyles) return;

  // Parse styles (comma-separated values)
  const styles = sectionStyles.split(',').map(s => s.trim()).filter(Boolean);

  // Validate styles for this section type
  const validation = validateSectionStyles(sectionName, styles);
  
  if (!validation.isValid) {
    console.warn(`Section has invalid styles:`, validation.message);
    
    // In author mode, show visual warning
    if (section.closest('.aem-GridColumn') || window.location.hostname.includes('author')) {
      section.classList.add('section-style-warning');
      section.dataset.styleWarning = validation.message;
    }
  }

  // Apply each style as a CSS class
  styles.forEach(style => {
    section.classList.add(style);
  });

  // Also add the section name as a class for targeting
  if (sectionName) {
    section.classList.add(sectionName);
  }
}

/**
 * Batch apply section styles to all sections in a container
 * Call this from decorateMain() or after section decoration
 * @param {Element} container - Container element (usually main)
 */
export function applySectionStylesToContainer(container) {
  const sections = container.querySelectorAll('.section[data-section-styles]');
  sections.forEach(applySectionStyles);
}

/**
 * Preview section styles in real-time
 * For use in a style preview panel or live editor
 * @param {Element} section - The section element
 * @param {Array<string>} previewStyles - Styles to preview
 */
export function previewSectionStyles(section, previewStyles) {
  // Store original classes
  if (!section.dataset.originalClasses) {
    section.dataset.originalClasses = section.className;
  }

  // Reset to original
  section.className = section.dataset.originalClasses;

  // Apply preview styles
  previewStyles.forEach(style => {
    section.classList.add(style);
  });
}

/**
 * Reset section to original styles
 * @param {Element} section - The section element
 */
export function resetSectionStyles(section) {
  if (section.dataset.originalClasses) {
    section.className = section.dataset.originalClasses;
    delete section.dataset.originalClasses;
  }
}

// Auto-initialize if in editor context
if (typeof window !== 'undefined') {
  // Check if we're in an authoring environment
  if (window.location.hostname.includes('author') || 
      window.location.search.includes('wcmmode=edit') ||
      document.documentElement.hasAttribute('data-aue-context')) {
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initDynamicSectionStyles);
    } else {
      initDynamicSectionStyles();
    }
  }
}

export default {
  initDynamicSectionStyles,
  validateSectionStyles,
  applySectionStyles,
  applySectionStylesToContainer,
  getSectionConfig,
  previewSectionStyles,
  resetSectionStyles
};
