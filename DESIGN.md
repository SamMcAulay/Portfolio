---
name: Sam McAulay
description: A gashapon capsule machine in brand pink, where every project is a two-tone capsule you can spin, crank and pop open.
colors:
  pink: "#e94560"
  pink-deep: "#c9304d"
  pink-light: "#f37a8e"
  lemon: "#ffd23f"
  mint: "#3bceac"
  blue: "#3d7bff"
  orange: "#ff8a3d"
  shell-white: "#f6f2f7"
  ink: "#1b1420"
  ink-soft: "#5b4652"
  paper: "#fffdf9"
typography:
  display:
    fontFamily: "'Bagel Fat One', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(3.4rem, 7.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "'Bagel Fat One', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(4rem, 12vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Bagel Fat One', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.01em"
  title:
    fontFamily: "'Bagel Fat One', 'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2vw, 1.7rem)"
    fontWeight: 400
    lineHeight: 1.05
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
  tag:
    fontFamily: "'M PLUS Rounded 1c', system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  frame-inner: "12px"
  frame: "22px"
  ticket: "26px"
  card: "28px"
  sheet: "40px"
  panel: "48px"
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
    padding: "0.7em 1.25em 0.75em"
  pill-lemon:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  pill-mint:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  pill-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  sticker:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.4em 0.95em 0.48em"
  tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.tag}"
    rounded: "{rounded.pill}"
    padding: "2px 10px 3px"
  tag-solo:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  tag-team:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  tag-wip:
    backgroundColor: "{colors.lemon}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  lineup-ticket:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
    padding: "{spacing.s3}"
  intro-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "{spacing.s4}"
  instruction-sheet:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "clamp(2rem, 5vw, 4.5rem)"
  screenshot-frame:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.frame}"
    padding: "10px"
  ink-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.panel}"
    padding: "4.5rem clamp(1.5rem, 5vw, 4.5rem) 2rem"
---

# Design System: Sam McAulay

## Overview

**Creative North Star: "The Capsule Machine"**

The whole site is a gashapon vending machine, and every project is a prize in it. Brand pink is the machine body and fills the page edge to edge. On top of it sit physical, toy-shop objects: a clear acrylic dome full of two-tone capsules, a lemon plastic base with a crank and prize tray, moulded plastic pills you can press down, die-cut stickers with white kiss-cut borders, and printed paper tickets and instruction slips. Everything is outlined in ink, rounded, and looks slightly hand-placed.

The density is low and the scale is big. Fat rounded display lettering carries names and numbers, user counts are printed as huge numerals, and running text sits on paper. The only copy set on the pink is a short ink lead (700, 44ch max) beside a section head. Objects tilt by a few degrees as if stuck on by hand, then straighten when you touch them. Motion is springy and physical (drum physics, a crank that turns, a capsule that drops and pops open, pills that press in), never decorative scroll choreography.

There is one light, daytime theme. The machine is the brand, so there is no dark variant.

**Key Characteristics:**
- Pink page field (the machine body) owns at least a third of every screen.
- Every object has an ink outline (2 to 5px) and rounded corners. Nothing is square.
- Toy-shop materials: acrylic, two-tone capsule plastic, moulded pills, die-cut stickers, printed paper.
- Sticker lettering: Bagel Fat One with an ink stroke and a short ink drop.
- Small deterministic tilts that straighten on hover.
- Springy, press-down motion, plus a capsule-to-page View Transition.

## Colors

A saturated toy palette: one pink body, five capsule shell colours, ink for outlines and text, warm paper for anything you read.

### Primary
- **Machine Pink** (pink): the page background on every route, the dome's interior fill, the crank bar, display words on paper ("Building Digital Worlds."), proof numerals, and the hover underline on ticket titles. It is the machine, not an accent.
- **Pink Deep** (pink-deep): the scrollbar track only, so the rail reads as the machine's own shadow.
- **Pink Light** (pink-light): the email address set large on the ink panel, where full pink would sink into the dark.

### Secondary (Capsule Shells)
- **Lemon Shell** (lemon): the machine base, the prize door, the default sticker face, the primary call-to-action pill, the "In the works" tag, section headlines lettered on pink, and the footer headline. Also the text selection colour.
- **Mint Shell** (mint): capsule tops, the LinkedIn sticker, the "Team build" tag, and the Engines & libraries stickers.
- **Blue Shell** (blue): capsule tops and the Tooling stickers.
- **Orange Shell** (orange): capsule tops and the Systems stickers.
- **Milk Shell** (shell-white): the white capsule top, a faintly lilac off-white so it separates from paper.

### Neutral
- **Ink** (ink): every outline, all body text, the solid lip under pressable plastic, soft drop shadows (always ink at reduced alpha, never black), the "Solo build" tag, and the footer panel.
- **Ink Soft** (ink-soft): secondary copy on paper, such as ticket one-liners, the intro pitch and notes.
- **Paper** (paper): tickets, cards, the instruction sheet, screenshot frames, the default pill and sticker face, sticker kiss-cut borders, and the fill of sticker lettering.

### Named Rules
**The Pink Field Rule.** Pink is the page, and the page stays pink. Never cover it with a full-bleed neutral section. Content goes on discrete paper or ink objects sitting on the pink.

**The Shell Five Rule.** Capsule tops, sticker faces and tone variants come from lemon, mint, blue, orange or shell-white only. A sixth hue means it is not from this machine.

**The Ink Not Black Rule.** Outlines, text and shadows use ink (#1b1420) or ink at reduced alpha. Neutral grey and pure black shadows are not part of the palette.

## Typography

**Display Font:** Bagel Fat One (falling back to M PLUS Rounded 1c, then system-ui)
**Body Font:** M PLUS Rounded 1c at 500, 700 and 800 (falling back to system-ui)

**Character:** A fat, bubbly display face that looks pressed out of vinyl, paired with a rounded sans that keeps labels and paragraphs friendly and readable. Both are self-hosted through @fontsource.

### Hierarchy
- **Display** (400, clamp(3.4rem, 7.4vw, 6rem), 0.92): the name plate h1 on the home page, set as sticker lettering and rotated -3deg. Project titles use the same role at clamp(3rem, 7vw, 6rem), rotated -2deg.
- **Numeral** (400, clamp(4rem, 12vw, 9rem), 0.9): user counts on the project sheet, in pink with a 0.04em ink stroke. On lineup tickets it scales to clamp(3.2rem, 7vw, 6rem). The opened capsule's number uses this role in the shell colour.
- **Headline** (400, clamp(2.8rem, 6vw, 5rem), 0.95): section heads ("The full set", "Parts list") lettered on pink and tilted ±2deg. The footer headline uses clamp(2.6rem, 6vw, 5.2rem) in lemon, capped at 14ch.
- **Title** (400, clamp(1.4rem, 2vw, 1.7rem), 1.05): ticket project names. The prize name in the tray uses 1.45rem.
- **Body** (500, 1.0625rem, 1.6): paragraphs on paper. Measure is 34 to 62ch (intro pitch 34ch, sheet prose 62ch at 1.12rem).
- **Label** (800, 0.95 to 1rem, line-height 1): pills, stickers, the crank caption, tray hints, and the domain mark. Group headings inside sections (Parts list groups, "Built with") use this body face at 800 and 1.05rem, not the display face.
- **Tag** (700 to 800, 0.85 to 0.9rem): fact chips and meta lines.

### Named Rules
**The Sticker Lettering Rule.** Display text on pink is lettered: a paper or lemon fill, a 0.09em ink stroke painted under the fill, and a short ink drop (0 0.07em 0.02em). Display text on paper reverses this: a pink fill with a 0.04 to 0.07em ink stroke.

**The Two Faces Rule.** There are exactly two families. Bagel Fat One is for names, headlines and numbers only. Everything you read or click is M PLUS Rounded 1c, never lighter than 500.

**The Proof Numeral Rule.** A real user count is the loudest type on its surface, set in the numeral role. Never shrink it into a sentence.

## Layout

The page is a stack of objects on the pink field, with the gutter clamp(16px, 4vw, 56px) on both sides and content capped at 1280px (the machine hero at 1440px). Spacing follows one 8px-based rhythm from 0.5rem to 7rem (s1 to s7). Sections are separated by s5 to s7 of open pink, never by rules or bands.

- **Machine hero:** a two-column grid (1.15fr unit, 1fr intro) that fills the viewport (min-height 100svh minus the topbar). The dome is min(100%, 560px, 100svh minus 300px). Below 960px it stacks in the order plate, role, machine, card. Below 480px the base stacks the crank above the tray.
- **Lineup:** a 12-column ticket grid with spans set by importance (proof bots get 7 and 5 columns). Below 1100px tickets span 6 and proof tickets span 12. Below 680px it becomes one column of 88%-wide tickets that alternate left and right, with doubled tilt.
- **Section heads:** the headline and a short 44ch paragraph sit side by side, bottom-aligned, and stack below about 700px.
- **Project page:** the opened capsule (0.8fr) beside the title (1.2fr), then a full-width paper sheet (prose 1.4fr, built-with 1fr), then a two-column screenshot grid. Everything collapses to one column below 860px, where the sheet narrows to 90% and rotates -1deg.
- **Topbar:** the domain or Back pill on the left, contact stickers on the right. Below 640px the sticker labels become visually hidden and the stickers shrink to icon size.

**The Hand-Slapped Tilt Rule.** Paper and stickers carry small deterministic tilts (tickets ±0.9deg, intro card 1.5deg, stickers up to ±4.5deg, headlines ±2 to 3deg). Tilts come from the data or a hash so they never change between builds, and they settle to 0 on hover or focus.

## Elevation & Depth

Depth is physical. Every object casts a soft ink drop with a negative spread, so it sits just above the pink like something resting on a tabletop. Plastic you can press also gets a solid ink lip underneath plus top and bottom inset highlights, which make it look moulded. Specular highlights (white dots and arcs) give the capsules and the dome their gloss. There are no glows, no blur panels and no flat card-on-card stacking.

### Shadow Vocabulary
- **Paper drop** (`box-shadow: 0 16px 24px -16px rgb(27 20 32 / 0.6)`): tickets. The intro card (0 18px 30px -18px), screenshot frames (0 20px 30px -18px) and the sheet (0 30px 50px -30px) scale up the same recipe.
- **Moulded lip** (`box-shadow: inset 0 -4px 0 rgb(27 20 32 / 0.16), inset 0 3px 0 rgb(255 255 255 / 0.65), 0 5px 0 -1px #1b1420, 0 9px 14px -6px rgb(27 20 32 / 0.45)`): pills at rest. The lip shrinks to 3px on hover and to 0 on press. The crank knob uses a 6px lip.
- **Die-cut ring** (`box-shadow: 0 0 0 4px #fffdf9, 0 0 0 6.5px #1b1420, 0 10px 14px -6px rgb(27 20 32 / 0.5)`): stickers. This is a paper kiss-cut border, then an ink cut line, then a drop. Parts-list stickers use a 5px and 7.5px ring.
- **Capsule gloss** (`box-shadow: inset 0 -10px 16px -6px rgb(27 20 32 / 0.18), inset 0 6px 10px -4px rgb(255 255 255 / 0.5), 0 8px 14px -8px rgb(27 20 32 / 0.55)`): two-tone capsules, together with a white specular dot.
- **Machine body** (`box-shadow: inset 0 -10px 0 rgb(27 20 32 / 0.12), inset 0 6px 0 rgb(255 255 255 / 0.5), 0 20px 30px -18px rgb(27 20 32 / 0.6)`): the lemon base.

### Named Rules
**The Moulded Lip Rule.** A solid ink under-lip belongs only to pressable plastic (pills and the crank knob), and it collapses when pressed. Paper surfaces never get a hard offset shadow, only the soft negative-spread drop.

**The Press Rule.** Pressing plastic moves it down into its lip (translateY 2px on hover, 5px on active, active transition 0.06s). Paper and stickers lift and straighten instead.

## Shapes

Everything is rounded and outlined. Pills, stickers and tags are full capsules (999px). Paper objects use generous corners that grow with size: frame-inner 12px, frames and the tray 22px, tickets 26px, the intro card 28px, the sheet 40px and the ink panel 48px (36px on mobile). The machine base is asymmetric (18px top, 36px bottom), like a moulded housing. Capsules and the dome are circles. Opened capsule halves are half-pills with 999px on their outer edge. Outline weight scales with object size: 2 to 2.5px on chips, pills and stickers, 3px on tickets and frames, and 4 to 5px on the dome, base, sheet and opened capsule. Dashed outlines are reserved for the unreleased "?" capsule.

**The No Square Corner Rule.** The smallest corner in the system is 12px (inner screenshot crops and the focus ring). Nothing ships square.

## Components

### Buttons (Moulded Pills)
Pressable plastic that clicks down.
- **Shape:** full capsule (999px) with a 2.5px ink outline.
- **Default:** paper face, ink label (800, 1rem), padding 0.7em 1.25em 0.75em, a 0.55em gap to an optional 1.15em inline SVG icon.
- **Tones:** lemon for the main action on any surface ("See the full set", "Send an email", Back), mint for secondary live links, ink with a paper label for repo links. Blue is also available.
- **Hover / Active:** the pill sinks 2px on hover and 5px on press, and the lip shrinks with it. Transform uses the spring curve (0.18s). On the ink panel the lip is drawn darker so it still reads.
- **Focus:** a 3px ink outline, offset 4px (lemon on the ink panel).

### Chips (Fact Tags)
- **Style:** small capsules (2px outline at 20% ink alpha on tickets, 2.5px full ink on the project hero), 700 to 800 weight at 0.85 to 0.9rem.
- **Provenance variants:** "Solo build" is ink with a paper label, "Team build" is mint, "In the works" is lemon. These honest marks always lead the chip row.
- **Built-with chips** on the project sheet use the project's own shell colour as the face.

### Die-cut Stickers
Contact links in the topbar and the parts-list items.
- Capsule shape with a coloured face, a 2.5px ink outline, a paper kiss-cut ring and an ink cut line (see Elevation).
- Each sticker has a deterministic tilt. On hover it straightens and scales to 1.08 to 1.1 on the spring curve, and on press it scales to 0.96.
- Contact faces are paper (GitHub), mint (LinkedIn) and lemon (Email). Parts-list faces follow their group's tone.

### Cards / Containers
- **Lineup ticket:** paper, 3px ink outline, 26px corners, s3 padding, paper drop, tilted. A mini capsule (64px, or 88px on proof tickets) carries the number. The whole ticket is the link target. On hover it straightens, lifts 4px, and the capsule rolls -18deg.
- **Intro card:** paper, 3px outline, 28px corners, s4 padding, rotated 1.5deg. It holds the series line in pink lettering.
- **Instruction sheet:** paper, 4px outline, 40px corners, the deep paper drop. It holds the proof numeral, the prose and the built-with chips.
- **Screenshot frame:** a 10px paper mat with a 3px outline and 22px corners. The image inside has 12px corners. Frames take deterministic tilts and settle on hover (scale 1.02).
- **Ink panel (footer):** an inset ink slab with 48px corners sitting on the pink, not a full-bleed band. It holds the lemon headline, the email in pink-light display, and pills. On mobile it rotates -1deg.

### Navigation
The topbar is a View Transition anchor (`topbar`) shared by every page. On the left is the domain mark (label role) on the home page, or a lemon Back pill on project pages. On the right are three contact stickers that stay visible at every width and collapse to icon-only below 640px. A skip link is an ink pill that drops in on focus.

### Capsule (signature)
A circle with a 2.5px ink outline. Its fill is the shell colour above a 3% ink seam above milky white (82%), with a white specular dot and a soft top sheen. The number sits in display type on the coloured half, and the name sits in label type on the milky half. The unreleased capsule has a transparent top, a dashed outline and a "?".

### Capsule Machine (signature)
- **Dome:** a pink-filled circle with a 4px ink outline and an inset white rim. Masked white specular arcs ride the rim above the capsules, so it reads as acrylic rather than a glass card. Dragging spins a physics drum (gravity, low bounce, wall grip) that comes to rest. With reduced motion it renders the static arrangement.
- **Base:** a lemon housing with a paper crank knob (92px, 72px on small screens) crossed by a pink bar, and a recessed amber prize tray with a hinged lemon door.
- **Dispense:** turning the crank spins the knob 360deg (0.9s, out curve). The door flaps, a capsule drops in with a spring and its top pops open, and the prize text wipes in.
- **Open:** on the project page the capsule becomes a 400px opened capsule, its top shell tipped -24deg and the number rising out of the base. It is linked to the home capsule by the `capsule` View Transition.

## Do's and Don'ts

### Do:
- **Do** keep the page field pink on every route and place content on discrete paper, plastic or ink objects.
- **Do** outline every object in ink, scaling the stroke with size (2 to 5px).
- **Do** draw capsule and sticker faces from the five shell colours only.
- **Do** set display text on pink as sticker lettering (paper or lemon fill, 0.09em ink stroke, short ink drop), and display text on paper as pink with an ink stroke.
- **Do** print real user counts at numeral scale in pink.
- **Do** use the spring curve, cubic-bezier(0.34, 1.56, 0.64, 1), for press, settle and pop. Use the out curve, cubic-bezier(0.16, 1, 0.3, 1), for shadows, wipes, the crank turn and View Transitions.
- **Do** give paper and stickers deterministic tilts that straighten on hover or focus.
- **Do** set running text on paper, at weight 500 or above, within a 34 to 62ch measure. On the pink, only use short ink leads at 700 or above, capped at 44ch.
- **Do** honour reduced motion: transitions collapse to 0.01ms and the drum rests static.

### Don't:
- **Don't** use frosted or blurred glass panels. The only transparent object is the acrylic dome, and its gloss comes from specular arcs.
- **Don't** put a hard offset shadow on paper. A solid under-lip is only for pressable plastic.
- **Don't** add a third typeface, or set display type in any face other than Bagel Fat One.
- **Don't** use square corners, hairline greys or pure-black shadows.
- **Don't** add scroll-triggered fades or reveals. Motion comes from touch, the crank and page transitions.
- **Don't** add a dark theme. The machine is a single daytime scene.
- **Don't** introduce a sixth shell hue or tint the pink field toward another hue.
