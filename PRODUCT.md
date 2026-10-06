# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: employers and recruiters (hiring managers, technical screeners) assessing Sam McAulay for developer roles. They usually arrive from a CV, LinkedIn or GitHub link and skim quickly. Their job is to decide whether Sam builds real, working software, and success means they reach out (email, LinkedIn) or dig into the GitHub repos.

## Product Purpose

A personal portfolio at sammcaulay.dev presenting Sam McAulay as a fullstack developer across games, web and desktop ("Building Digital Worlds."). It exists to turn a recruiter's quick look into proof of capability and a contact.

## Positioning

What this portfolio can claim that a typical student or junior portfolio can't:

- **Real users at scale:** Discord bots in production. The Jantleman Bot serves 50,000+ users and Flicker Bot serves 100+, with live server invites.
- **Range across platforms:** Unity games (including VR), C++/SFML networked games, a C++/Crow web app with CI/CD and Docker, Python bots, and Linux desktop work.
- **Linux / window-manager craft:** an animated i3 + experimental picom config, a maintained Neovim config, and NCWM (a no-code dynamic tiling Wayland compositor, early WIP).
- **Team and hackathon work:** Hackathon Athlone 2025 (Space VR Explorer, NASA API) and team repos under collaborators' accounts (Carlbytes, SamsonA00321296).

Future work should keep all four visible. None of them should be dropped to make room for another.

## Operating Context

- Visitors land on `index.html` (hero, featured projects, managed configs, tech stack, In The Works) and can go on to `projects.html` (full project list).
- `projects.html` is the canonical project data. `script.js` fetches it, picks 2 random `.project-card` elements as homepage features, and builds per-project image galleries from `data-images`. This only works over HTTP, not `file://`.
- Contact channels: GitHub (SamMcAulay), LinkedIn (sammca05), email (SamMcAulay@pm.me).

## Capabilities and Constraints

- Static site on GitHub Pages with the custom domain `sammcaulay.dev` (CNAME). Plain HTML, the Tailwind CDN and vanilla JS, with no build step.
- Undecided: whether static hosting with no build step, the projects.html-as-source pattern, and the existing copy are binding constraints or open to change. They are the current state, but the user hasn't confirmed them as hard rules.

## Brand Commitments

- Name: Sam McAulay. Role line: "Fullstack Developer - Game | Web | Desktop". Tagline: "Building Digital Worlds."

## Evidence on Hand

- Project write-ups and repo links: `projects.html` (8 projects).
- Screenshots: `Pics/Flicker/` (4) and `Pics/Jan/` (4). No screenshots exist yet for the other projects.
- User counts as stated in the copy: Jantleman 50,000+ and Flicker 100+.
- Live demo: https://se3-mathgame.duckdns.org/.
- None on hand: testimonials, employer references, metrics beyond the user counts, CV/résumé download. Don't fabricate any of these.

## Product Principles

1. Proof over claims. Lead with things a recruiter can verify: live bots, user counts, repos, demos.
2. Fast to scan. A recruiter should understand range and impact within seconds, before scrolling deep.
3. Breadth without dilution. Show games, web, desktop and systems work as one coherent developer, not a scattered list.
4. Always one step from contact. GitHub, LinkedIn and email stay easy to reach.
