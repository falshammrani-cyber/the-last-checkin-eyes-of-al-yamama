# Project Checkpoint

## Realistic Character and Story Depth Pass

Date: 2026-06-30

Live page:
https://falshammrani-cyber.github.io/the-last-checkin-eyes-of-al-yamama/

Repository:
https://github.com/falshammrani-cyber/the-last-checkin-eyes-of-al-yamama

## Current Build State

- Static browser game with no external dependencies.
- High-DPI canvas rendering with a minimum 2x internal scale and up to 3.5x device pixel ratio.
- Denser raycast columns and finer ray stepping for sharper walls.
- Heavier psychological survival-horror movement: slower walking, weighted turning, reduced strafing.
- Layered fog, depth haze, flashlight falloff, foreground silhouette, scanlines, and film grain.
- Grounded character profiles, CSS cutscene portraits, and in-world canvas character silhouettes.
- Deeper family story around Saqer, Nasser, Alya, Zarqa, the Qareen, and Al-Mudawwin.
- New psychological stats: empathy, denial, grief, and self-knowledge.
- New story interactions: lobby mirror, childhood CCTV feed, mother's basement call, and family table memory.
- Bellboy AI with pathing, line-of-sight pursuit, shoe lure response, and route habit tracking.
- Inventory wheel, chapter select, save/load, mobile controls, and branch-sensitive endings.
- True ending now requires restraint plus a humane psychological state, not only mechanical completion.

## Checkpoints

- `checkpoint-high-res-survival-horror-2026-06-30`
- `checkpoint-realistic-characters-story-depth-2026-06-30`

## Verification

- JavaScript syntax checks pass for `game.js` and `story-data.js`.
- Local smoke test on `http://localhost:8080` confirms the title screen, opening cutscene, Saqer portrait/profile, high-DPI canvas render, and no browser console errors.
- Deployed GitHub Pages smoke test should confirm the live page starts the game after push.
