# THE LAST CHECK-IN: EYES OF AL-YAMAMA
## آخر تسجيل دخول: عيون اليمامة

A runnable high-resolution browser survival-horror demo.

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
- Dense fog, depth haze, flashlight falloff, film grain, scanlines, and foreground silhouette.
- Slower survival-horror movement with heavier turning and reduced strafing.
- Bellboy AI with pathing, line-of-sight pursuit, route habit tracking, and shoe-lure response.
- Inventory wheel, chapter select, save/load, and mobile controls.
- Psychological choice system:
  - Survival
  - Debt
  - Violence
  - Vision
  - Sacrifice
  - Qareen
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
