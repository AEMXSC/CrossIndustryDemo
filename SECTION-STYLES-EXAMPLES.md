# Dynamic Section Styles - Examples & Testing

This document provides practical examples and test cases for the Dynamic Section Styles system.

## Table of Contents
1. [Basic Examples](#basic-examples)
2. [Advanced Combinations](#advanced-combinations)
3. [Real-World Use Cases](#real-world-use-cases)
4. [Testing Scenarios](#testing-scenarios)
5. [Code Examples](#code-examples)

## Basic Examples

### Example 1: Hero Section with Full Width and Gradient

**Author Configuration:**
```
Section Type: Hero Section
Section Styles: Full Width, Gradient Background, Center Content
```

**Generated HTML:**
```html
<div class="section hero-section full-width gradient-bg center-content" 
     data-section-name="hero-section" 
     data-section-styles="full-width,gradient-bg,center-content">
  <div class="default-content-wrapper">
    <h1>Welcome to Our Site</h1>
    <p>Discover amazing features</p>
    <div class="button-container">
      <a href="#" class="button primary">Get Started</a>
    </div>
  </div>
</div>
```

**Result:** Full-width section with blue gradient background and centered white text.

---

### Example 2: BFSI Section with Trust Elements

**Author Configuration:**
```
Section Type: BFSI Section
Section Styles: Light Background, Trust Border, Professional
```

**Generated HTML:**
```html
<div class="section bfsi-section light-bg trust-border professional"
     data-section-name="bfsi-section"
     data-section-styles="light-bg,trust-border,professional">
  <div class="default-content-wrapper">
    <h2>Secure Banking Solutions</h2>
    <p>Your financial security is our priority.</p>
  </div>
</div>
```

**Result:** Light gray background with blue left border, serif font for professional appearance.

---

### Example 3: Promo Section with Urgency

**Author Configuration:**
```
Section Type: Promo Section
Section Styles: Highlight, Urgency Banner, CTA Emphasis
```

**Generated HTML:**
```html
<div class="section promo-section highlight urgency-banner cta-emphasis"
     data-section-name="promo-section"
     data-section-styles="highlight,urgency-banner,cta-emphasis">
  <div class="default-content-wrapper">
    <h2>Special Offer - 50% Off!</h2>
    <p>Limited time only. Don't miss out!</p>
    <div class="button-container">
      <a href="#" class="button primary">Claim Offer</a>
    </div>
  </div>
</div>
```

**Result:** Yellow highlighted section with red urgency banner and pulsing CTA button.

## Advanced Combinations

### Combination 1: Healthcare with Accessibility

**Purpose:** Create an accessible, patient-friendly section

```javascript
// Configuration
{
  sectionName: 'healthcare-section',
  styles: ['caring-theme', 'clean-layout', 'accessibility-enhanced']
}
```

**Use Case:** Patient information pages, medical instructions, appointment booking

**Visual Result:**
- Soft gradient background (caring-theme)
- Clean white content area (clean-layout)
- Large text with enhanced contrast (accessibility-enhanced)

---

### Combination 2: Product Showcase Grid

**Purpose:** Display products in a responsive grid with featured items

```javascript
// Configuration
{
  sectionName: 'product-section',
  styles: ['grid-layout', 'featured-badge', 'quick-view']
}
```

**HTML Structure:**
```html
<div class="section product-section grid-layout featured-badge quick-view">
  <div class="default-content-wrapper">
    <div class="product-card" data-featured="true">
      <img src="/product1.jpg" alt="Product 1">
      <h3>Premium Product</h3>
      <p class="price">$99.99</p>
    </div>
    <div class="product-card">
      <img src="/product2.jpg" alt="Product 2">
      <h3>Regular Product</h3>
      <p class="price">$49.99</p>
    </div>
  </div>
</div>
```

**Result:** 
- Responsive grid layout
- Featured products have gold "⭐ Featured" badge
- Cards lift on hover for quick view effect

---

### Combination 3: Testimonial Carousel with Ratings

**Purpose:** Display customer testimonials with star ratings

```javascript
// Configuration
{
  sectionName: 'testimonial-section',
  styles: ['quote-style', 'star-rating', 'carousel-view']
}
```

**Result:**
- Large quote marks
- Horizontal scrolling carousel
- Star ratings displayed prominently

## Real-World Use Cases

### Use Case 1: Financial Services Landing Page

**Requirement:** Build trust while highlighting secure features

**Sections:**

#### Hero Section
```javascript
{
  sectionName: 'hero-section',
  styles: ['full-width', 'gradient-bg', 'center-content']
}
```

#### Trust Section
```javascript
{
  sectionName: 'bfsi-section',
  styles: ['light-bg', 'trust-border', 'secure-badge', 'data-table']
}
```

#### CTA Section
```javascript
{
  sectionName: 'cta-section',
  styles: ['primary-cta', 'full-width-button']
}
```

**Complete Page:**
```html
<!-- Hero -->
<div class="section hero-section full-width gradient-bg center-content">
  <h1>Your Financial Future Starts Here</h1>
  <p>Trusted by over 1 million customers worldwide</p>
</div>

<!-- Features -->
<div class="section bfsi-section light-bg trust-border secure-badge">
  <h2>Why Choose Us</h2>
  <ul>
    <li>Bank-level security</li>
    <li>24/7 customer support</li>
    <li>No hidden fees</li>
  </ul>
</div>

<!-- Call to Action -->
<div class="section cta-section primary-cta full-width-button">
  <h2>Ready to Get Started?</h2>
  <a href="#signup" class="button">Open Account Today</a>
</div>
```

---

### Use Case 2: E-commerce Product Page

**Requirement:** Showcase products with promotional offers

**Sections:**

#### Product Grid
```javascript
{
  sectionName: 'product-section',
  styles: ['grid-layout', 'featured-badge', 'price-highlight', 'quick-view']
}
```

#### Promotional Banner
```javascript
{
  sectionName: 'promo-section',
  styles: ['highlight', 'shadow-card', 'cta-emphasis']
}
```

#### Testimonials
```javascript
{
  sectionName: 'testimonial-section',
  styles: ['avatar-prominent', 'star-rating', 'carousel-view']
}
```

---

### Use Case 3: Healthcare Appointment Booking

**Requirement:** Create accessible, patient-friendly interface

**Sections:**

#### Information Section
```javascript
{
  sectionName: 'healthcare-section',
  styles: ['caring-theme', 'patient-focused', 'trust-elements']
}
```

#### Form Section
```javascript
{
  sectionName: 'content-section',
  styles: ['clean-layout', 'reading-mode']
}
```

#### Doctor Finder
```javascript
{
  sectionName: 'content-section',
  styles: ['two-column', 'sidebar-layout']
}
```

## Testing Scenarios

### Test 1: Section Type Change

**Steps:**
1. Create section with type "Hero Section"
2. Select styles: "Full Width", "Gradient Background"
3. Save and verify classes applied
4. Change type to "BFSI Section"
5. Verify style options update in dropdown
6. Previously selected styles should be validated

**Expected Result:**
- Old styles trigger validation warning (if incompatible)
- New style options appear in dropdown
- Author can select new appropriate styles

**Test Code:**
```javascript
import { validateSectionStyles, getStylesForSection } from './section-style-config.js';

// Initial state
let sectionType = 'hero-section';
let selectedStyles = ['full-width', 'gradient-bg'];

// Validate
let validation = validateSectionStyles(sectionType, selectedStyles);
console.log('Initial validation:', validation.isValid); // true

// Change type
sectionType = 'bfsi-section';

// Re-validate with old styles
validation = validateSectionStyles(sectionType, selectedStyles);
console.log('After type change:', validation.isValid); // false
console.log('Invalid styles:', validation.invalidStyles); // ['full-width', 'gradient-bg']

// Get new options
const newOptions = getStylesForSection(sectionType);
console.log('New style options:', newOptions);
```

---

### Test 2: Multiple Style Application

**Steps:**
1. Create section with type "Product Section"
2. Select multiple styles: "Grid Layout", "Featured Badge", "Quick View"
3. Verify all classes applied
4. Test CSS cascade and specificity

**Expected Result:**
- All three style classes present
- Styles work together without conflicts
- Grid + featured badges + hover effects all functional

**Test Code:**
```javascript
// Mock section element
const section = document.createElement('div');
section.className = 'section';
section.dataset.sectionName = 'product-section';
section.dataset.sectionStyles = 'grid-layout,featured-badge,quick-view';

// Apply styles
applySectionStyles(section);

// Verify classes
console.log('Has grid-layout:', section.classList.contains('grid-layout')); // true
console.log('Has featured-badge:', section.classList.contains('featured-badge')); // true
console.log('Has quick-view:', section.classList.contains('quick-view')); // true
console.log('Has section type:', section.classList.contains('product-section')); // true
```

---

### Test 3: Fallback Behavior

**Steps:**
1. Create section without selecting type
2. Verify default styles appear
3. Create section with invalid type name
4. Verify fallback to defaults

**Expected Result:**
- DEFAULT_SECTION_STYLES used when no type specified
- Invalid types gracefully fallback
- No JavaScript errors

**Test Code:**
```javascript
import { getStylesForSection, DEFAULT_SECTION_STYLES } from './section-style-config.js';

// No section type
const stylesForNull = getStylesForSection(null);
console.log('Null type:', stylesForNull === DEFAULT_SECTION_STYLES); // true

// Empty string
const stylesForEmpty = getStylesForSection('');
console.log('Empty type:', stylesForEmpty === DEFAULT_SECTION_STYLES); // true

// Invalid type
const stylesForInvalid = getStylesForSection('non-existent-type');
console.log('Invalid type:', stylesForInvalid === DEFAULT_SECTION_STYLES); // true
```

---

### Test 4: Style Preview

**Steps:**
1. Open section in editor
2. Select different styles
3. Preview changes without saving
4. Reset to original

**Expected Result:**
- Live preview shows style changes
- Original styles preserved until save
- Reset restores original state

**Test Code:**
```javascript
import { previewSectionStyles, resetSectionStyles } from './section-styles-editor.js';

const section = document.querySelector('.section');

// Store original
const originalClasses = section.className;

// Preview new styles
previewSectionStyles(section, ['full-width', 'gradient-bg']);

// Check preview applied
console.log('Preview active:', section.classList.contains('gradient-bg')); // true

// Reset
resetSectionStyles(section);

// Verify restored
console.log('Restored:', section.className === originalClasses); // true
```

---

### Test 5: Performance Test

**Steps:**
1. Create page with 20+ sections
2. Each section has different type and multiple styles
3. Measure page load time
4. Measure style application time

**Expected Result:**
- Total style application < 10ms
- No layout shift (CLS)
- Styles applied before first paint

**Test Code:**
```javascript
// Performance measurement
console.time('Section styles application');

const main = document.querySelector('main');
applySectionStylesToContainer(main);

console.timeEnd('Section styles application');

// Measure individual sections
const sections = main.querySelectorAll('.section');
console.log(`Applied styles to ${sections.length} sections`);

sections.forEach((section, index) => {
  const styles = section.dataset.sectionStyles?.split(',').length || 0;
  console.log(`Section ${index}: ${styles} styles`);
});
```

## Code Examples

### Example 1: Custom Section Type

**Add a custom "Events" section type:**

```javascript
// 1. Add to configuration (section-style-config.js)
export const SECTION_STYLE_CONFIG = {
  // ... existing types
  'events-section': [
    { name: 'Calendar View', value: 'calendar-view' },
    { name: 'List View', value: 'list-view' },
    { name: 'Featured Event', value: 'featured-event' },
    { name: 'Countdown Timer', value: 'countdown-timer' }
  ]
};
```

```css
/* 2. Add CSS (section-styles.css) */
.section.events-section.calendar-view {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.section.events-section.list-view .event-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.section.events-section.featured-event {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 48px;
}

.section.events-section.countdown-timer::after {
  content: attr(data-event-countdown);
  display: block;
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  margin-top: 24px;
}
```

```json
// 3. Add to model (models/_section.json)
{
  "name": "section-name",
  "options": [
    // ... existing options
    { "name": "Events Section", "value": "events-section" }
  ]
}
```

```bash
# 4. Build
npm run build:json
```

---

### Example 2: Conditional Style Logic

**Apply different styles based on page context:**

```javascript
// scripts/custom-section-logic.js
import { applySectionStyles } from './section-styles-editor.js';

export function applyConditionalStyles(section) {
  const pageType = document.body.dataset.pageType;
  
  // Apply base styles
  applySectionStyles(section);
  
  // Add contextual classes
  if (pageType === 'landing-page') {
    section.classList.add('landing-optimized');
  }
  
  if (window.innerWidth < 768) {
    section.classList.add('mobile-layout');
  }
  
  // Holiday theme
  const today = new Date();
  if (today.getMonth() === 11) { // December
    section.classList.add('holiday-theme');
  }
}
```

---

### Example 3: Style Analytics Tracking

**Track which styles are most used:**

```javascript
// scripts/section-analytics.js
export function trackSectionStyles() {
  const sections = document.querySelectorAll('.section[data-section-name]');
  const styleUsage = {};
  
  sections.forEach(section => {
    const sectionName = section.dataset.sectionName;
    const styles = section.dataset.sectionStyles?.split(',') || [];
    
    if (!styleUsage[sectionName]) {
      styleUsage[sectionName] = {};
    }
    
    styles.forEach(style => {
      styleUsage[sectionName][style] = (styleUsage[sectionName][style] || 0) + 1;
    });
  });
  
  // Send to analytics
  if (window.wbgData) {
    window.wbgData.sectionStyles = styleUsage;
  }
  
  console.log('Section style usage:', styleUsage);
}

// Call after page load
document.addEventListener('DOMContentLoaded', trackSectionStyles);
```

---

### Example 4: Dynamic Style Generator

**Generate styles programmatically:**

```javascript
// scripts/style-generator.js
export function generateSectionConfig(options) {
  const { 
    type, 
    layout = 'default',
    theme = 'light',
    emphasis = 'normal' 
  } = options;
  
  const styles = [];
  
  // Layout styles
  if (layout === 'wide') styles.push('full-width');
  if (layout === 'narrow') styles.push('contained');
  
  // Theme styles
  if (theme === 'dark') styles.push('dark-bg');
  if (theme === 'light') styles.push('light-bg');
  if (theme === 'gradient') styles.push('gradient-bg');
  
  // Emphasis styles
  if (emphasis === 'high') styles.push('shadow-card', 'cta-emphasis');
  if (emphasis === 'urgent') styles.push('urgency-banner');
  
  return {
    sectionName: type,
    sectionStyles: styles.join(',')
  };
}

// Usage
const heroConfig = generateSectionConfig({
  type: 'hero-section',
  layout: 'wide',
  theme: 'gradient',
  emphasis: 'high'
});

console.log(heroConfig);
// { sectionName: 'hero-section', sectionStyles: 'full-width,gradient-bg,shadow-card,cta-emphasis' }
```

---

### Example 5: Style Migration Script

**Migrate from old style system:**

```javascript
// tools/migrate-styles.js
export function migrateOldSectionStyles() {
  const sections = document.querySelectorAll('.section');
  
  const styleMap = {
    'hero': { name: 'hero-section', styles: ['full-width'] },
    'promo': { name: 'promo-section', styles: ['highlight'] },
    'testimonial': { name: 'testimonial-section', styles: ['quote-style'] }
  };
  
  sections.forEach(section => {
    // Check old style attributes
    const oldType = section.getAttribute('data-type');
    
    if (oldType && styleMap[oldType]) {
      const { name, styles } = styleMap[oldType];
      
      // Apply new system
      section.dataset.sectionName = name;
      section.dataset.sectionStyles = styles.join(',');
      
      // Remove old attribute
      section.removeAttribute('data-type');
      
      console.log(`Migrated section from ${oldType} to ${name}`);
    }
  });
}
```

## Additional Resources

- [Main Documentation](./SECTION-STYLES-GUIDE.md)
- [CSS Reference](./styles/section-styles.css)
- [Configuration Reference](./scripts/section-style-config.js)
- [API Reference](./scripts/section-styles-editor.js)

---

**Happy styling! 🎨**
