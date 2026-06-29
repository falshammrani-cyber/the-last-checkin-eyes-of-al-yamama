# Project Checkpoint

## High-Resolution Survival Horror Pass

Date: 2026-06-30

Live page:
https://falshammrani-cyber.github.io/the-last-checkin-eyes-of-al-yamama/

Repository:
https://github.com/falshammrani-cyber/the-last-checkin-eyes-of-al-yamama

## Current Build State

- Static browser game with no external dependencies.
- High-DPI canvas rendering up to 3x device pixel ratio.
- Denser raycast columns and finer ray stepping for sharper walls.
- Heavier psychological survival-horror movement: slower walking, weighted turning, reduced strafing.
- Layered fog, depth haze, flashlight falloff, foreground silhouette, scanlines, and film grain.
- Bellboy AI with pathing, line-of-sight pursuit, shoe lure response, and route habit tracking.
- Inventory wheel, chapter select, save/load, mobile controls, and branch-sensitive endings.

## Verification

- JavaScript syntax checks should pass for `game.js` and `story-data.js`.
- Local smoke test should confirm the title screen, opening cutscene, canvas render, inventory, and chapter selector.
- Deployed GitHub Pages smoke test should confirm the live page starts the game without console errors.
