# Featured Projects — Design Document
Date: 2026-03-03

## Summary

Remove the hardcoded project list from `index.html`. On page load, fetch `projects.html`, parse its DOM, randomly select 2 project cards, and inject them into the "Featured Projects" section. Add a per-project gallery dropdown with a cycling image belt on both pages.

## Architecture

### Data source
`projects.html` is the canonical source. Each project card `<div>` is marked with `class="project-card"` and a `data-images='[]'` attribute. The user populates `data-images` with image paths as screenshots become available.

### Random selection (index.html)
On `DOMContentLoaded`, `script.js` fetches `projects.html`, uses `DOMParser` to extract all `.project-card` elements, shuffles them, and injects 2 into `#featured-projects` grid. A "View All Projects" link below the grid navigates to `projects.html`.

### Gallery (both pages)
`initGalleries()` runs on all `.project-card` elements after they are in the DOM.
- If `data-images` is empty — no UI added (clean state).
- If `data-images` is non-empty — a "Gallery" toggle button is appended below the project links.
- Toggling reveals a panel containing a cycling image belt.

### Cycling belt behaviour
- Horizontal CSS slide transitions (`transform: translateX`).
- Auto-advances every 3.5 seconds, pauses on `mouseenter`.
- Prev/next chevron buttons (`<` / `>`).
- Dot indicators; active dot highlighted in `#E94560`.
- All colours: `#E94560` (pink), `#E3D5CA` (sand), `#1E1E1E` (surface).

## Files Changed

| File | Change |
|---|---|
| `index.html` | Remove 6 hardcoded project cards; add `id="featured-projects"` to grid div |
| `projects.html` | Add `class="project-card"` and `data-images='[]'` to each card |
| `script.js` | Add `fetchFeaturedProjects()` and `initGalleries()` functions |

## Constraints
- No text/language changes to existing content.
- Theme colours, typography, and card border styles consistent with existing design.
- Works on GitHub Pages (same-origin `fetch`); does not work locally via `file://`.
