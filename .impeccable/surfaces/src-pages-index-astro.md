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

OWN-WORLD: Pastel toy clay. Soft pink #FFB3C7 is the page ground. Paper #FFF8F2 is the clay slab. Mint #9BE7D8, butter #FFE58A and sky blue #B5DCF6 are the project and globe colours, coral #FF7A59 is the primary action, and deep plum #2A1E3B is the ink. Matte modelled clay: puffy rounded slabs with a top highlight and soft plum-tinted shadows, no hard outlines, no glass. Display type is Baloo 2 ExtraBold, body is M PLUS Rounded 1c. The clay Earth has a mint ocean and butter land.

STORY: The visitor sees Sam's name, his role ("Software Developer, heading into AI & Security") and a clay Earth they can spin, with signposts to Projects, Thesis, Experience, About and Contact. Three featured projects (TEG Wardogs 35K+, Phisher vs Filter, AR AI Museum Guide) show their proof and links in place. They leave believing Sam ships real systems and is moving into AI and security, then contact him or open a project.

FIRST VIEWPORT: On desktop, a top bar with contact chips. The left column has the name, role and tagline over a large clay Earth (about 500px). Five clay signposts are planted on the globe's surface (Projects, Thesis, Experience, About, Contact): coloured sign pills on posts that turn with the globe and fade on the far side. There are no floating nav pills. The right column stacks the three featured cards. Tablet puts the cards in a row under the globe; phones stack everything.

FORM: Clay Earth navigator, a user-pinned direction (overrides the earlier roll, seed 9e274048), revised by the user on 2026-10-12 to a pastel palette and signposts planted on the globe. Signature interaction: spin the Earth to bring a signpost round, then click it: the globe turns it to face you and the camera dives in before navigating or scrolling. Focusing a sign by keyboard turns the globe to it. Motion grammar: soft ease-out, nothing bouncy, no scroll fades. three.js, lazy-loaded, with a WebP poster as first paint and the no-WebGL fallback, where the signs become a plain link row.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
