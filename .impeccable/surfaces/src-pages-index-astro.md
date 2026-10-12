---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/projects/[slug].astro"]
---

# Home + project pages (sammcaulay.dev)

Scope: home (`src/pages/index.astro`) and project pages (`src/pages/projects/[slug].astro`). Visitor mode: Experience; the work leads from the first viewport. The site is also Sam's graded TUS portfolio (ENGE08016, due 2026-11-12): the AI and security direction must stay visible.

Audience: recruiters and hiring managers across industries, plus the module lecturer. Job: see who Sam is, where he's heading and his strongest proof within seconds, then contact or dig in. Constraints: Astro static on GitHub Pages; content works without JS or WebGL; reduced motion honoured; facts only from PRODUCT.md.

## Direction contract

THESIS: "Building Digital Worlds." taken literally: a hand-made clay Earth is the site's navigator, and Sam's strongest work sits beside it, readable without a click. It refuses the name-plus-card-grid portfolio and the brittle zoom-in-canvas globe of the old site.

OWN-WORLD: Daylight clay. The ground is a powder sky, #DCE9F5. Clay ocean #7DB3D8, sage land #A8CF9C, warm sand #F3DDB8, one coral #EE8472 for actions, and deep navy ink #1E2A44 for text. Surfaces are matte modelled clay: puffy rounded slabs with a top highlight and soft navy-tinted shadows, no hard ink outlines, no glass. Display type is Baloo 2 ExtraBold and body is M PLUS Rounded 1c. Project dots are small clay pebbles in the project's colour.

STORY: The visitor sees Sam's name, his role ("Software Developer, heading into AI & Security") and a clay Earth they can spin, with signposts to Projects, Thesis, Experience, About and Contact. Three featured projects (TEG Wardogs 35K+, Phisher vs Filter, AR AI Museum Guide) show their proof and links in place. They leave believing Sam ships real systems and is moving into AI and security, then contact him or open a project.

FIRST VIEWPORT: On desktop, a top bar with contact chips. The left column has the name, role and tagline over a large clay Earth (about 500px) with five clay signposts fanned around its upper-left rim. The right column stacks the three featured clay cards with numbers and live links. On tablet the cards become a row under the globe; on phones everything stacks, with the signposts as a chip row under the globe.

FORM: Clay Earth navigator, a direction pinned by the user (it overrides the earlier roll, seed 9e274048). Signature interaction: drag the Earth with inertia; it idles in a slow turn and shows a clay pin on Athlone. Choosing a signpost eases the camera in before the cross-document View Transition. Motion grammar: soft ease-out, gentle settles, nothing bouncy, no scroll fades. Built in three.js with a static poster render as the first paint and the no-WebGL fallback.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
