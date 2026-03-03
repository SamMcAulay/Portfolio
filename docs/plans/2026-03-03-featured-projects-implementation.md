# Featured Projects — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove hardcoded projects from `index.html`, fetch two random projects from `projects.html` on load, and add a per-project gallery dropdown with a cycling image belt on both pages.

**Architecture:** `projects.html` is the canonical data source; each card gets `class="project-card"` and `data-images='[]'`. `index.html` fetches and parses `projects.html` at runtime, shuffles the cards, injects 2 into `#featured-projects`. `initGalleries()` in `script.js` wires up gallery dropdowns on any page that has `.project-card` elements.

**Tech Stack:** Vanilla JS, Tailwind CSS (CDN), static HTML. No test runner — verification is visual/manual in browser.

---

### Task 1: Mark project cards in `projects.html`

**Files:**
- Modify: `projects.html:49,64,80,95,110,125`

Add `class="project-card"` and `data-images='[]'` to the outer `<div>` of every project card. There are 6 cards. Currently each starts:

```html
<div class="group relative bg-theme-surface border border-theme-sand/20 hover:border-theme-pink transition-colors duration-300 p-8">
```

Change every one to:

```html
<div class="project-card group relative bg-theme-surface border border-theme-sand/20 hover:border-theme-pink transition-colors duration-300 p-8" data-images='[]'>
```

**Step 1: Apply the change to all 6 cards**

Use Edit for each card. The 6 card titles are: Battleship Game, Math Game Web App, Laser Game, Space VR Explorer, Moonhaul, Pangbot.

**Step 2: Verify**

Open `projects.html` in an editor and confirm all 6 outer divs start with `class="project-card group relative...` and have `data-images='[]'`.

**Step 3: Commit**

```bash
git add projects.html
git commit -m "feat: mark project cards with class and data-images attribute"
```

---

### Task 2: Prepare `index.html` — remove hardcoded cards, add grid anchor

**Files:**
- Modify: `index.html:68-167`

**Step 1: Remove the 6 hardcoded project cards from `index.html`**

The `#projects` section currently contains a grid div with 6 cards (lines 74–165). Replace the entire inner grid content with an empty div that has `id="featured-projects"`, and add a "View All Projects" link below it. Keep the section heading and outer structure untouched.

Replace from:
```html
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="group relative bg-theme-surface border border-theme-sand/20 hover:border-theme-pink transition-colors duration-300 p-8">
```
...all 6 cards...through the closing `</div>` of the grid, down to (but not including) the `</div>` that closes `max-w-7xl`:

```html
            <div id="featured-projects" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            </div>

            <div class="mt-12 text-center">
                <a href="projects.html" class="text-sm font-bold uppercase tracking-widest border-b border-theme-pink pb-1 hover:text-theme-pink transition-colors duration-300">View All Projects</a>
            </div>
```

**Step 2: Verify**

The `#projects` section in `index.html` should now contain only:
- The `<h2>Featured Projects</h2>` heading
- An empty `<div id="featured-projects" class="grid ...">`
- The "View All Projects" link

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: replace hardcoded project cards with dynamic fetch target"
```

---

### Task 3: Add `fetchFeaturedProjects()` to `script.js`

**Files:**
- Modify: `script.js` (append before the closing `});` of `DOMContentLoaded`)

**Step 1: Add the fetch function**

Insert this function definition inside the `DOMContentLoaded` callback (before the final closing `};`):

```javascript
    // Fetch and inject 2 random projects from projects.html
    async function fetchFeaturedProjects() {
        const grid = document.getElementById('featured-projects');
        if (!grid) return;

        try {
            const response = await fetch('projects.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const cards = Array.from(doc.querySelectorAll('.project-card'));

            // Fisher-Yates shuffle
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }

            cards.slice(0, 2).forEach(card => {
                grid.appendChild(document.importNode(card, true));
            });

            initGalleries(grid);
        } catch (e) {
            console.warn('Could not load projects:', e);
        }
    }
```

**Step 2: Wire up the call at the bottom of `DOMContentLoaded`**

At the very end of the `DOMContentLoaded` callback (after the tech orbit block, before the closing `});`), add:

```javascript
    // Featured projects (index.html)
    if (document.getElementById('featured-projects')) {
        fetchFeaturedProjects();
    }

    // Gallery dropdowns (projects.html — cards already in DOM)
    if (document.querySelector('.project-card')) {
        initGalleries(document);
    }
```

**Step 3: Verify structure**

`script.js` should now have `fetchFeaturedProjects` and the two wiring calls inside `DOMContentLoaded`, but `initGalleries` does not exist yet — that is fine for now (it is added in the next task).

**Step 4: Commit**

```bash
git add script.js
git commit -m "feat: add fetchFeaturedProjects to pull random cards from projects.html"
```

---

### Task 4: Add `initGalleries()` to `script.js`

**Files:**
- Modify: `script.js` (append alongside `fetchFeaturedProjects`, inside `DOMContentLoaded`)

**Step 1: Add the function**

Insert this immediately after `fetchFeaturedProjects`:

```javascript
    // Build gallery dropdowns for any .project-card with data-images
    function initGalleries(container) {
        const scope = (container === document || !container)
            ? document
            : container;
        const cards = scope.querySelectorAll('.project-card');

        cards.forEach(card => {
            // Skip if gallery already built
            if (card.querySelector('.gallery-section')) return;

            let images;
            try {
                images = JSON.parse(card.getAttribute('data-images') || '[]');
            } catch (_) {
                return;
            }
            if (!images.length) return;

            // --- Outer section ---
            const section = document.createElement('div');
            section.className = 'gallery-section mt-6 border-t border-theme-sand/20 pt-4';

            // --- Toggle button ---
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'gallery-toggle text-xs font-bold uppercase tracking-widest border-b border-theme-sand/50 pb-1 hover:text-theme-pink hover:border-theme-pink transition-colors duration-300';
            toggleBtn.textContent = 'Gallery';

            // --- Collapsible panel ---
            const panel = document.createElement('div');
            panel.className = 'gallery-panel mt-4';
            panel.style.display = 'none';

            // --- Belt wrapper (clips overflow) ---
            const beltWrapper = document.createElement('div');
            beltWrapper.className = 'relative overflow-hidden border border-theme-sand/20';
            beltWrapper.style.height = '200px';

            // --- Belt (sliding strip) ---
            const belt = document.createElement('div');
            belt.className = 'gallery-belt flex h-full';
            belt.style.cssText = `width:${images.length * 100}%; transition: transform 0.5s ease;`;

            images.forEach(src => {
                const slide = document.createElement('div');
                slide.style.cssText = `width:${100 / images.length}%; flex-shrink:0; height:100%;`;
                const img = document.createElement('img');
                img.src = src;
                img.alt = '';
                img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';
                slide.appendChild(img);
                belt.appendChild(slide);
            });

            // --- Prev / Next buttons ---
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '&#8249;';
            prevBtn.className = 'absolute left-0 top-0 h-full px-3 text-theme-sand bg-theme-dark/60 hover:text-theme-pink hover:bg-theme-dark/80 transition-colors text-2xl font-bold flex items-center';

            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '&#8250;';
            nextBtn.className = 'absolute right-0 top-0 h-full px-3 text-theme-sand bg-theme-dark/60 hover:text-theme-pink hover:bg-theme-dark/80 transition-colors text-2xl font-bold flex items-center';

            // --- Dot indicators ---
            const dotsWrap = document.createElement('div');
            dotsWrap.className = 'flex justify-center space-x-2 mt-3';
            const dots = images.map((_, i) => {
                const d = document.createElement('button');
                d.className = `w-2 h-2 border transition-colors duration-300 ${i === 0 ? 'bg-theme-pink border-theme-pink' : 'border-theme-sand/50 bg-transparent'}`;
                dotsWrap.appendChild(d);
                return d;
            });

            beltWrapper.appendChild(belt);
            beltWrapper.appendChild(prevBtn);
            beltWrapper.appendChild(nextBtn);
            panel.appendChild(beltWrapper);
            panel.appendChild(dotsWrap);
            section.appendChild(toggleBtn);
            section.appendChild(panel);
            card.appendChild(section);

            // --- State & controls ---
            let current = 0;
            let timer = null;

            const goTo = idx => {
                current = (idx + images.length) % images.length;
                belt.style.transform = `translateX(-${current * (100 / images.length)}%)`;
                dots.forEach((d, i) => {
                    d.className = `w-2 h-2 border transition-colors duration-300 ${i === current ? 'bg-theme-pink border-theme-pink' : 'border-theme-sand/50 bg-transparent'}`;
                });
            };

            const startAuto = () => { timer = setInterval(() => goTo(current + 1), 3500); };
            const stopAuto  = () => clearInterval(timer);

            prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
            nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
            dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));
            beltWrapper.addEventListener('mouseenter', stopAuto);
            beltWrapper.addEventListener('mouseleave', startAuto);

            toggleBtn.addEventListener('click', () => {
                const isOpen = panel.style.display !== 'none';
                panel.style.display = isOpen ? 'none' : 'block';
                toggleBtn.textContent = isOpen ? 'Gallery' : 'Gallery ▲';
                if (isOpen) stopAuto(); else startAuto();
            });
        });
    }
```

**Step 2: Verify**

- `initGalleries` is defined inside `DOMContentLoaded` alongside `fetchFeaturedProjects`.
- The wiring calls at the bottom of `DOMContentLoaded` already reference `initGalleries` — no further changes needed.

**Step 3: Commit**

```bash
git add script.js
git commit -m "feat: add initGalleries with cycling belt and toggle dropdown"
```

---

### Task 5: Visual verification — `projects.html`

**Step 1: Serve the site locally**

From the repo root, start a local server (needed because `index.html` uses `fetch`):

```bash
python3 -m http.server 8080
# or: npx serve .
```

Open `http://localhost:8080/projects.html`.

**Step 2: Confirm all 6 project cards render correctly**

- All 6 projects visible, layout unchanged.
- No "Gallery" buttons visible (all `data-images` are empty `[]`).

**Step 3: Test gallery with a real image**

Edit one card in `projects.html` temporarily:
```html
data-images='["https://via.placeholder.com/800x400/E94560/E3D5CA?text=Test"]'
```

Reload. Confirm:
- "Gallery" button appears at the bottom of that card.
- Clicking it expands the panel showing the image.
- "Gallery ▲" text shown when open.
- Clicking again collapses.
- Prev/next and dot do not error (only 1 image, navigation cycles back to same slide).

Revert the test image change.

---

### Task 6: Visual verification — `index.html`

**Step 1: Open `http://localhost:8080/index.html`**

**Step 2: Confirm the Featured Projects section**

- Exactly 2 project cards are shown.
- Reload several times — a different pair appears on (at least some) reloads.
- Card content (title, tech tag, description, links) matches what is in `projects.html`.
- "View All Projects" link is present below the cards and navigates to `projects.html`.

**Step 3: Test gallery on main page**

Temporarily add a placeholder image to one project in `projects.html` (as in Task 5 Step 3). Reload `index.html` several times until that project appears as one of the 2 featured. Confirm the gallery dropdown works identically to `projects.html`.

Revert the test image.

**Step 4: Commit verification note**

```bash
git add -A
git commit -m "feat: complete featured projects random selection and gallery

- projects.html is canonical card source
- index.html fetches and displays 2 random cards per load
- gallery dropdown with cycling belt on both pages
- gallery hidden until data-images is populated"
```

---

### Task 7: How to add images to a project

This is not a code task — it is a usage note for the site owner.

To attach images to a project, edit the `data-images` attribute on the relevant `.project-card` div in `projects.html`:

```html
<div class="project-card ..." data-images='["images/battleship/1.jpg", "images/battleship/2.jpg", "images/battleship/3.jpg"]'>
```

- Place image files anywhere under the repo (suggested: `images/<project-slug>/`).
- Paths are relative to the HTML file (both pages are in the root, so `images/foo/bar.jpg` works from both).
- Once `data-images` is non-empty, the Gallery button appears automatically on both pages.
- Absolute URLs (e.g. hosted screenshots) also work.

Commit the updated `projects.html` and image files together:

```bash
git add projects.html images/
git commit -m "content: add gallery images for <project name>"
```
