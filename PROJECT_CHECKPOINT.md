# Project Checkpoint

## Realistic Character and Story Depth Pass

Date: 2026-06-30

Live page:
https://falshammrani-cyber.github.io/the-last-checkin-eyes-of-al-yamama/

Repository:
https://github.com/falshammrani-cyber/the-last-checkin-eyes-of-al-yamama

## Current Build State

- Static browser game with no external dependencies.
- High-DPI canvas rendering with a minimum 2.75x internal scale and up to 4x device pixel ratio.
- Denser raycast columns, finer ray stepping, and procedural grime/crack wall detailing for sharper cinematic walls.
- Heavier psychological survival-horror movement: slower walking, weighted turning, reduced strafing.
- Layered fog, depth haze, flashlight falloff, foreground silhouette, scanlines, film grain, color grade, and letterbox framing.
- Grounded character profiles, CSS cutscene portraits, and in-world canvas character silhouettes.
- Larger human-style portraits and improved in-world anatomy for story characters and the Bellboy.
- Browser-native speech voices for chapter cards, cutscenes, system messages, and endings when supported.
- Psychological-horror title cards introduce each chapter before the cutscene or playable section begins.
- Deeper family story around Saqer, Nasser, Alya, Zarqa, the Qareen, and Al-Mudawwin.
- New psychological stats: empathy, denial, grief, and self-knowledge.
- New story interactions: lobby mirror, childhood CCTV feed, mother's basement call, and family table memory.
- Bellboy AI with pathing, line-of-sight pursuit, shoe lure response, and route habit tracking.
- Inventory wheel, chapter select, save/load, mobile controls, and branch-sensitive endings.
- True ending now requires restraint plus a humane psychological state, not only mechanical completion.
- HTML references versioned CSS/JS assets so GitHub Pages browsers pull this checkpoint instead of stale cached scripts.

## Checkpoints

- `checkpoint-high-res-survival-horror-2026-06-30`
- `checkpoint-realistic-characters-story-depth-2026-06-30`
- `checkpoint-realistic-characters-story-depth-2026-06-30-final`
- `checkpoint-cinematic-voices-2026-06-30`

## Verification

- JavaScript syntax checks pass for `game.js` and `story-data.js`.
- Local smoke test on `http://localhost:8080` confirms the title screen, opening cutscene, Saqer portrait/profile, high-DPI canvas render, and no browser console errors.
- Versioned asset smoke test confirms the new opening line executes from `story-data.js?v=story-depth-20260630`.
- Cinematic smoke test confirms versioned `cinematic-voices-20260630` assets, chapter-card presentation, 3520x1980 internal canvas on the default viewport, Saqer portrait/profile, gameplay render, and no browser console errors.
- Deployed GitHub Pages smoke test should confirm the live page starts the game after push.
