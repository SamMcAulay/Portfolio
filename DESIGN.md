---
name: Sam McAulay
description: Pastel toy clay. A hand-made clay Earth with signposts planted on it, on a soft pink ground, with matte clay slabs, pills and pebbles.
colors:
  ground: "#ffb3c7"
  ground-deep: "#f598b1"
  blush: "#ffd6e0"
  mint: "#9be7d8"
  mint-deep: "#6fd3c1"
  butter: "#ffe58a"
  blue: "#b5dcf6"
  coral: "#ff7a59"
  coral-deep: "#d94a2a"
  ink: "#2a1e3b"
  ink-soft: "#643a58"
  paper: "#fff8f2"
  cream: "#fff0e0"
typography:
  display:
    fontFamily: "'Baloo 2', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 5.6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Baloo 2', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "'Baloo 2', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 3.6vw, 3.2rem)"
    fontWeight: 800
    lineHeight: 0.95
    fontFeature: "tnum"
  title:
    fontFamily: "'Baloo 2', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(1.35rem, 1.9vw, 1.6rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: "'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    lineHeight: 1
  meta:
    fontFamily: "'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  image: "14px"
  card: "24px"
  slab: "28px"
  sheet: "40px"
  close: "48px"
  pill: "999px"
spacing:
  s1: "0.5rem"
  s2: "1rem"
  s3: "1.5rem"
  s4: "2rem"
  s5: "3rem"
  s6: "4.5rem"
  s7: "7rem"
  gutter: "clamp(16px, 4vw, 56px)"
components:
  pill:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75em 1.3em 0.8em"
  pill-action:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75em 1.3em 0.8em"
  pill-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75em 1.3em 0.8em"
  pill-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.75em 1.3em 0.8em"
  chip-top:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.6em 1.05em 0.65em"
  chip-top-hover:
    backgroundColor: "{colors.butter}"
  chip-email:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.6em 1.05em 0.65em"
  signpost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.55em 1.05em 0.6em"
  signpost-hover:
    backgroundColor: "{colors.butter}"
  clay-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.slab}"
    padding: "{spacing.s3}"
  tool-chip:
    backgroundColor: "{colors.butter}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0.45em 1em 0.5em"
  fact-tag:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "3px 11px 4px"
  close-slab:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink}"
    rounded: "{rounded.close}"
    padding: "4.5rem clamp(1.5rem, 5vw, 4.5rem) 2rem"
---

# Design System: Sam McAulay

## Overview

**Creative North Star: "Pastel Toy Clay"**

The whole site is modelled out of brightly coloured matte clay, like a toy built by hand. The ground is a soft pink; on it sit a clay Earth with mint seas and butter land, puffy cream slabs, pressed pills and coloured pebbles. Everything has weight and a soft top highlight, and every shadow is tinted by the plum ink, never black. The globe is the site's navigation: five clay signposts are planted on it, and spinning the Earth brings them round.

Density is relaxed but not sparse: proof sits in clay cards with its numbers set big, readable without a click. Type is round and chunky at the display end (Baloo 2) and calm in the body (M PLUS Rounded 1c). Motion is soft and settling: one ease-out curve, presses that sink, no bounce, no scroll-triggered fades.

There is one light theme on purpose. The clay only reads as clay when it is lit from above on a light ground, and the colour is the personality. Rejected by the build: hard ink outlines, glass and blur, black drop shadows, bouncy springs, muted corporate palettes, filmic tone mapping that greys the clay.

**Key Characteristics:**
- Soft pink ground, cream clay slabs, plum ink text.
- Depth from a layered clay light: inner top highlight, inner bottom shade, plum-tinted cast shadow.
- Fully rounded pills and circular pebbles; slab corners from 24px to 48px.
- Coral appears only where the visitor can act, plus the Athlone pin.
- One easing curve; pressed things sink, nothing bounces.

## Colors

A pastel toy palette (pink, mint, butter, sky blue, blush) with a single warm action colour and a deep plum ink.

### Primary
- **Action Coral** (#ff7a59): the face of every action pill (email, CV download, next project, live link, home from 404), the top-bar email chip, the Contact signpost and the clay pin on Athlone.
- **Fired Coral** (#d94a2a): link text for "Read more", the focus ring and the text caret.

### Secondary
- **Mint** (#9be7d8): the globe's seas (painted lighter, #a6f0e2, so they read true under the lights), the Thesis signpost, the "Team build" tag, invite pills and a project shell colour.
- **Butter** (#ffe58a): the globe's land (painted #fff1a8), the About signpost, award pills, "In the works" and "Thesis" tags, text selection, the butter project shell and the headline colour on the plum close slab.
- **Sky Blue** (#b5dcf6): the Projects signpost, link underlines and a project shell colour.
- **Blush** (#ffd6e0): the Experience signpost, the Systems tool group and a project shell colour.

### Neutral
- **Pink Ground** (#ffb3c7): the page ground, behind everything.
- **Deep Pink** (#f598b1): recessed channels cut into the ground, such as the timeline rail.
- **Paper** (#fff8f2): the default clay slab, pill and chip face, and the base every card tint is mixed into.
- **Cream** (#fff0e0): quiet fact tags, dividers inside a slab, the globe's ice caps and a project shell colour.
- **Plum Ink** (#2a1e3b): all primary text, the ink pill, solo-build tag, the closing slab, and the tint of every shadow.
- **Rose Ink** (#643a58): secondary text: lines under titles, stat labels, hints, meta. Tinted towards the ground so it never reads as grey on pink.

### Named Rules
**The Coral Means Go Rule.** Coral fills only things the visitor can press and the Athlone pin. A tone that is not an action uses mint, butter, blue or blush instead.

**The Shell Rule.** Each project owns one shell colour from butter, mint, blue, blush or cream. Its pebble, its tech chips, its project page and its featured card all take that shell; featured cards are the shell mixed 32% into Paper. Coral is never a shell.

## Typography

**Display Font:** Baloo 2, 700 and 800 (falling back to M PLUS Rounded 1c, system-ui)
**Body Font:** M PLUS Rounded 1c, 500, 700 and 800 (falling back to system-ui)

Both are self-hosted through @fontsource; no third-party font requests.

**Character:** A soft, chunky display face that looks pressed from clay, paired with a rounded sans that keeps long lines calm. Weight carries hierarchy; there is no italic or uppercase tracking voice.

### Hierarchy
- **Display** (800, clamp(3rem, 6.4vw, 5.6rem), 0.9): the name in the hero. Project titles use the same voice at clamp(2.8rem, 6.4vw, 5.4rem), 0.95.
- **Headline** (800, clamp(2.6rem, 5.4vw, 4.4rem), 1): section heads (Projects, Experience, Toolkit, About) and the close.
- **Numeral** (800, clamp(2.2rem, 3.6vw, 3.2rem), 0.95, tabular): proof numbers such as member counts. The project page grows them to clamp(3.6rem, 9vw, 7rem). The stat label sits underneath in meta type.
- **Title** (800, clamp(1.35rem, 1.9vw, 1.6rem), 1.05): card and timeline titles.
- **Body** (500, 1.0625rem, 1.6): running text; lines capped between 44ch and 62ch. Lead paragraphs step up to 700.
- **Label** (800, 0.95 to 1.05rem, line-height 1): pills, chips, signposts and the small group headings ("Featured work", tool groups), which are set in the body face, not the display face.
- **Meta** (700, 0.85 to 0.9rem): stat labels, dates, fact tags, hints, in Rose Ink.

### Named Rules
**The Two Voices Rule.** Baloo 2 is for names, headings and numbers. Anything that labels, explains or is pressed (pills, chips, small group headings) is M PLUS Rounded 1c at 700 or 800.

**The Big Proof Rule.** When a project has a number, the number is set in display type at numeral size and the words sit under it, small.

## Layout

A centred column, 1280px for content sections and 1440px for the hero and top bar, with a fluid gutter (clamp(16px, 4vw, 56px)). Spacing runs on one 8px-based scale (0.5, 1, 1.5, 2, 3, 4.5, 7rem); sections end with the 7rem step.

The hero is a two-column grid on desktop: name and role over a clay Earth (up to 520px, limited by viewport height) on the left, the three featured cards stacked on the right. Five signposts fan around the globe's upper-left rim, each slightly tilted. Below 1100px the hero stacks and centres, and the featured cards form a row of three; below 700px they stack. Below 640px the signposts drop into a wrapped chip row under the globe and the top-bar chips collapse to icons.

Section heads pair the headline with a short lead paragraph aligned to its baseline, collapsing to one column on phones. The project lineup uses a 12-column grid where cards span by weight (proof projects wider), collapsing to 6 and then 1. The timeline is a date column (9rem) beside clay tickets, joined by a recessed rail.

Breakpoints in use: 640, 680, 700, 760, 860, 900, 1100px, plus a short-laptop query (min-width 1101px, max-height 820px) that tightens the hero so all three featured cards stay in the first view.

## Elevation & Depth

Depth is lighting, not lines. Every raised surface is lit from above: a thin white inner highlight on the top edge, a soft inner shade at the bottom, and a cast shadow below tinted with Plum Ink at low alpha. Recessed things (the timeline rail, a pressed pill) take an inner shadow instead. The globe sits on the sky with a blurred plum contact shadow, as if on a table.

### Shadow Vocabulary
- **Lift** (`inset 0 2px 0 rgb(255 255 255 / 0.75), inset 0 -8px 14px -6px rgb(42 30 59 / 0.1), 0 1px 2px rgb(42 30 59 / 0.08), 0 16px 32px -14px rgb(42 30 59 / 0.32)`): clay slabs: cards, tickets, the bio, the project sheet, screenshot frames.
- **Lift Low** (`inset 0 2px 0 rgb(255 255 255 / 0.7), inset 0 -5px 10px -5px rgb(42 30 59 / 0.12), 0 1px 2px rgb(42 30 59 / 0.08), 0 8px 16px -8px rgb(42 30 59 / 0.3)`): small clay: pills, chips, signposts, date pills, award pills.
- **Pressed** (`inset 0 3px 8px rgb(42 30 59 / 0.18), 0 1px 2px rgb(42 30 59 / 0.1)`): a pill while held down.
- **Pebble** (`inset 0 -4px 10px rgb(42 30 59 / 0.1), 0 6px 12px -6px rgb(42 30 59 / 0.4)`, over two radial gradients lighting it from the top left): project pebbles.
- **Close Slab** (`inset 0 3px 0 rgb(255 255 255 / 0.35), inset 0 -14px 24px -10px rgb(42 30 59 / 0.18), 0 24px 40px -24px rgb(42 30 59 / 0.45)`): the one large plum slab at the end of the page.

### Named Rules
**The Lit From Above Rule.** Shadows are tinted with Plum Ink, never black, and every raised surface carries the white top highlight. A shadow without the highlight is not clay.

**The Press Not Fade Rule.** Interactive clay rises 2 to 4px on hover and sinks 1px on press with the pressed shadow (0.06s). It never fades or changes opacity to show state.

## Shapes

Everything is rounded and soft-edged, as if pressed by hand. Pills and chips are fully round (999px); pebbles are circles. Slabs scale their radius with their size: tickets 24px, cards 26 to 28px, the bio 32px, the project sheet 40px, the closing slab 48px (36px on phones). Images inside a frame are 14px, and the focus ring follows a 14px radius.

There are no borders on clay. The only lines are a faint 2px Cream divider inside the project sheet and the translucent inset ring of an unfinished ("in the works") pebble, which reads as a hollow pressed into the clay rather than an outline.

## Components

### Buttons (Pills)
Pressed clay pebbles, stretched.
- **Shape:** fully round (999px), padding 0.75em 1.3em 0.8em, optional 1.15em icon before or after the label.
- **Default:** Paper face, Plum Ink label, Lift Low.
- **Tones:** Action Coral for the primary action; Plum Ink with Paper text for repository links; Mint for invite links; Butter and Blush faces exist for non-action variety.
- **Hover / Press:** rises 2px with a slightly deeper cast shadow; on press sinks 1px into the Pressed shadow. All on the --out curve over 0.2s.
- **Focus:** 3px Fired Coral outline offset 4px, 14px radius.

### Chips
- **Top-bar chips:** Paper clay pills (GitHub, LinkedIn) with icon and label; hover turns them Butter and lifts 2px. The email chip is Action Coral. Under 640px labels hide and the chip becomes a round icon.
- **Tool chips:** clay pills in their group's colour (butter, mint, blue, blush, paper), Lift Low, not interactive.
- **Fact tags:** small flat pills (3px 11px) in Cream with Rose Ink text; the crew tag is Plum Ink for solo, Mint for team, Butter for in-progress and thesis.
- **Award pills:** Butter with Lift Low; on the project page they grow to display type.

### Cards / Containers
- **Corner Style:** 24 to 28px; larger containers up to 40px.
- **Background:** Paper.
- **Shadow Strategy:** Lift (see Elevation & Depth).
- **Border:** none.
- **Internal Padding:** 1.5rem, tightening to 1rem in compact rows.
- **Behaviour:** the whole card is the link target; hover lifts it 3 to 4px over 0.3s and underlines the title.

### Navigation
- **Top bar:** domain wordmark in Label type on the left, contact chips on the right; on project pages a Paper "Home" pill. It carries the `topbar` view-transition name so it holds still across pages.
- **Signposts (on the globe):** five clay posts planted on the Earth's surface (About me, Projects, Experience, Thesis, Contact), each a thick rolled post and knob in its sign's colour. Each post leans toward the top of the screen so its sign always sits on the tip. The signs are the page's real links, projected over their posts every frame; they turn with the globe, hide when they rotate to the far side, and are clamped on screen. Hover or keyboard focus turns the globe to bring that sign to the front; choosing one turns it, eases the camera in, then scrolls or navigates. Without WebGL the signs fall back to a plain row of clay pills under the globe.

### Clay Earth (signature)
A three.js globe of matte clay (roughness 0.92, no metalness) painted with seeded mottling in mint sea, butter land, cream shorelines and ice, lit by a white-and-blush hemisphere light, a warm key and a cool rim, with no tone mapping so the pastels stay true. It is draggable with inertia, turns with the arrow keys, and idles into a slow spin after 2.6s; the spin pauses while the pointer is over it or a sign has focus. It carries a Coral pin on Athlone. three.js is imported lazily after first paint; a WebP poster of the bare Earth and pin is the first paint and the fallback. Reduced motion stops the idle spin. The same poster rests in the corner of the closing slab.

### Pebbles
Small circles in a project's shell colour with a broad diffuse highlight (no hard hotspot), so they match the matte globe. They mark projects in cards, the project grid, the About list and the timeline. A project's pebble carries the `project-pebble` view-transition name and becomes the small badge beside the title on its project page. Pebbles carry no numbers.

### Closing Slab
One large Plum Ink slab with a Butter headline, the email address in Butter display type, and a row of pills (coral email first, then CV download, GitHub, LinkedIn). The bare clay Earth rests in its lower-right corner on wide screens.

## Do's and Don'ts

### Do:
- **Do** build every raised surface from Paper (or a shell colour) with the Lift or Lift Low shadow.
- **Do** use Action Coral (#ff7a59) only for actions and the Athlone pin; reach for Mint, Butter, Blue or Blush for other tones.
- **Do** give each project a shell colour from butter, mint, blue, blush or cream and carry it through pebble, chips and page.
- **Do** animate with the single --out curve, cubic-bezier(0.22, 1, 0.36, 1): 0.2s for pills, 0.25 to 0.3s for signposts and cards, 0.5s for view transitions.
- **Do** set proof numbers in Baloo 2 800 with tabular figures and the label small underneath.
- **Do** honour reduced motion: transitions collapse, view transitions and the globe's idle spin stop.

### Don't:
- **Don't** draw hard ink outlines or borders around clay; edges come from the light.
- **Don't** use black or neutral-grey shadows; tint them with Plum Ink.
- **Don't** use glass, backdrop blur or transparency to suggest depth.
- **Don't** use bounce, spring or overshoot easing, and don't fade content in on scroll.
- **Don't** fill non-action elements with coral.
- **Don't** add a dark theme; the colour on a light ground is the personality.
- **Don't** set small labels or chips in Baloo 2; they belong to M PLUS Rounded 1c.

The print CV at cv/cv.html is a separate document and is outside this system.
