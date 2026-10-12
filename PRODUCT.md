# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: employers and recruiters (hiring managers, technical screeners) assessing Sam McAulay for developer roles. They usually arrive from a CV, LinkedIn or GitHub link and skim quickly. Their job is to decide whether Sam builds real, working software, and success means they reach out (email, LinkedIn) or dig into the GitHub repos.

## Product Purpose

A personal portfolio at sammcaulay.dev presenting Sam McAulay as a software developer heading into AI and security, with a track record across games, web, bots and infrastructure ("Building Digital Worlds."). It exists to turn a recruiter's quick look into proof of capability and a contact. It is also Sam's graded digital portfolio for TUS module ENGE08016 (due 2026-11-12), where the rubric rewards work that is highly relevant to his stated goals, so the AI and security direction must stay visible.

## Positioning

What this portfolio can claim that a typical student or junior portfolio can't:

- **Live community infrastructure:** for The Employed Gamers (TEG) community, Sam hosts and runs the Warcon admin panel for six Wardogs game servers (VPS, Docker, Cloudflare tunnel and Access) and built the services on top of it: the stats site (stats.tegwardogs.fyi), six server-status Discord bots, a moderation log bot, and Janguard (VIP management). These services reach 35,000+ Discord members and 20,000+ in-game players (figures from Sam).
- **Real users at scale:** Discord bots in production. The Jantleman Bot serves 50,000+ users and Flicker Bot serves 100+, with live server invites.
- **Range across platforms:** Unity games (including VR), C++/SFML networked games, a C++/Crow web app with CI/CD and Docker, Python bots, and Linux desktop work.
- **Linux / window-manager craft:** an animated i3 + experimental picom config, a maintained Neovim config, and NCWM (a no-code dynamic tiling Wayland compositor, early WIP).
- **Team and hackathon work:** Hackathon Athlone 2025 (Space VR Explorer, NASA API) and team repos under collaborators' accounts (Carlbytes, SamsonA00321296).

Future work should keep all four visible. None of them should be dropped to make room for another.

## Operating Context

- Visitors land on `/` (capsule machine hero, the full set of 11 projects, the tech sticker sheet, the contact panel) and open `/projects/<slug>/` pages. The old `/projects.html` redirects to `/#set`.
- `src/data/projects.ts` is the canonical project data: names, copy, links, screenshots, user counts, and solo/team/WIP status.
- Contact channels: GitHub (SamMcAulay), LinkedIn (sammca05), email (SamMcAulay@pm.me).

## Capabilities and Constraints

- Astro static build on GitHub Pages with the custom domain `sammcaulay.dev` (`public/CNAME`), deployed by `.github/workflows/deploy.yml` on push to main.
- Copy may be tightened, but facts and numbers may not change without Sam.

## Brand Commitments

- Name: Sam McAulay. Role line: "Software Developer, heading into AI & Security" (changed by Sam, October 2026; was "Fullstack Developer - Game | Web | Desktop"). Tagline: "Building Digital Worlds."
- Team builds (confirmed by Sam): Math Game Web App, Battleship, Space VR Explorer, Moonhaul. Everything else is solo, and NCWM is work in progress.
- Sam is looking for developer roles, especially in AI and security; the footer says so.
- Education: BSc (Hons) Software Design with Virtual Reality and Gaming, TUS Athlone, 2023 to 2027. Dean's Honours List, on course for a first. Facts in the timeline come from Sam's CV (October 2026).
- Thesis "Phisher vs Filter" (AI and email security) is approved by the supervisor; no results yet, so present it as in progress.
- AR AI Museum Guide was commissioned by Khora during Sam's placement (Jan to May 2026); Sam was lead and only developer.
- Moonhaul: Sam was lead game developer; awards Best Gameplay, Best Use of a Physics Engine, Best Soundtrack (per CV).

## Evidence on Hand

- Project write-ups and repo links: `src/data/projects.ts` (14 entries, including TEG Wardogs, Janguard, AI Museum Guide, the two configs and NCWM).
- Live sites: stats.tegwardogs.fyi, flicker-bot.com, thejantleman.com. The Warcon panel (tegwardogs.fyi) sits behind Cloudflare Access and is not linked publicly.
- Screenshots: `public/Pics/Flicker/` (4) and `public/Pics/Jan/` (4). No screenshots exist yet for the other projects.
- User counts as stated in the copy: Jantleman 50,000+, Flicker 100+, TEG services 35,000+ Discord members and 20,000+ in-game players.
- Live demo: https://se3-mathgame.duckdns.org/.
- None on hand: testimonials, employer references, metrics beyond the user counts, CV/résumé download. Don't fabricate any of these.

## Product Principles

1. Proof over claims. Lead with things a recruiter can verify: live bots, user counts, repos, demos.
2. Fast to scan. A recruiter should understand range and impact within seconds, before scrolling deep.
3. Breadth without dilution. Show games, web, desktop and systems work as one coherent developer, not a scattered list.
4. Always one step from contact. GitHub, LinkedIn and email stay easy to reach.
