---
name: frontend-adjustment
description: Refine and optimize existing frontend code generated from design-to-code tools. Use this skill only for UI adjustments, layout fixes, responsiveness improvements, spacing corrections, performance optimization, and visual polish. Do not redesign the entire page unless explicitly requested.
---

<!-- Tip: Use /create-skill in chat to generate content with agent assistance -->

Define the functionality provided by this skill, including detailed instructions and examples for how to use it effectively. Be specific about the types of adjustments and optimizations that should be made, and provide clear guidelines for maintaining design consistency and performance standards.

### Core Objective

Improve and refine the existing frontend implementation without changing the original design intent.

Focus on:

* layout corrections
* alignment fixes
* spacing adjustments
* responsiveness issues
* overflow problems
* typography hierarchy fixes
* component consistency
* performance optimization
* smooth rendering

Preserve the original structure and design style.

---

### Adjustment Rules

Only modify the sections that need improvement.

Examples:

* fix stretched sections
* correct hero alignment
* adjust padding and margins
* fix broken flex/grid layouts
* improve mobile responsiveness
* correct card sizing
* align buttons and CTA sections
* fix navbar spacing
* resolve overflow and scroll issues

Do NOT rewrite the entire page.

Do NOT introduce unnecessary structural changes.

---

### Performance Optimization

Ensure every update keeps the page smooth and fast.

Prioritize:

* reducing unnecessary re-renders
* simplifying nested DOM structures
* removing redundant wrappers
* optimizing large images/assets
* avoiding heavy shadows and blur effects
* minimizing animation cost
* preventing layout shifts

The page should never feel laggy.

---

### Existing Fonts

Use the existing project fonts and styles.

Do not replace fonts unless explicitly requested.

Maintain design consistency with the current UI system.

---

### Animation Adjustments

Keep animations minimal and smooth.

Allowed:

* subtle hover states
* smooth transitions
* fade effects
* soft card elevation

Avoid:

* excessive motion
* bounce effects
* flashy transitions
* animation-heavy sections

---

### Final Rule

Act like a senior frontend engineer performing production-level UI refinement and performance tuning on an already built interface.
