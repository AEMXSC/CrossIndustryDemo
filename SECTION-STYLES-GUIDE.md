# Dynamic Section Styles System - Implementation Guide

## Overview

This system provides a **dynamic, section-type-aware style management** for AEM Edge Delivery Services sections. Authors can select a section type (e.g., Hero, BFSI, Promo) and receive contextually relevant style options in a multi-select dropdown.

## Architecture

### Component Files

1. **`scripts/section-style-config.js`** - Configuration mapping of section types to available styles
2. **`scripts/section-styles-editor.js`** - Universal Editor integration and runtime style application
3. **`styles/section-styles.css`** - CSS implementations for all section styles
4. **`models/_section.json`** - Updated section component model with new fields

### Data Flow

```
Author selects Section Type → 
Config determines available styles → 
Dropdown populated dynamically → 
Author selects style(s) → 
Styles saved as metadata → 
Runtime applies styles as CSS classes
```

## How It Works

### 1. Configuration System (`section-style-config.js`)

**Purpose:** Central configuration mapping section types to their available styles.

**Structure:**
```javascript
export const SECTION_STYLE_CONFIG = {
  'hero-section': [
    { name: 'Full Width', value: 'full-width' },
    { name: 'Gradient Background', value: 'gradient-bg' },
    // ...
  ],
  'bfsi-section': [
    { name: 'Light Background', value: 'light-bg' },
    // ...
  ]
};
```

**Key Functions:**
- `getStylesForSection(sectionName)` - Returns available styles for a section type
- `isValidStyleForSection(sectionName, styleValue)` - Validates style compatibility
- `getAllSectionTypes()` - Lists all registered section types

**Adding New Section Types:**
```javascript
// In section-style-config.js, add:
'my-section-type': [
  { name: 'Display Name', value: 'css-class-name' },
  { name: 'Another Style', value: 'another-class' }
]
```

### 2. Editor Integration (`section-styles-editor.js`)

**Purpose:** Connects the configuration to the Universal Editor and handles runtime application.

**Key Functions:**

#### `applySectionStyles(section)`
Applies configured styles to a section element at render time.

```javascript
// Called automatically by applySectionStylesToContainer
// Can also be called manually:
import { applySectionStyles } from './section-styles-editor.js';

const section = document.querySelector('.section');
applySectionStyles(section);
```

#### `validateSectionStyles(sectionName, selectedStyles)`
Validates that selected styles are appropriate for the section type.

```javascript
const validation = validateSectionStyles('hero-section', ['full-width', 'gradient-bg']);
if (!validation.isValid) {
  console.error(validation.message);
}
```

#### `applySectionStylesToContainer(container)`
Batch applies styles to all sections in a container (called from `decorateMain`).

### 3. Section Model (`_section.json`)

**New Fields:**

```json
{
  "component": "select",
  "name": "section-name",
  "label": "Section Type",
  "description": "Select the section type to customize available style options"
}
```

```json
{
  "component": "multiselect",
  "name": "section-styles",
  "label": "Section Styles",
  "description": "Select one or more styles for this section. Options change based on Section Type."
}
```

**Data Storage:**
- `section-name` → stored as `data-section-name` attribute
- `section-styles` → stored as `data-section-styles` attribute (comma-separated)

### 4. Style Definitions (`section-styles.css`)

**Naming Convention:**
```css
.section.[section-type].[style-class] {
  /* Style rules */
}
```

**Example:**
```css
/* Hero section with gradient background */
.section.hero-section.gradient-bg {
  background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
  color: white;
}
```

## Usage Guide

### For Content Authors

1. **Open Section Properties** in Universal Editor
2. **Select Section Type** from the dropdown (e.g., "Hero Section")
3. **Choose Styles** from the multi-select (options update based on section type)
4. **Save** - Styles are applied automatically

**Example Configuration:**
- Section Type: `Hero Section`
- Section Styles: `Full Width`, `Gradient Background`, `Center Content`

**Result:** Section renders with classes:
```html
<div class="section hero-section full-width gradient-bg center-content">
  <!-- Content -->
</div>
```

### For Developers

#### Adding a New Section Type

**Step 1:** Add to configuration
```javascript
// scripts/section-style-config.js
export const SECTION_STYLE_CONFIG = {
  // ... existing types
  'landing-section': [
    { name: 'Hero Layout', value: 'hero-layout' },
    { name: 'Split Content', value: 'split-content' },
    { name: 'Form Focus', value: 'form-focus' }
  ]
};
```

**Step 2:** Add to model options
```json
// models/_section.json
{
  "name": "section-name",
  "options": [
    // ... existing options
    { "name": "Landing Section", "value": "landing-section" }
  ]
}
```

**Step 3:** Implement CSS
```css
/* styles/section-styles.css */
.section.landing-section.hero-layout {
  min-height: 600px;
  display: flex;
  align-items: center;
}

.section.landing-section.split-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

.section.landing-section.form-focus form {
  max-width: 500px;
  margin: 0 auto;
}
```

**Step 4:** Rebuild component models
```bash
npm run build:json
```

#### Adding a New Style to Existing Section

**Step 1:** Update configuration
```javascript
// scripts/section-style-config.js
'hero-section': [
  // ... existing styles
  { name: 'Video Background', value: 'video-bg' }
]
```

**Step 2:** Implement CSS
```css
/* styles/section-styles.css */
.section.hero-section.video-bg {
  position: relative;
  overflow: hidden;
}

.section.hero-section.video-bg video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
```

**Step 3:** No rebuild needed - configuration change only!

#### Programmatic Style Application

```javascript
import { applySectionStyles, previewSectionStyles } from './section-styles-editor.js';

// Apply configured styles
const section = document.querySelector('.section');
applySectionStyles(section);

// Preview styles (for style selector UI)
previewSectionStyles(section, ['full-width', 'gradient-bg']);

// Reset to original
resetSectionStyles(section);
```

#### Style Validation

```javascript
import { validateSectionStyles } from './section-styles-editor.js';

const validation = validateSectionStyles('hero-section', ['full-width', 'invalid-style']);

if (!validation.isValid) {
  console.error('Invalid styles:', validation.invalidStyles);
  // Shows: ['invalid-style']
}
```

## Section Types Reference

### Hero Section (`hero-section`)
**Use Case:** Large, prominent landing sections

**Available Styles:**
- `full-width` - Full viewport width
- `gradient-bg` - Gradient background
- `center-content` - Centered content layout
- `dark-overlay` - Dark overlay for background images
- `animated` - Fade-in animation

### BFSI Section (`bfsi-section`)
**Use Case:** Banking, Financial Services, Insurance content

**Available Styles:**
- `light-bg` - Professional light background
- `trust-border` - Left accent border
- `icon-left` - Icon + content layout
- `professional` - Serif typography
- `secure-badge` - Security indicator
- `data-table` - Enhanced table styling

### Promo Section (`promo-section`)
**Use Case:** Promotional and marketing content

**Available Styles:**
- `highlight` - Eye-catching background
- `shadow-card` - Card with shadow effect
- `cta-emphasis` - Emphasized call-to-action
- `urgency-banner` - Limited time indicator
- `limited-offer` - Dashed border promo style

### Healthcare Section (`healthcare-section`)
**Use Case:** Healthcare and medical content

**Available Styles:**
- `caring-theme` - Soft, approachable colors
- `clean-layout` - Clean, white background
- `patient-focused` - Large, readable text
- `trust-elements` - Trust indicators
- `accessibility-enhanced` - Enhanced accessibility

### Product Section (`product-section`)
**Use Case:** E-commerce and product showcases

**Available Styles:**
- `grid-layout` - Responsive grid
- `featured-badge` - Featured product indicator
- `price-highlight` - Emphasized pricing
- `quick-view` - Hover effects
- `compare-mode` - Product comparison layout

### Testimonial Section (`testimonial-section`)
**Use Case:** Customer testimonials and reviews

**Available Styles:**
- `quote-style` - Large quote marks
- `avatar-prominent` - Emphasized avatars
- `star-rating` - Star rating display
- `carousel-view` - Horizontal scroll
- `video-testimonials` - Video styling

### Content Section (`content-section`)
**Use Case:** General content areas

**Available Styles:**
- `two-column` - Two-column layout
- `sidebar-layout` - Content with sidebar
- `reading-mode` - Optimized for reading
- `rich-media` - Enhanced media display

### CTA Section (`cta-section`)
**Use Case:** Call-to-action sections

**Available Styles:**
- `primary-cta` - Primary action style
- `secondary-cta` - Secondary action style
- `split-action` - Multiple actions
- `full-width-button` - Full-width CTA
- `sticky-cta` - Sticky to viewport

### Footer Section (`footer-section`)
**Use Case:** Footer areas

**Available Styles:**
- `multi-column` - Multi-column layout
- `social-links` - Social media icons
- `newsletter` - Newsletter signup form
- `minimal` - Minimal footer design

## Integration Points

### 1. Universal Editor Dialog
The system integrates with AEM Universal Editor dialogs:
- Section Type dropdown updates Section Styles options dynamically
- Real-time validation prevents invalid style selections

### 2. Runtime Application
Styles are applied during page load:
```javascript
// In scripts/scripts.js > decorateMain()
decorateSections(main);
applySectionStylesToContainer(main); // ← Applies dynamic styles
```

### 3. Author Environment
In author mode, invalid styles trigger visual warnings:
```css
.section.section-style-warning {
  outline: 3px dashed #ff9800;
}
```

## Best Practices

### Configuration
1. **Keep style names descriptive** - Use names that clearly indicate visual effect
2. **Maintain consistency** - Use similar naming patterns across section types
3. **Document complex styles** - Add comments for non-obvious implementations

### CSS
1. **Scope styles to section types** - Use `.section.[type].[style]` specificity
2. **Provide fallbacks** - Handle missing styles gracefully
3. **Test combinations** - Ensure multiple styles work together
4. **Responsive design** - Include mobile breakpoints

### Authoring
1. **Start with section type** - Always set section type first
2. **Use combinations** - Multiple styles can be applied together
3. **Preview changes** - Check in preview mode before publishing
4. **Validate styles** - Watch for validation warnings in author mode

## Troubleshooting

### Styles Not Appearing
**Check:**
1. Section has `data-section-name` attribute
2. Section has `data-section-styles` attribute with values
3. CSS file is loaded: `styles/section-styles.css`
4. JavaScript integration is active in `scripts.js`

**Debug:**
```javascript
// Console inspection
const section = document.querySelector('.section');
console.log('Section name:', section.dataset.sectionName);
console.log('Section styles:', section.dataset.sectionStyles);
console.log('Classes:', section.className);
```

### Dropdown Not Updating
**Check:**
1. `section-styles-editor.js` is loaded in editor context
2. Universal Editor is properly initialized
3. Browser console for errors

### Invalid Style Warning
**Reason:** A selected style is not available for the current section type

**Fix:**
1. Change section type to match selected styles, OR
2. Remove invalid styles and select appropriate ones

## Performance Considerations

- **CSS size:** ~15KB (minified)
- **JS size:** ~8KB (minified)
- **Load order:** Styles loaded with main CSS bundle
- **Runtime cost:** Negligible - one-time class application

## Migration Guide

### From Existing Style System

**Old approach:**
```html
<div class="section" style="background: blue">
  <!-- Manual styles -->
</div>
```

**New approach:**
1. Choose section type in dialog
2. Select appropriate styles
3. Remove inline styles

**Benefits:**
- Consistent styling
- Reusable patterns
- Easy maintenance
- No code changes needed

## Future Enhancements

### Planned Features
1. **Style preview panel** - Visual style picker in editor
2. **Style dependencies** - Auto-select complementary styles
3. **Custom styles** - Per-project style extensions
4. **A/B testing integration** - Test different style combinations
5. **Analytics tracking** - Track which styles convert best

### Extensibility

The system is designed for extension:

```javascript
// Custom section types in separate file
import { SECTION_STYLE_CONFIG } from './section-style-config.js';

// Add custom section
SECTION_STYLE_CONFIG['custom-section'] = [
  { name: 'Custom Style 1', value: 'custom-1' },
  { name: 'Custom Style 2', value: 'custom-2' }
];
```

## Support & Maintenance

### Adding New Sections
1. Update `section-style-config.js`
2. Update `_section.json` model
3. Implement CSS in `section-styles.css`
4. Run `npm run build:json`
5. Test in Universal Editor

### Updating Existing Styles
1. Update CSS in `section-styles.css`
2. No build required - CSS changes are live

### Documentation
- Configuration: `section-style-config.js` (inline comments)
- Implementation: This file
- Examples: See [SECTION-STYLES-EXAMPLES.md](./SECTION-STYLES-EXAMPLES.md)

## Related Documentation

- [AEM Edge Delivery Services Documentation](https://www.aem.live/docs/)
- [Universal Editor Guide](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/content/implementing/developing/universal-editor/introduction.html)
- [Component Models Reference](./models/README.md)

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Maintainer:** Development Team
