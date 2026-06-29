# THE LAST CHECK-IN: EYES OF AL-YAMAMA
## آخر تسجيل دخول: عيون اليمامة

A runnable high-resolution browser survival-horror demo with grounded characters, voiced messages, psychological choice tracking, and a full playable story path.

**Protagonist / Guest:** Saqer  
**Age:** 18  
**Core fantasy:** A cursed desert resort records every choice, every step, and every violent act. Survival is possible, but only if the player avoids becoming something the hotel can legally own.

---

## How to Run

### Live web page
Open:

```text
https://falshammrani-cyber.github.io/the-last-checkin-eyes-of-al-yamama/
```

### Option 1: Open directly
Open `index.html` in a modern browser.

### Option 2: Local server
From this folder:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

### Codex / GitHub workflow
1. Create a private GitHub repo.
2. Upload all files from this folder.
3. Ask Codex to run the project and improve it using `CODEX_TASK_PROMPT.md`.
4. Keep `STORY_BIBLE.md` as the narrative source of truth.

---

## Controls

### PC
- `W/S` or Arrow Up/Down: move forward/back
- `A/D`: strafe
- `Q/E` or Arrow Left/Right: turn
- `Space`: interact
- `F`: flashlight
- `R`: throw shoe
- `B`: barefoot / wear shoes
- `M`: map pulse
- `I` or `Tab`: inventory wheel
- `C`: chapter select
- `D`: show/hide developer meters
- `F5`: save
- `F9`: load

### Mobile / Tablet
On-screen buttons are included:
- Move
- Turn
- Interact
- Inventory
- Flashlight
- Shoe
- Barefoot

---

## Prototype Features

- High-DPI 3D-style raycast rendering with no external dependencies.
- Higher internal canvas scale, denser raycasts, grime-textured walls, dense fog, depth haze, flashlight falloff, film grain, scanlines, letterbox framing, and foreground silhouette.
- Slower survival-horror movement with heavier turning and reduced strafing.
- Grounded character profiles for Saqer, his parents, Zarqa, the Bellboy, the Qareen, the Barefoot Bride, and Al-Mudawwin.
- More human in-world character silhouettes and larger cinematic cutscene portraits drawn directly in canvas/CSS for an asset-light presentation.
- Browser-native speech voices for cutscenes, title cards, system messages, and endings when the player enables audio through a supported browser.
- Psychological-horror chapter cards before each chapter.
- Bellboy AI with pathing, line-of-sight pursuit, route habit tracking, and shoe-lure response.
- Inventory wheel, chapter select, save/load, and mobile controls.
- Psychological choice system:
  - Survival
  - Debt
  - Violence
  - Vision
  - Sacrifice
  - Qareen
  - Empathy
  - Denial
  - Grief
  - Self-Knowledge
- Cutscene engine.
- Branching endings.
- Ambient horror audio created through WebAudio.
- No external art or sound assets required.

---

## Important Design Rule

The hotel must not only scare the player.

The hotel must **record the player**.

Every choice should change something:
- Enemy aggression
- Available exits
- Cutscene dialogue
- Ending path
- The player's relationship with Zarqa, Al-Mudawwin, the Bellboy, and the Qareen

## Story Direction

The current story pass uses high-level survival-horror lessons from psychological and domestic horror: a personal wound at the center, symbolic spaces that accuse the player, and a family truth that changes how earlier scenes read. It does not copy characters, plot beats, names, or scenes from other games; the setting and mythology remain original to **Eyes of Al-Yamama**.
