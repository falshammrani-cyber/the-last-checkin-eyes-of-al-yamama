(() => {
  "use strict";

  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d", { alpha: false });

  const ui = {
    hudChapter: document.getElementById("chapterLabel"),
    objective: document.getElementById("objective"),
    stateLine: document.getElementById("stateLine"),
    message: document.getElementById("message"),
    cutscene: document.getElementById("cutscene"),
    speakerPortrait: document.getElementById("speakerPortrait"),
    speakerProfile: document.getElementById("speakerProfile"),
    speaker: document.getElementById("speaker"),
    cutsceneText: document.getElementById("cutsceneText"),
    nextCutscene: document.getElementById("nextCutscene"),
    choicePanel: document.getElementById("choicePanel"),
    choiceTitle: document.getElementById("choiceTitle"),
    choiceText: document.getElementById("choiceText"),
    choices: document.getElementById("choices"),
    endingPanel: document.getElementById("endingPanel"),
    endingTitle: document.getElementById("endingTitle"),
    endingText: document.getElementById("endingText"),
    restartButton: document.getElementById("restartButton"),
    startScreen: document.getElementById("startScreen"),
    startButton: document.getElementById("startButton"),
    loadFromStartButton: document.getElementById("loadFromStartButton"),
    saveButton: document.getElementById("saveButton"),
    loadButton: document.getElementById("loadButton"),
    inventoryButton: document.getElementById("inventoryButton"),
    chapterButton: document.getElementById("chapterButton"),
    inventoryWheel: document.getElementById("inventoryWheel"),
    chapterSelect: document.getElementById("chapterSelect"),
    chapterList: document.getElementById("chapterList"),
    closeChapterSelect: document.getElementById("closeChapterSelect"),
    devMeters: document.getElementById("devMeters"),
    meterText: document.getElementById("meterText"),
  };

  const TAU = Math.PI * 2;
  const FOV = Math.PI / 3.25;
  const MAX_DEPTH = 22;
  const MOVE_SPEED = 2.05;
  const STRAFE_WEIGHT = 0.64;
  const TURN_SPEED = 1.72;
  const RAY_STEP = 0.024;
  const SAVE_KEY = "last-checkin-eyes-of-al-yamama-save-v2";

  let W = 1, H = 1, DPR = 1;

  const game = {
    running: false,
    paused: true,
    activeChapterIndex: 0,
    chapter: null,
    map: [],
    player: { x: 2.2, y: 8.5, angle: -1.25 },
    keys: {},
    touch: {},
    time: 0,
    last: performance.now(),
    flashlight: false,
    barefoot: false,
    hasOriginalShoe: 2,
    dev: false,
    inventoryOpen: false,
    chapterSelectOpen: false,
    triggered: new Set(),
    currentCutscene: null,
    currentCutsceneIndex: 0,
    pendingNextChapter: null,
    eventMessageCooldown: 0,
    hotelPulse: 0,
    visual: {
      step: 0,
      motion: 0,
      sway: 0,
      breath: 0
    },
    routeMemory: {},
    lastPlayerCell: "",
    shoeLure: null,
    bellboy: {
      active: true,
      x: 9.5,
      y: 2.5,
      heat: 0,
      state: "watching",
      target: null,
      path: [],
      pathTimer: 0,
      knockTimer: 7,
      visibleTimer: 0,
      stunTimer: 0,
      catchCooldown: 0,
      suspicion: 0,
      lastSeen: null
    },
    inventory: {
      receipt: true,
      childShoe: false,
      ledgerKey: false
    },
    record: {
      survival: 0,
      debt: 0,
      violence: 0,
      vision: 0,
      sacrifice: 0,
      qareen: 0,
      curiosity: 0,
      empathy: 0,
      denial: 0,
      grief: 0,
      selfKnowledge: 0,
      bellboyHeat: 0,
      signedReceipt: false,
      burnedReceipt: false,
      fatherWeaknessKnown: false,
      knowsFateBending: false,
      childShoeKept: false,
      childShoeReturned: false,
      signedContract: false,
      barefootMastery: false,
      knowsShadowRule: false,
      knowsFatherTruth: false,
      signedFatherContract: false,
      fatherLeft: false,
      promisedLedgerBreak: false,
      offeredNothing: false,
      finalSign: false,
      gaveEyes: false,
      attemptedSurvivalExit: false
    }
  };

  const palettes = {
    lobby: {
      ceiling: "#070707",
      floor: "#17120e",
      wallA: "#5b4630",
      wallB: "#2e241b",
      fog: "rgba(0,0,0,0.1)",
      fogColor: "#8b8170"
    },
    security: {
      ceiling: "#02050a",
      floor: "#08101c",
      wallA: "#1e3a54",
      wallB: "#0b1722",
      fog: "rgba(30,80,140,0.08)",
      fogColor: "#6b8faf"
    },
    rooms: {
      ceiling: "#080606",
      floor: "#170d0d",
      wallA: "#5a2424",
      wallB: "#241010",
      fog: "rgba(80,0,0,0.08)",
      fogColor: "#8c5752"
    },
    wedding: {
      ceiling: "#0d0202",
      floor: "#270707",
      wallA: "#7a1414",
      wallB: "#2b0505",
      fog: "rgba(140,0,0,0.13)",
      fogColor: "#9c524c"
    },
    service: {
      ceiling: "#050706",
      floor: "#0d130f",
      wallA: "#324034",
      wallB: "#121a14",
      fog: "rgba(0,50,20,0.08)",
      fogColor: "#657565"
    },
    bank: {
      ceiling: "#050505",
      floor: "#101010",
      wallA: "#3d3a30",
      wallB: "#161611",
      fog: "rgba(160,130,80,0.06)",
      fogColor: "#8b846f"
    },
    home: {
      ceiling: "#090807",
      floor: "#21160f",
      wallA: "#6a4b32",
      wallB: "#2b1b12",
      fog: "rgba(180,120,40,0.05)",
      fogColor: "#96704d"
    },
    tower: {
      ceiling: "#000003",
      floor: "#050409",
      wallA: "#1b1430",
      wallB: "#07040e",
      fog: "rgba(80,80,180,0.10)",
      fogColor: "#676ba8"
    }
  };

  function resize() {
    DPR = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3.5);
    W = Math.floor(window.innerWidth * DPR);
    H = Math.floor(window.innerHeight * DPR);
    canvas.width = W;
    canvas.height = H;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
  }
  window.addEventListener("resize", resize);
  resize();

  const speakerCharacterMap = {
    "SAQER": "saqer",
    "FATHER": "father",
    "MOTHER": "mother",
    "ZARQA": "zarqa",
    "THE BELLBOY": "bellboy",
    "ELEVATOR": "bellboy",
    "THE BAREFOOT BRIDE": "bride",
    "AL-MUDAWWIN": "mudawwin",
    "CCTV FEED 03": "saqer",
    "FAMILY TABLE": "mother"
  };

  function getCharacterProfile(id) {
    if (!id) return null;
    return STORY_DATA.characters?.[id] || null;
  }

  function characterIdFromSpeaker(speaker) {
    if (!speaker) return "";
    return speakerCharacterMap[String(speaker).trim().toUpperCase()] || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderSpeakerProfile(profile) {
    if (!ui.speakerPortrait || !ui.speakerProfile) return;
    if (!profile) {
      ui.speakerPortrait.classList.add("hidden");
      ui.speakerProfile.textContent = "";
      return;
    }
    const visual = profile.visual || {};
    ui.speakerPortrait.style.setProperty("--portrait-skin", visual.skin || "#b88962");
    ui.speakerPortrait.style.setProperty("--portrait-hair", visual.hair || "#15110e");
    ui.speakerPortrait.style.setProperty("--portrait-cloth", visual.cloth || "#2b2f35");
    ui.speakerPortrait.style.setProperty("--portrait-accent", visual.accent || "#67a7ff");
    ui.speakerPortrait.style.setProperty("--portrait-eye", visual.eye || "#201a15");
    ui.speakerProfile.innerHTML =
      `<b>${escapeHtml(profile.name)}</b> / ${escapeHtml(profile.role)}<br>` +
      `${escapeHtml(profile.wound)}<br>` +
      `<span>${escapeHtml(profile.truth)}</span>`;
    ui.speakerPortrait.classList.remove("hidden");
  }

  const AudioHorror = {
    ctx: null,
    master: null,
    drone: null,
    hiss: null,
    pulse: null,
    enabled: false,

    start() {
      if (this.enabled) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.06;
      this.master.connect(this.ctx.destination);

      const osc = this.ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = 41;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 220;

      const gain = this.ctx.createGain();
      gain.gain.value = 0.20;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.master);
      osc.start();

      const hissBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 2, this.ctx.sampleRate);
      const hissData = hissBuffer.getChannelData(0);
      for (let i = 0; i < hissData.length; i++) {
        hissData[i] = (Math.random() * 2 - 1) * 0.22;
      }
      const hiss = this.ctx.createBufferSource();
      hiss.buffer = hissBuffer;
      hiss.loop = true;
      const hissFilter = this.ctx.createBiquadFilter();
      hissFilter.type = "bandpass";
      hissFilter.frequency.value = 760;
      hissFilter.Q.value = 0.8;
      const hissGain = this.ctx.createGain();
      hissGain.gain.value = 0.015;
      hiss.connect(hissFilter);
      hissFilter.connect(hissGain);
      hissGain.connect(this.master);
      hiss.start();

      const pulseOsc = this.ctx.createOscillator();
      pulseOsc.type = "sine";
      pulseOsc.frequency.value = 68;
      const pulseGain = this.ctx.createGain();
      pulseGain.gain.value = 0.0001;
      pulseOsc.connect(pulseGain);
      pulseGain.connect(this.master);
      pulseOsc.start();

      this.drone = { osc, filter, gain };
      this.hiss = { source: hiss, filter: hissFilter, gain: hissGain };
      this.pulse = { osc: pulseOsc, gain: pulseGain };
      this.enabled = true;
    },

    setTension(value) {
      if (!this.enabled || !this.drone) return;
      const t = Math.max(0, Math.min(1, value));
      this.drone.filter.frequency.setTargetAtTime(180 + t * 620, this.ctx.currentTime, 0.2);
      this.master.gain.setTargetAtTime(0.04 + t * 0.08, this.ctx.currentTime, 0.3);
      if (this.hiss) {
        this.hiss.filter.frequency.setTargetAtTime(540 + t * 1700, this.ctx.currentTime, 0.35);
        this.hiss.gain.gain.setTargetAtTime(0.012 + t * 0.055, this.ctx.currentTime, 0.35);
      }
      if (this.pulse) {
        this.pulse.osc.frequency.setTargetAtTime(52 + t * 34, this.ctx.currentTime, 0.25);
        this.pulse.gain.gain.setTargetAtTime(t > 0.48 ? 0.035 + t * 0.05 : 0.0001, this.ctx.currentTime, 0.2);
      }
    },

    knock() {
      if (!this.enabled) return;
      const now = this.ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = 90;
        gain.gain.setValueAtTime(0.0001, now + i * 0.23);
        gain.gain.exponentialRampToValueAtTime(0.22, now + i * 0.23 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.23 + 0.13);
        osc.connect(gain);
        gain.connect(this.master);
        osc.start(now + i * 0.23);
        osc.stop(now + i * 0.23 + 0.16);
      }
    },

    sting() {
      if (!this.enabled) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.65);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
      osc.connect(gain);
      gain.connect(this.master);
      osc.start(now);
      osc.stop(now + 0.7);
    }
  };

  function getChapterById(id) {
    return STORY_DATA.chapters.find(c => c.id === id);
  }

  function findBellboySpawn(chapter) {
    const preferred = [
      { x: chapter.start.x + 7, y: chapter.start.y - 7 },
      { x: chapter.start.x + 6, y: chapter.start.y },
      { x: 9.5, y: 2.5 },
      { x: 2.5, y: 2.5 }
    ];
    for (const point of preferred) {
      if (!isWall(point.x, point.y)) return point;
    }
    for (let y = 1; y < game.map.length - 1; y++) {
      for (let x = game.map[y].length - 2; x > 0; x--) {
        if (!game.map[y][x]) return { x: x + 0.5, y: y + 0.5 };
      }
    }
    return { x: chapter.start.x, y: chapter.start.y };
  }

  function resetBellboyForChapter(chapter) {
    const spawn = findBellboySpawn(chapter);
    game.bellboy.x = spawn.x;
    game.bellboy.y = spawn.y;
    game.bellboy.state = "watching";
    game.bellboy.target = null;
    game.bellboy.path = [];
    game.bellboy.pathTimer = 0;
    game.bellboy.stunTimer = 0;
    game.bellboy.catchCooldown = 0;
    game.bellboy.suspicion = 0;
    game.bellboy.lastSeen = null;
    game.bellboy.knockTimer = 7 + Math.random() * 4;
    game.shoeLure = null;
  }

  function loadChapter(idOrIndex, options = {}) {
    let chapter;
    if (typeof idOrIndex === "number") chapter = STORY_DATA.chapters[idOrIndex];
    else chapter = getChapterById(idOrIndex);

    if (!chapter) chapter = STORY_DATA.chapters[0];

    game.chapter = chapter;
    game.activeChapterIndex = STORY_DATA.chapters.indexOf(chapter);
    game.map = chapter.map.map(row => row.split("").map(Number));
    game.player.x = chapter.start.x;
    game.player.y = chapter.start.y;
    game.player.angle = chapter.start.angle;
    if (!options.keepTriggered) game.triggered.clear();
    resetBellboyForChapter(chapter);
    game.lastPlayerCell = "";
    rememberPlayerCell();

    ui.hudChapter.textContent = chapter.title;
    ui.objective.textContent = "Objective: " + chapter.objective;
    updateStateLine();

    if (chapter.intro && options.intro !== false) {
      startCutscene(chapter.intro);
    } else {
      showMessage(chapter.title, 1800);
    }
  }

  function updateStateLine() {
    const shoeState = game.barefoot ? "Barefoot" : "Shoes On";
    const lightState = game.flashlight ? "On" : "Off";
    const shoeCount = Math.max(0, game.hasOriginalShoe);
    ui.stateLine.textContent = `${shoeState} · Original shoes: ${shoeCount}/2 · Flashlight: ${lightState} · Guest: Saqer, 18`;
  }

  function syncInventoryFromRecord() {
    game.inventory.childShoe = !!(game.record.childShoeKept && !game.record.childShoeReturned);
    game.inventory.ledgerKey = !!(game.record.knowsFatherTruth || game.record.promisedLedgerBreak);
    document.querySelectorAll(".wheel-item").forEach(btn => {
      const item = btn.dataset.item;
      btn.disabled =
        (item === "shoe" && game.hasOriginalShoe <= 0) ||
        (item === "receipt" && !game.inventory.receipt) ||
        (item === "map" && !game.running);
    });
  }

  function rememberPlayerCell() {
    if (!game.chapter) return;
    const key = `${game.chapter.id}:${Math.floor(game.player.x)},${Math.floor(game.player.y)}`;
    if (key === game.lastPlayerCell) return;
    game.lastPlayerCell = key;
    game.routeMemory[key] = (game.routeMemory[key] || 0) + 1;
  }

  function getHabitTarget() {
    let best = null;
    let bestScore = 0;
    const prefix = `${game.chapter?.id}:`;
    for (const [key, score] of Object.entries(game.routeMemory)) {
      if (!key.startsWith(prefix) || score <= bestScore) continue;
      const coords = key.slice(prefix.length).split(",").map(Number);
      best = { x: coords[0] + 0.5, y: coords[1] + 0.5 };
      bestScore = score;
    }
    return best;
  }

  function snapshotGame() {
    return {
      version: 2,
      chapterId: game.chapter?.id || STORY_DATA.chapters[0].id,
      player: { ...game.player },
      flashlight: game.flashlight,
      barefoot: game.barefoot,
      hasOriginalShoe: game.hasOriginalShoe,
      record: { ...game.record },
      inventory: { ...game.inventory },
      routeMemory: { ...game.routeMemory },
      triggered: [...game.triggered]
    };
  }

  function saveGame(silent = false) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(snapshotGame()));
      if (!silent) showMessage("Saved. The ledger failed to keep the only copy.", 1600);
      return true;
    } catch (err) {
      showMessage("Save failed. The browser refused the ledger.", 1800);
      return false;
    }
  }

  function loadGame() {
    let data;
    try {
      data = JSON.parse(localStorage.getItem(SAVE_KEY) || "null");
    } catch (err) {
      data = null;
    }
    if (!data || !data.chapterId) {
      showMessage("No saved check-in found.", 1400);
      return false;
    }

    ui.startScreen.classList.add("hidden");
    ui.endingPanel.classList.add("hidden");
    ui.choicePanel.classList.add("hidden");
    ui.cutscene.classList.add("hidden");
    AudioHorror.start();
    game.running = true;
    game.paused = false;
    loadChapter(data.chapterId, { intro: false });

    if (data.player) {
      game.player.x = data.player.x;
      game.player.y = data.player.y;
      game.player.angle = data.player.angle;
    }
    game.flashlight = !!data.flashlight;
    game.barefoot = !!data.barefoot;
    game.hasOriginalShoe = typeof data.hasOriginalShoe === "number" ? clamp(data.hasOriginalShoe, 0, 2) : 2;
    game.record = { ...game.record, ...(data.record || {}) };
    game.inventory = { ...game.inventory, ...(data.inventory || {}) };
    game.routeMemory = { ...(data.routeMemory || {}) };
    game.triggered = new Set(Array.isArray(data.triggered) ? data.triggered : []);
    applyEffects({});
    syncInventoryFromRecord();
    updateStateLine();
    updateMeters();
    showMessage("Loaded saved check-in.", 1500);
    return true;
  }

  function showMessage(text, ms = 2200) {
    ui.message.textContent = text;
    ui.message.classList.remove("hidden");
    clearTimeout(showMessage._timer);
    showMessage._timer = setTimeout(() => ui.message.classList.add("hidden"), ms);
  }

  function startCutscene(id, onDone, characterHint = "") {
    const scenes = STORY_DATA.cutscenes[id];
    if (!scenes) return;
    game.paused = true;
    game.currentCutscene = { id, scenes, onDone, characterHint };
    game.currentCutsceneIndex = 0;
    ui.cutscene.classList.remove("hidden");
    renderCutscene();
    AudioHorror.sting();
  }

  function renderCutscene() {
    const scene = game.currentCutscene.scenes[game.currentCutsceneIndex];
    ui.speaker.textContent = scene.speaker || "";
    ui.cutsceneText.textContent = scene.text || "";
    const characterId =
      scene.character ||
      characterIdFromSpeaker(scene.speaker) ||
      game.currentCutscene.characterHint;
    renderSpeakerProfile(getCharacterProfile(characterId));
  }

  ui.nextCutscene.addEventListener("click", () => {
    if (!game.currentCutscene) return;
    game.currentCutsceneIndex++;
    if (game.currentCutsceneIndex >= game.currentCutscene.scenes.length) {
      const done = game.currentCutscene.onDone;
      ui.cutscene.classList.add("hidden");
      game.currentCutscene = null;
      game.paused = false;
      if (typeof done === "function") done();
      if (game.pendingNextChapter) {
        const next = game.pendingNextChapter;
        game.pendingNextChapter = null;
        loadChapter(next);
        saveGame(true);
      }
    } else {
      renderCutscene();
    }
  });

  function showChoice(id) {
    const choice = STORY_DATA.choices[id];
    if (!choice) return;
    game.paused = true;
    ui.choiceTitle.textContent = choice.title;
    ui.choiceText.textContent = choice.text;
    ui.choices.innerHTML = "";
    choice.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;
      btn.addEventListener("click", () => selectChoice(id, idx));
      ui.choices.appendChild(btn);
    });
    ui.choicePanel.classList.remove("hidden");
    AudioHorror.sting();
  }

  function selectChoice(choiceId, idx) {
    const choice = STORY_DATA.choices[choiceId];
    const opt = choice.options[idx];
    ui.choicePanel.classList.add("hidden");
    applyEffects(opt.effects || {});
    syncInventoryFromRecord();
    updateStateLine();
    updateMeters();

    if (opt.after) showMessage(opt.after, 3000);
    else if (opt.result) showMessage(opt.result, 2600);

    game.paused = false;

    if (opt.ending) {
      setTimeout(resolveEnding, 900);
    } else {
      saveGame(true);
    }
  }

  function applyEffects(effects) {
    for (const [key, value] of Object.entries(effects)) {
      if (typeof value === "number") {
        if (key === "hasOriginalShoe") {
          game.hasOriginalShoe = Math.max(0, Math.min(2, game.hasOriginalShoe + value));
        } else if (typeof game.record[key] === "number") {
          game.record[key] += value;
        } else if (typeof game.record[key] === "boolean") {
          game.record[key] = value > 0;
        } else {
          game.record[key] = value;
        }
      } else {
        game.record[key] = value;
      }
    }
    game.record.survival = clamp(game.record.survival, -5, 20);
    game.record.debt = clamp(game.record.debt, -5, 20);
    game.record.violence = clamp(game.record.violence, 0, 20);
    game.record.vision = clamp(game.record.vision, -5, 20);
    game.record.sacrifice = clamp(game.record.sacrifice, 0, 20);
    game.record.qareen = clamp(game.record.qareen, 0, 20);
    game.record.empathy = clamp(game.record.empathy || 0, 0, 20);
    game.record.denial = clamp(game.record.denial || 0, 0, 20);
    game.record.grief = clamp(game.record.grief || 0, 0, 20);
    game.record.selfKnowledge = clamp(game.record.selfKnowledge || 0, 0, 20);
    game.record.bellboyHeat = clamp(game.record.bellboyHeat, 0, 20);
    game.bellboy.heat = game.record.bellboyHeat + Math.max(0, game.record.debt) * 0.25 + game.record.qareen * 0.2;
  }

  function resolveEnding() {
    const r = game.record;
    let ending = "trapped";
    const humanEnough = (r.empathy || 0) + (r.selfKnowledge || 0) >= 2 && (r.denial || 0) <= 5;

    const trueEligible =
      r.offeredNothing &&
      r.survival >= 6 &&
      r.debt <= 1 &&
      r.violence <= 3 &&
      r.qareen <= 3 &&
      humanEnough &&
      r.promisedLedgerBreak &&
      (game.hasOriginalShoe >= 1) &&
      (r.knowsFatherTruth || r.knowsFateBending);

    const survivalEligible =
      r.attemptedSurvivalExit &&
      r.survival >= 5 &&
      r.debt <= 2 &&
      !r.signedReceipt &&
      !r.signedFatherContract &&
      r.fatherLeft;

    if (r.finalSign || r.signedFatherContract || r.debt >= 7) {
      ending = "debt";
    } else if (r.qareen >= 6 || r.violence >= 7) {
      ending = "qareen";
    } else if (r.gaveEyes && (r.sacrifice >= 4 || r.vision >= 4)) {
      ending = "eye";
    } else if (trueEligible) {
      ending = "true";
    } else if (survivalEligible || (r.attemptedSurvivalExit && r.survival >= 4 && r.debt <= 3)) {
      ending = "survival";
    } else if (r.offeredNothing && !trueEligible) {
      ending = "survival";
    }

    const e = STORY_DATA.endings[ending];
    ui.endingTitle.textContent = e.title;
    ui.endingText.textContent = e.text;
    ui.endingPanel.classList.remove("hidden");
    game.paused = true;
    AudioHorror.sting();
  }

  ui.restartButton.addEventListener("click", () => location.reload());

  function updateMeters() {
    const r = game.record;
    ui.meterText.textContent =
`Survival: ${r.survival}
Debt: ${r.debt}
Violence: ${r.violence}
Vision: ${r.vision}
Sacrifice: ${r.sacrifice}
Qareen: ${r.qareen}
Curiosity: ${r.curiosity}
Empathy: ${r.empathy}
Denial: ${r.denial}
Grief: ${r.grief}
Self-Knowledge: ${r.selfKnowledge}
Bellboy Heat: ${r.bellboyHeat}
Bellboy State: ${game.bellboy.state}
Suspicion: ${game.bellboy.suspicion.toFixed(1)}
Signed Receipt: ${r.signedReceipt}
Father Contract: ${r.signedFatherContract}
Father Left: ${r.fatherLeft}
Original Shoes: ${game.hasOriginalShoe}/2`;
  }

  function setOverlayPause(isOpen) {
    if (!game.running) return;
    const modalOpen =
      !!game.currentCutscene ||
      !ui.choicePanel.classList.contains("hidden") ||
      !ui.endingPanel.classList.contains("hidden");
    game.paused = isOpen || modalOpen;
  }

  function closeInventory() {
    game.inventoryOpen = false;
    ui.inventoryWheel.classList.add("hidden");
    setOverlayPause(game.chapterSelectOpen);
  }

  function toggleInventory(force) {
    if (!game.running || game.currentCutscene || !ui.choicePanel.classList.contains("hidden")) return;
    const next = typeof force === "boolean" ? force : !game.inventoryOpen;
    game.inventoryOpen = next;
    syncInventoryFromRecord();
    ui.inventoryWheel.classList.toggle("hidden", !next);
    setOverlayPause(next || game.chapterSelectOpen);
  }

  function useInventoryItem(item) {
    if (item === "close") {
      closeInventory();
      return;
    }
    closeInventory();
    if (item === "shoe") {
      throwShoe();
    } else if (item === "flashlight") {
      toggleFlashlight();
    } else if (item === "barefoot") {
      toggleBarefoot();
    } else if (item === "receipt") {
      showMessage(game.record.signedReceipt ? "The signature crawls when you look away." : "The unsigned receipt remains blank where your future should be.", 2200);
      if (!game.record.signedReceipt) applyEffects({ survival: 1 });
    } else if (item === "map") {
      mapPulse();
    }
  }

  function populateChapterSelect() {
    ui.chapterList.innerHTML = "";
    STORY_DATA.chapters.forEach((chapter, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = chapter.title;
      btn.addEventListener("click", () => {
        closeChapterSelect();
        ui.startScreen.classList.add("hidden");
        AudioHorror.start();
        game.running = true;
        game.paused = false;
        loadChapter(idx, { intro: false });
        showMessage("Test jump recorded. The hotel noticed the shortcut.", 1800);
        saveGame(true);
      });
      ui.chapterList.appendChild(btn);
    });
  }

  function openChapterSelect() {
    populateChapterSelect();
    game.chapterSelectOpen = true;
    ui.chapterSelect.classList.remove("hidden");
    setOverlayPause(true);
  }

  function closeChapterSelect() {
    game.chapterSelectOpen = false;
    ui.chapterSelect.classList.add("hidden");
    setOverlayPause(game.inventoryOpen);
  }

  function isWall(x, y) {
    const mx = Math.floor(x);
    const my = Math.floor(y);
    if (my < 0 || my >= game.map.length || mx < 0 || mx >= game.map[0].length) return true;
    return game.map[my][mx] === 1;
  }

  function move(dx, dy) {
    const nx = game.player.x + dx;
    const ny = game.player.y + dy;
    if (!isWall(nx, game.player.y)) game.player.x = nx;
    if (!isWall(game.player.x, ny)) game.player.y = ny;
  }

  function cellKey(x, y) {
    return `${x},${y}`;
  }

  function pointToCell(point) {
    return { x: Math.floor(point.x), y: Math.floor(point.y) };
  }

  function findPath(from, to) {
    const start = pointToCell(from);
    const goal = pointToCell(to);
    if (isWall(goal.x + 0.5, goal.y + 0.5)) return [];

    const queue = [start];
    const cameFrom = new Map();
    cameFrom.set(cellKey(start.x, start.y), null);
    const dirs = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 }
    ];

    for (let head = 0; head < queue.length; head++) {
      const current = queue[head];
      if (current.x === goal.x && current.y === goal.y) break;
      for (const dir of dirs) {
        const next = { x: current.x + dir.x, y: current.y + dir.y };
        const key = cellKey(next.x, next.y);
        if (cameFrom.has(key) || isWall(next.x + 0.5, next.y + 0.5)) continue;
        cameFrom.set(key, current);
        queue.push(next);
      }
    }

    const goalKey = cellKey(goal.x, goal.y);
    if (!cameFrom.has(goalKey)) return [];
    const path = [];
    let current = goal;
    while (current) {
      path.push({ x: current.x + 0.5, y: current.y + 0.5 });
      current = cameFrom.get(cellKey(current.x, current.y));
    }
    path.reverse();
    return path.slice(1);
  }

  function hasLineOfSight(ax, ay, bx, by) {
    const dist = Math.hypot(bx - ax, by - ay);
    const steps = Math.max(1, Math.ceil(dist / 0.12));
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      if (isWall(ax + (bx - ax) * t, ay + (by - ay) * t)) return false;
    }
    return true;
  }

  function findRandomOpenCell() {
    const open = [];
    for (let y = 1; y < game.map.length - 1; y++) {
      for (let x = 1; x < game.map[y].length - 1; x++) {
        if (!game.map[y][x]) open.push({ x: x + 0.5, y: y + 0.5 });
      }
    }
    return open[Math.floor(Math.random() * open.length)] || { x: game.player.x, y: game.player.y };
  }

  function registerNoise(x, y, intensity, reason = "footstep") {
    const b = game.bellboy;
    if (!b.active || b.stunTimer > 0) return;
    const adjusted = intensity + b.heat * 0.025 + (game.flashlight ? 0.08 : 0);
    if (adjusted < 0.18) return;
    b.suspicion = clamp(b.suspicion + adjusted, 0, 10);
    b.target = { x, y, ttl: 3.5 + adjusted * 5, reason };
    b.state = reason === "shoe" ? "collecting" : "investigating";
    b.pathTimer = 0;
  }

  function moveBellboyToward(point, amount) {
    const b = game.bellboy;
    const dx = point.x - b.x;
    const dy = point.y - b.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.05) return true;
    const step = Math.min(amount, dist);
    const nx = b.x + (dx / dist) * step;
    const ny = b.y + (dy / dist) * step;
    if (!isWall(nx, b.y)) b.x = nx;
    if (!isWall(b.x, ny)) b.y = ny;
    return dist <= 0.22;
  }

  function handleBellboyCatch() {
    const b = game.bellboy;
    if (b.catchCooldown > 0) return;
    b.catchCooldown = 8;
    b.stunTimer = 1.8;
    applyEffects(game.record.violence > 4 ? { qareen: 1, bellboyHeat: 1 } : { debt: 1, bellboyHeat: 1 });
    updateMeters();
    updateStateLine();
    AudioHorror.knock();
    showMessage("The Bellboy opens the ledger against your chest. One line writes itself.", 2600);

    const spawn = findBellboySpawn(game.chapter);
    b.x = spawn.x;
    b.y = spawn.y;
    b.target = null;
    b.path = [];
    saveGame(true);
  }

  function updateBellboy(dt) {
    const b = game.bellboy;
    if (!b.active || !game.chapter) return;

    b.catchCooldown = Math.max(0, b.catchCooldown - dt);
    if (b.stunTimer > 0) {
      b.stunTimer = Math.max(0, b.stunTimer - dt);
      return;
    }

    if (game.shoeLure) {
      game.shoeLure.timer -= dt;
      if (game.shoeLure.timer <= 0) game.shoeLure = null;
    }

    const playerDist = Math.hypot(game.player.x - b.x, game.player.y - b.y);
    const sightRange = 3.9 + b.heat * 0.42 + (game.flashlight ? 3.15 : 0);
    const seesPlayer = playerDist < sightRange && hasLineOfSight(b.x, b.y, game.player.x, game.player.y);

    if (seesPlayer) {
      b.state = "hunting";
      b.lastSeen = { x: game.player.x, y: game.player.y, ttl: 2.6 };
      b.target = { x: game.player.x, y: game.player.y, ttl: 0.7, reason: "sight" };
      b.suspicion = clamp(b.suspicion + dt * (1.2 + b.heat * 0.08), 0, 10);
    } else if (b.lastSeen) {
      b.lastSeen.ttl -= dt;
      if (b.lastSeen.ttl > 0) {
        b.state = "tracking";
        b.target = { x: b.lastSeen.x, y: b.lastSeen.y, ttl: b.lastSeen.ttl, reason: "last-seen" };
      } else {
        b.lastSeen = null;
      }
    }

    if (b.target) {
      b.target.ttl -= dt;
      if (b.target.ttl <= 0 && !seesPlayer) b.target = null;
    }

    if (!b.target && game.shoeLure) {
      b.state = "collecting";
      b.target = { x: game.shoeLure.x, y: game.shoeLure.y, ttl: game.shoeLure.timer, reason: "shoe" };
    }

    if (!b.target && (b.heat > 2.4 || game.record.qareen > 2)) {
      const habit = getHabitTarget();
      if (habit) {
        b.state = "auditing";
        b.target = { ...habit, ttl: 3.5, reason: "habit" };
      }
    }

    if (!b.target) {
      b.state = "watching";
      if (!b.path.length || Math.random() < dt * 0.08) {
        b.target = { ...findRandomOpenCell(), ttl: 5, reason: "patrol" };
      }
    }

    b.pathTimer -= dt;
    if (b.target && b.pathTimer <= 0) {
      b.path = findPath({ x: b.x, y: b.y }, b.target);
      b.pathTimer = b.state === "hunting" ? 0.22 : 0.55;
    }

    const dest = b.path[0] || b.target;
    if (dest) {
      const speed =
        (0.70 + b.heat * 0.09 + b.suspicion * 0.045) *
        (b.state === "hunting" ? 1.48 : b.state === "collecting" ? 0.76 : 1);
      if (moveBellboyToward(dest, speed * dt)) b.path.shift();
    }

    if (playerDist < 0.78) handleBellboyCatch();
    b.suspicion = Math.max(0, b.suspicion - dt * 0.12);
  }

  function castRay(angle) {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    let distance = 0;
    let hit = false;
    let hitX = 0, hitY = 0;

    while (!hit && distance < MAX_DEPTH) {
      distance += RAY_STEP;
      hitX = game.player.x + cos * distance;
      hitY = game.player.y + sin * distance;
      if (isWall(hitX, hitY)) hit = true;
    }

    const shade = 1 - Math.min(distance / MAX_DEPTH, 1);
    return { distance, shade, hitX, hitY };
  }

  function render() {
    const palette = palettes[game.chapter?.walls || "lobby"] || palettes.lobby;
    const horizon = H * 0.52 + (game.visual.sway * 9 + game.visual.breath * 2) * DPR;

    const ceiling = ctx.createLinearGradient(0, 0, 0, horizon);
    ceiling.addColorStop(0, shadeColor(palette.ceiling, 0.42));
    ceiling.addColorStop(1, palette.ceiling);
    ctx.fillStyle = ceiling;
    ctx.fillRect(0, 0, W, horizon);

    const floor = ctx.createLinearGradient(0, horizon, 0, H);
    floor.addColorStop(0, shadeColor(palette.floor, 0.95));
    floor.addColorStop(0.55, palette.floor);
    floor.addColorStop(1, shadeColor(palette.floor, 0.30));
    ctx.fillStyle = floor;
    ctx.fillRect(0, horizon, W, H - horizon);

    // floor lines for movement/tension
    ctx.globalAlpha = 0.20;
    ctx.strokeStyle = "rgba(0,0,0,0.85)";
    for (let y = horizon; y < H; y += H / 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + Math.sin(game.time * 0.75 + y * 0.008) * 3 * DPR);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.13;
    for (let x = -W; x <= W * 2; x += W / 12) {
      ctx.beginPath();
      ctx.moveTo(W / 2, horizon);
      ctx.lineTo(x + Math.sin(game.time * 0.5 + x) * 8 * DPR, H);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    const columns = Math.min(1800, Math.max(420, Math.floor(W / (DPR >= 2.5 ? 1.35 : 1.55))));
    const colW = W / columns;

    for (let i = 0; i < columns; i++) {
      const cameraX = (i / Math.max(1, columns - 1)) - 0.5;
      const rayAngle = game.player.angle + cameraX * FOV;
      const ray = castRay(rayAngle);
      const corrected = ray.distance * Math.cos(rayAngle - game.player.angle);
      const wallHeight = Math.min(H * 1.25, (H * 1.08) / (corrected + 0.001));
      const x = i * colW;
      const y = horizon - wallHeight / 2;

      const alt = ((Math.floor(ray.hitX) + Math.floor(ray.hitY)) % 2) === 0;
      const base = alt ? palette.wallA : palette.wallB;
      const beam = game.flashlight
        ? clamp(1 - Math.abs(cameraX) * 2.35, 0, 1) * clamp(1 - corrected / 13, 0, 1)
        : 0;
      const fog = clamp((corrected - 1.6) / (MAX_DEPTH * 0.62), 0, 0.92);
      const brightness = clamp(0.08 + ray.shade * 1.14 + beam * 0.62 - fog * 0.48, 0.035, 1.08);
      ctx.fillStyle = shadeColor(base, brightness);
      ctx.fillRect(x, y, colW + 1, wallHeight);

      ctx.fillStyle = `rgba(0,0,0,${0.05 + fog * 0.24})`;
      ctx.fillRect(x, y, colW + 1, wallHeight * 0.16);
      ctx.fillRect(x, y + wallHeight * 0.84, colW + 1, wallHeight * 0.16);

      ctx.fillStyle = hexToRgba(palette.fogColor, fog * (game.flashlight ? 0.36 : 0.58));
      ctx.fillRect(x, y, colW + 1, wallHeight);

      // vertical damp/wall texture
      if (i % 9 === 0) {
        ctx.fillStyle = `rgba(0,0,0,${0.10 + corrected / MAX_DEPTH * 0.28})`;
        ctx.fillRect(x, y, Math.max(1, 0.7 * DPR), wallHeight);
      }
      if (i % 29 === 0) {
        ctx.fillStyle = `rgba(210,190,150,${0.025 + fog * 0.04})`;
        ctx.fillRect(x, y + wallHeight * 0.12, Math.max(1, 1.2 * DPR), wallHeight * 0.72);
      }

      // blue-eye camera shimmer in security/tower chapters
      if ((game.chapter?.walls === "security" || game.chapter?.walls === "tower") && i % 37 === 0) {
        ctx.fillStyle = `rgba(103,167,255,${0.07 + Math.sin(game.time * 3 + i) * 0.04})`;
        ctx.fillRect(x, y, colW * 2, wallHeight);
      }
    }

    drawWorldFog(palette, horizon);
    drawEvents3D();
    drawShoeLure();
    drawBellboy();
    drawForegroundSilhouette();
    drawVignette();
    drawFearOverlay();
    drawPostProcess();

    if (game.dev) drawMiniMap();
  }

  function drawWorldFog(palette, horizon) {
    ctx.save();
    const heavy = game.flashlight ? 0.34 : 0.52;
    const fog = ctx.createLinearGradient(0, horizon - H * 0.05, 0, H);
    fog.addColorStop(0, hexToRgba(palette.fogColor, 0.04));
    fog.addColorStop(0.45, hexToRgba(palette.fogColor, heavy * 0.18));
    fog.addColorStop(1, hexToRgba(palette.fogColor, heavy * 0.34));
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = "screen";
    for (let i = 0; i < 8; i++) {
      const y = horizon + ((i * H * 0.12 + game.time * (9 + i * 2) * DPR) % (H * 0.92));
      const alpha = 0.018 + (i % 3) * 0.008;
      ctx.fillStyle = hexToRgba(palette.fogColor, alpha);
      ctx.fillRect(0, y, W, (18 + i * 3) * DPR);
    }
    ctx.restore();
  }

  function drawForegroundSilhouette() {
    ctx.save();
    const baseY = H * 1.015 + game.visual.sway * 3 * DPR;
    ctx.fillStyle = "rgba(0,0,0,0.46)";
    ctx.beginPath();
    ctx.ellipse(W * 0.09, baseY, W * 0.16, H * 0.13, -0.12, 0, TAU);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(W * 0.92, baseY + H * 0.015, W * 0.15, H * 0.12, 0.10, 0, TAU);
    ctx.fill();

    if (game.flashlight) {
      ctx.globalCompositeOperation = "screen";
      const beam = ctx.createRadialGradient(W * 0.62, H * 0.73, 0, W * 0.52, H * 0.42, Math.min(W, H) * 0.54);
      beam.addColorStop(0, "rgba(255,238,180,0.20)");
      beam.addColorStop(0.42, "rgba(185,210,255,0.09)");
      beam.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = beam;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(5,5,6,0.78)";
      ctx.fillRect(W * 0.56, H * 0.83 + game.visual.sway * 2 * DPR, W * 0.13, H * 0.035);
      ctx.fillStyle = "rgba(220,190,120,0.28)";
      ctx.fillRect(W * 0.67, H * 0.835 + game.visual.sway * 2 * DPR, W * 0.035, H * 0.020);
    }
    ctx.restore();
  }

  function drawPostProcess() {
    ctx.save();
    ctx.globalAlpha = 0.11;
    ctx.fillStyle = "#000";
    const step = Math.max(2, Math.floor(4 * DPR));
    for (let y = 0; y < H; y += step) {
      ctx.fillRect(0, y, W, 1);
    }

    const grainCount = Math.min(420, Math.floor((W * H) / 26000));
    for (let i = 0; i < grainCount; i++) {
      const n = Math.sin((i + 1) * 78.233 + game.time * 41.31) * 43758.5453;
      const f = n - Math.floor(n);
      const x = (f * W) | 0;
      const y = (((Math.sin(n) * 0.5 + 0.5) * H) | 0);
      const bright = i % 2 === 0;
      ctx.fillStyle = bright ? "rgba(255,255,255,0.075)" : "rgba(0,0,0,0.12)";
      ctx.fillRect(x, y, Math.max(1, DPR), Math.max(1, DPR));
    }

    const edge = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.20, W / 2, H / 2, Math.max(W, H) * 0.72);
    edge.addColorStop(0, "rgba(0,0,0,0)");
    edge.addColorStop(1, "rgba(0,0,0,0.32)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawCharacterSprite(id, screenX, feetY, size, dist, options = {}) {
    const profile = getCharacterProfile(id);
    if (!profile) return;
    const visual = profile.visual || {};
    const skin = visual.skin || "#b88962";
    const hair = visual.hair || "#15110e";
    const cloth = visual.cloth || "#2b2f35";
    const accent = visual.accent || "#67a7ff";
    const eye = visual.eye || "#201a15";
    const child = id === "child";
    const shadow = id === "qareen" || id === "mudawwin";
    const bride = id === "bride";
    const zarqa = id === "zarqa";
    const bellboy = id === "bellboy";
    const height = size * (child ? 1.85 : shadow ? 2.65 : 2.35);
    const width = size * (child ? 0.58 : bride ? 0.86 : 0.68);
    const top = feetY - height;
    const headRadius = height * (child ? 0.105 : 0.092);
    const headY = top + height * 0.22;
    const torsoTop = top + height * 0.34;
    const torsoBottom = feetY - height * 0.17;
    const alpha = options.alpha ?? clamp(1 - dist / 9, 0.18, 0.92);

    ctx.save();
    ctx.globalAlpha *= alpha;
    ctx.fillStyle = "rgba(0,0,0,0.44)";
    ctx.beginPath();
    ctx.ellipse(screenX, feetY + size * 0.05, width * 0.78, size * 0.16, 0, 0, TAU);
    ctx.fill();

    const bodyGrad = ctx.createLinearGradient(screenX, torsoTop, screenX, feetY);
    bodyGrad.addColorStop(0, shadeColor(cloth, shadow ? 0.42 : 1.08));
    bodyGrad.addColorStop(0.68, cloth);
    bodyGrad.addColorStop(1, shadeColor(cloth, 0.38));
    ctx.fillStyle = bodyGrad;

    ctx.beginPath();
    if (bride) {
      ctx.moveTo(screenX - width * 0.30, torsoTop);
      ctx.lineTo(screenX + width * 0.30, torsoTop);
      ctx.lineTo(screenX + width * 0.64, feetY);
      ctx.lineTo(screenX - width * 0.64, feetY);
    } else if (shadow) {
      ctx.moveTo(screenX - width * 0.26, torsoTop);
      ctx.lineTo(screenX + width * 0.26, torsoTop);
      ctx.lineTo(screenX + width * 0.48, feetY);
      ctx.lineTo(screenX - width * 0.48, feetY);
    } else {
      ctx.moveTo(screenX - width * 0.38, torsoTop);
      ctx.lineTo(screenX + width * 0.38, torsoTop);
      ctx.lineTo(screenX + width * 0.31, torsoBottom);
      ctx.lineTo(screenX + width * 0.18, feetY);
      ctx.lineTo(screenX - width * 0.18, feetY);
      ctx.lineTo(screenX - width * 0.31, torsoBottom);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = hexToRgba(accent, shadow ? 0.72 : 0.38);
    ctx.lineWidth = Math.max(1, 1.15 * DPR);
    ctx.beginPath();
    ctx.moveTo(screenX, torsoTop + height * 0.02);
    ctx.lineTo(screenX, torsoBottom);
    ctx.stroke();

    ctx.strokeStyle = shadow ? hexToRgba(accent, 0.82) : "rgba(0,0,0,0.48)";
    ctx.lineWidth = Math.max(2, width * 0.055);
    ctx.beginPath();
    ctx.moveTo(screenX - width * 0.32, torsoTop + height * 0.07);
    ctx.lineTo(screenX - width * 0.50, torsoBottom - height * 0.06);
    ctx.moveTo(screenX + width * 0.32, torsoTop + height * 0.07);
    ctx.lineTo(screenX + width * 0.50, torsoBottom - height * 0.06);
    ctx.stroke();

    if (!bride && !shadow) {
      ctx.strokeStyle = "rgba(0,0,0,0.48)";
      ctx.lineWidth = Math.max(2, width * 0.07);
      ctx.beginPath();
      ctx.moveTo(screenX - width * 0.12, torsoBottom);
      ctx.lineTo(screenX - width * 0.18, feetY);
      ctx.moveTo(screenX + width * 0.12, torsoBottom);
      ctx.lineTo(screenX + width * 0.18, feetY);
      ctx.stroke();
    }

    ctx.fillStyle = shadow ? shadeColor(skin, 0.32) : skin;
    ctx.beginPath();
    ctx.ellipse(screenX, headY, headRadius * 0.82, headRadius * 1.04, 0, 0, TAU);
    ctx.fill();

    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.ellipse(screenX, headY - headRadius * 0.48, headRadius * 0.92, headRadius * 0.48, 0, Math.PI, TAU);
    ctx.fill();
    if (bride || zarqa) {
      ctx.globalAlpha *= 0.82;
      ctx.fillStyle = bride ? "rgba(235,226,208,0.42)" : hexToRgba(accent, 0.28);
      ctx.beginPath();
      ctx.ellipse(screenX, headY + headRadius * 0.1, headRadius * 1.18, headRadius * 1.55, 0, 0, TAU);
      ctx.fill();
      ctx.globalAlpha /= 0.82;
    }

    ctx.fillStyle = eye;
    const eyeY = headY - headRadius * 0.08;
    ctx.beginPath();
    ctx.ellipse(screenX - headRadius * 0.28, eyeY, Math.max(1, headRadius * 0.09), Math.max(1, headRadius * 0.045), 0, 0, TAU);
    ctx.ellipse(screenX + headRadius * 0.28, eyeY, Math.max(1, headRadius * 0.09), Math.max(1, headRadius * 0.045), 0, 0, TAU);
    ctx.fill();

    if (bellboy) {
      ctx.strokeStyle = hexToRgba("#f2d990", 0.88);
      ctx.lineWidth = Math.max(1, 1.4 * DPR);
      ctx.strokeRect(screenX - headRadius * 0.56, headY - headRadius * 0.50, headRadius * 1.12, headRadius * 0.96);
    }

    if (zarqa || shadow || bellboy) {
      ctx.shadowColor = accent;
      ctx.shadowBlur = Math.max(8, size * 0.20);
      ctx.strokeStyle = hexToRgba(accent, shadow ? 0.78 : 0.55);
      ctx.lineWidth = Math.max(1, 1.1 * DPR);
      ctx.beginPath();
      ctx.ellipse(screenX, headY, headRadius * 1.10, headRadius * 1.26, 0, 0, TAU);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawEvents3D() {
    if (!game.chapter) return;
    for (const ev of game.chapter.events) {
      if (game.triggered.has(ev.id) && ev.type !== "chapter") continue;
      const dx = ev.x - game.player.x;
      const dy = ev.y - game.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 7.5) continue;

      const angleTo = normalizeAngle(Math.atan2(dy, dx) - game.player.angle);
      if (Math.abs(angleTo) > FOV * 0.65) continue;

      const screenX = W / 2 + (angleTo / (FOV / 2)) * W / 2;
      const size = ev.character
        ? clamp(H / (dist * 3.3), 28 * DPR, 150 * DPR)
        : clamp(H / (dist * 4), 18 * DPR, 90 * DPR);
      const screenY = ev.character ? H * 0.61 + H / (dist * 10) : H / 2 + H / (dist * 14);

      ctx.save();
      ctx.globalAlpha = clamp(1 - dist / 8, 0.15, 0.9);
      if (ev.character) {
        drawCharacterSprite(ev.character, screenX, screenY, size, dist);
        ctx.fillStyle = ev.type === "choice" ? "rgba(189,154,79,0.95)" : "rgba(103,167,255,0.88)";
        ctx.beginPath();
        ctx.arc(screenX, screenY - size * 2.58, size * 0.09, 0, TAU);
        ctx.fill();
      } else {
        ctx.fillStyle = ev.type === "choice" ? "rgba(189,154,79,0.95)" : "rgba(103,167,255,0.85)";
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 0.22, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.stroke();
      }
      ctx.font = `${Math.max(12, 15 * DPR)}px Georgia`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#fff4d9";
      ctx.fillText(ev.label, screenX, ev.character ? screenY - size * 2.74 : screenY - size * 0.35);
      ctx.restore();
    }
  }

  function drawShoeLure() {
    if (!game.shoeLure) return;
    const dx = game.shoeLure.x - game.player.x;
    const dy = game.shoeLure.y - game.player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 8) return;

    const angleTo = normalizeAngle(Math.atan2(dy, dx) - game.player.angle);
    if (Math.abs(angleTo) > FOV * 0.7) return;

    const screenX = W / 2 + (angleTo / (FOV / 2)) * W / 2;
    const size = clamp(H / (dist * 5), 14 * DPR, 64 * DPR);
    const screenY = H / 2 + H / (dist * 9);

    ctx.save();
    ctx.globalAlpha = clamp(game.shoeLure.timer / 6.5, 0.15, 0.85);
    ctx.fillStyle = "rgba(220,190,130,0.88)";
    ctx.beginPath();
    ctx.ellipse(screenX, screenY, size * 0.36, size * 0.14, -0.25, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,240,190,0.5)";
    ctx.stroke();
    ctx.restore();
  }

  function drawBellboy() {
    const heat = game.bellboy.heat;
    if (heat <= 0.2 && game.chapter?.id !== "welcome") return;

    const dx = game.bellboy.x - game.player.x;
    const dy = game.bellboy.y - game.player.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 10) return;

    const angleTo = normalizeAngle(Math.atan2(dy, dx) - game.player.angle);
    if (Math.abs(angleTo) > FOV * 0.7) return;

    const screenX = W / 2 + (angleTo / (FOV / 2)) * W / 2;
    const size = clamp(H / (dist * 2.2), 45 * DPR, 240 * DPR);
    const y = H / 2 + size * 0.25;

    ctx.save();
    ctx.globalAlpha = clamp(1 - dist / 11, 0.15, 0.85);
    ctx.fillStyle = game.bellboy.state === "hunting" ? "#160202" : "#080606";
    ctx.fillRect(screenX - size * 0.18, y - size, size * 0.36, size);
    ctx.fillStyle = game.bellboy.state === "collecting" ? "#6d5b2f" : "#806226";
    ctx.beginPath();
    ctx.ellipse(screenX, y - size * 0.82, size * 0.16, size * 0.20, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#d8c68b";
    ctx.stroke();

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(screenX - size * 0.34, y - size * 0.56, size * 0.68, size * 0.36);
    ctx.fillStyle = "#fff0c0";
    ctx.font = `${Math.max(12, 14 * DPR)}px Georgia`;
    ctx.textAlign = "center";
    const label = game.bellboy.state === "hunting" ? "The Bellboy: hunting" : "The Bellboy";
    ctx.fillText(label, screenX, y - size * 1.08);
    ctx.restore();
  }

  function drawVignette() {
    const grd = ctx.createRadialGradient(W/2, H/2, Math.min(W,H)*0.08, W/2, H/2, Math.max(W,H)*0.65);
    const darkness = game.flashlight ? 0.55 : 0.78;
    grd.addColorStop(0, "rgba(0,0,0,0)");
    grd.addColorStop(0.55, "rgba(0,0,0,0.20)");
    grd.addColorStop(1, `rgba(0,0,0,${darkness})`);
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    if (game.flashlight) {
      ctx.save();
      const cone = ctx.createLinearGradient(W / 2, H / 2, W / 2, H * 0.02);
      cone.addColorStop(0, "rgba(255,242,190,0.18)");
      cone.addColorStop(1, "rgba(103,167,255,0.02)");
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = cone;
      ctx.beginPath();
      ctx.moveTo(W * 0.5, H * 0.55);
      ctx.lineTo(W * 0.30, 0);
      ctx.lineTo(W * 0.70, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function drawFearOverlay() {
    const r = game.record;
    const tension = clamp((r.debt + r.qareen + r.violence + game.bellboy.heat) / 16, 0, 1);
    if (tension <= 0.02) return;

    ctx.save();
    ctx.globalAlpha = tension * (0.10 + Math.sin(game.time * 6) * 0.03);
    ctx.fillStyle = r.qareen > 4 ? "#190000" : "#000014";
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawMiniMap() {
    const scale = 12 * DPR;
    const pad = 14 * DPR;
    const mw = game.map[0].length * scale;
    const mh = game.map.length * scale;
    const x0 = W - mw - pad;
    const y0 = H - mh - pad;

    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(x0 - 8, y0 - 8, mw + 16, mh + 16);
    for (let y = 0; y < game.map.length; y++) {
      for (let x = 0; x < game.map[y].length; x++) {
        ctx.fillStyle = game.map[y][x] ? "#79603a" : "#161616";
        ctx.fillRect(x0 + x * scale, y0 + y * scale, scale - 1, scale - 1);
      }
    }
    ctx.fillStyle = "#67a7ff";
    ctx.beginPath();
    ctx.arc(x0 + game.player.x * scale, y0 + game.player.y * scale, 3 * DPR, 0, TAU);
    ctx.fill();
    ctx.fillStyle = game.bellboy.state === "hunting" ? "#ff4b4b" : "#bd9a4f";
    ctx.beginPath();
    ctx.arc(x0 + game.bellboy.x * scale, y0 + game.bellboy.y * scale, 3 * DPR, 0, TAU);
    ctx.fill();
    if (game.bellboy.target) {
      ctx.strokeStyle = "rgba(255,210,120,0.75)";
      ctx.beginPath();
      ctx.moveTo(x0 + game.bellboy.x * scale, y0 + game.bellboy.y * scale);
      ctx.lineTo(x0 + game.bellboy.target.x * scale, y0 + game.bellboy.target.y * scale);
      ctx.stroke();
    }
    ctx.strokeStyle = "#67a7ff";
    ctx.beginPath();
    ctx.moveTo(x0 + game.player.x * scale, y0 + game.player.y * scale);
    ctx.lineTo(x0 + (game.player.x + Math.cos(game.player.angle) * 0.7) * scale, y0 + (game.player.y + Math.sin(game.player.angle) * 0.7) * scale);
    ctx.stroke();
    ctx.restore();
  }

  function update(dt) {
    if (!game.running || game.paused) return;

    const r = game.record;
    const shoeNoise = game.barefoot ? 0.7 : 1.0;
    const moveSpeed = MOVE_SPEED * (game.barefoot ? 0.78 : 1.0) * (r.debt >= 5 ? 0.90 : 1);

    let forward = 0, strafe = 0, turn = 0;

    if (game.keys["KeyW"] || game.keys["ArrowUp"] || game.touch.forward) forward += 1;
    if (game.keys["KeyS"] || game.keys["ArrowDown"] || game.touch.backward) forward -= 1;
    if (game.keys["KeyA"] || game.touch.strafeLeft) strafe -= 1;
    if (game.keys["KeyD"] || game.touch.strafeRight) strafe += 1;
    if (game.keys["KeyQ"] || game.keys["ArrowLeft"] || game.touch.turnLeft) turn -= 1;
    if (game.keys["KeyE"] || game.keys["ArrowRight"] || game.touch.turnRight) turn += 1;

    const moveInput = clamp(Math.hypot(forward, strafe), 0, 1);
    const turnSpeed = TURN_SPEED * (moveInput > 0 ? 0.78 : 1) * (game.flashlight ? 0.92 : 1);
    game.player.angle = normalizeAbsoluteAngle(game.player.angle + turn * turnSpeed * dt);
    game.visual.motion += (moveInput - game.visual.motion) * Math.min(1, dt * 5.5);
    game.visual.step += dt * (game.visual.motion > 0.05 ? (game.barefoot ? 2.8 : 3.9) : 0.72);
    game.visual.sway = Math.sin(game.visual.step * 2.0) * game.visual.motion;
    game.visual.breath = Math.sin(game.time * (game.barefoot ? 1.3 : 1.05)) * (0.35 + game.bellboy.suspicion * 0.035);

    if (forward || strafe) {
      const ca = Math.cos(game.player.angle);
      const sa = Math.sin(game.player.angle);
      const dx = (ca * forward + Math.cos(game.player.angle + Math.PI/2) * strafe * STRAFE_WEIGHT) * moveSpeed * dt;
      const dy = (sa * forward + Math.sin(game.player.angle + Math.PI/2) * strafe * STRAFE_WEIGHT) * moveSpeed * dt;
      move(dx, dy);
      rememberPlayerCell();
      registerNoise(game.player.x, game.player.y, game.barefoot ? 0.13 : 0.52, "footstep");

      game.hotelPulse += dt * (forward > 0 ? 1.2 : 0.8) * shoeNoise;
      if (game.hotelPulse > 8) {
        game.hotelPulse = 0;
        if (!game.barefoot && Math.random() < 0.25 + game.bellboy.heat * 0.025) {
          showMessage("Somewhere behind you: Knock. Knock. Knock.", 1800);
          AudioHorror.knock();
        }
      }
    }

    game.bellboy.knockTimer -= dt * (0.65 + game.bellboy.heat * 0.10);
    if (game.bellboy.knockTimer <= 0) {
      game.bellboy.knockTimer = 9 + Math.random() * 8 - Math.min(5, game.bellboy.heat);
      AudioHorror.knock();
      const lines = [
        "Housekeeping.",
        "Sir, your room is ready.",
        "Please return to your recorded path.",
        "Outstanding balance detected."
      ];
      showMessage(lines[Math.floor(Math.random() * lines.length)], 1900);
    }
    updateBellboy(dt);

    const tension = clamp((r.debt + r.qareen + r.violence + game.bellboy.heat) / 16, 0, 1);
    AudioHorror.setTension(tension);
  }

  function interact() {
    if (game.paused || !game.chapter) return;

    let closest = null;
    let closestDist = Infinity;
    for (const ev of game.chapter.events) {
      if (game.triggered.has(ev.id) && ev.type !== "chapter") continue;
      const dist = Math.hypot(ev.x - game.player.x, ev.y - game.player.y);
      if (dist < closestDist) {
        closest = ev;
        closestDist = dist;
      }
    }

    if (!closest || closestDist > 1.35) {
      showMessage("Nothing answers here.", 900);
      return;
    }

    if (closest.type === "choice") {
      game.triggered.add(closest.id);
      showChoice(closest.choice);
    } else if (closest.type === "cutscene") {
      game.triggered.add(closest.id);
      if (closest.nextChapter) {
        game.pendingNextChapter = closest.nextChapter;
        startCutscene(closest.cutscene, undefined, closest.character);
      } else {
        startCutscene(closest.cutscene, undefined, closest.character);
      }
    } else if (closest.type === "chapter") {
      loadChapter(closest.nextChapter);
      saveGame(true);
    }
  }

  function toggleFlashlight() {
    if (!game.running) return;
    game.flashlight = !game.flashlight;
    updateStateLine();
    showMessage(game.flashlight ? "Flashlight on. The cameras see the beam." : "Flashlight off. The dark comes closer.", 1200);
    if (game.flashlight && Math.random() < 0.25) {
      game.record.vision += 1;
      updateMeters();
    }
    registerNoise(game.player.x, game.player.y, game.flashlight ? 0.25 : 0.05, "flashlight");
    saveGame(true);
  }

  function getShoeLandingPoint() {
    let distance = 3.4;
    while (distance > 0.8) {
      const x = game.player.x + Math.cos(game.player.angle) * distance;
      const y = game.player.y + Math.sin(game.player.angle) * distance;
      if (!isWall(x, y)) return { x, y };
      distance -= 0.35;
    }
    return { x: game.player.x, y: game.player.y };
  }

  function throwShoe() {
    if (!game.running) return;
    if (game.hasOriginalShoe <= 0) {
      showMessage("You have no original shoes left to throw.", 1300);
      return;
    }
    game.hasOriginalShoe = Math.max(0, game.hasOriginalShoe - 1);
    const landing = getShoeLandingPoint();
    game.shoeLure = { x: landing.x, y: landing.y, timer: 6.5 };
    registerNoise(landing.x, landing.y, 1.2, "shoe");
    game.bellboy.stunTimer = Math.max(game.bellboy.stunTimer, 0.45);
    const defensive = game.record.violence <= 3;
    if (defensive) {
      applyEffects({ survival: 1, bellboyHeat: -1 });
      showMessage("You throw a shoe. Something follows the sound instead of you.", 1800);
    } else {
      applyEffects({ violence: 1, qareen: 1 });
      showMessage("You throw a shoe. A shadow throws it back.", 1800);
    }
    syncInventoryFromRecord();
    updateStateLine();
    saveGame(true);
  }

  function toggleBarefoot() {
    if (!game.running) return;
    game.barefoot = !game.barefoot;
    if (game.barefoot) {
      showMessage("Barefoot. Quieter, but the floor can feel your fear.", 1700);
      applyEffects({ vision: 1 });
    } else {
      showMessage("Shoes on. Faster, louder, easier to claim.", 1500);
    }
    updateStateLine();
    saveGame(true);
  }

  function mapPulse() {
    if (!game.running) return;
    if (game.record.debt + game.record.vision > 5) {
      showMessage("The map shows two red dots. Both are labeled YOU.", 1800);
      applyEffects({ vision: 1 });
    } else {
      showMessage("You picture the layout in your mind. For now, it stays still.", 1200);
    }
    updateMeters();
    saveGame(true);
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - game.last) / 1000);
    game.last = now;
    game.time += dt;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }

  function startGame() {
    ui.startScreen.classList.add("hidden");
    AudioHorror.start();
    game.running = true;
    game.paused = false;
    loadChapter(0);
    syncInventoryFromRecord();
    updateMeters();
    saveGame(true);
  }

  ui.startButton.addEventListener("click", startGame);
  ui.loadFromStartButton.addEventListener("click", loadGame);
  ui.saveButton.addEventListener("click", () => {
    if (!game.running) {
      showMessage("No active check-in to save.", 1200);
      return;
    }
    saveGame();
  });
  ui.loadButton.addEventListener("click", loadGame);
  ui.inventoryButton.addEventListener("click", () => toggleInventory());
  ui.chapterButton.addEventListener("click", openChapterSelect);
  ui.closeChapterSelect.addEventListener("click", closeChapterSelect);
  document.querySelectorAll(".wheel-item").forEach(btn => {
    btn.addEventListener("click", () => useInventoryItem(btn.dataset.item));
  });

  window.addEventListener("keydown", (e) => {
    game.keys[e.code] = true;

    if (e.code === "Escape") {
      closeInventory();
      closeChapterSelect();
    } else if (e.code === "Tab" || e.code === "KeyI") {
      e.preventDefault();
      toggleInventory();
    } else if (e.code === "KeyC") {
      openChapterSelect();
    } else if (e.code === "F5") {
      e.preventDefault();
      if (game.running) saveGame();
    } else if (e.code === "F9") {
      e.preventDefault();
      loadGame();
    } else if (e.code === "Space") {
      e.preventDefault();
      interact();
    } else if (e.code === "KeyF") {
      toggleFlashlight();
    } else if (e.code === "KeyR") {
      throwShoe();
    } else if (e.code === "KeyB") {
      toggleBarefoot();
    } else if (e.code === "KeyM") {
      mapPulse();
    } else if (e.code === "KeyD") {
      game.dev = !game.dev;
      ui.devMeters.classList.toggle("hidden", !game.dev);
      updateMeters();
    }
  });

  window.addEventListener("keyup", (e) => {
    game.keys[e.code] = false;
  });

  // Mobile / tablet controls.
  document.querySelectorAll("#mobileControls button").forEach(btn => {
    const action = btn.dataset.action;
    const start = (ev) => {
      ev.preventDefault();
      if (["interact", "flashlight", "shoe", "barefoot", "inventory"].includes(action)) {
        if (action === "interact") interact();
        if (action === "flashlight") toggleFlashlight();
        if (action === "shoe") throwShoe();
        if (action === "barefoot") toggleBarefoot();
        if (action === "inventory") toggleInventory();
      } else {
        game.touch[action] = true;
      }
    };
    const end = (ev) => {
      ev.preventDefault();
      game.touch[action] = false;
    };
    btn.addEventListener("touchstart", start, { passive: false });
    btn.addEventListener("touchend", end, { passive: false });
    btn.addEventListener("touchcancel", end, { passive: false });
    btn.addEventListener("mousedown", start);
    btn.addEventListener("mouseup", end);
    btn.addEventListener("mouseleave", end);
  });

  // Basic pointer drag to turn on touch screens.
  let dragging = false;
  let lastX = 0;
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
  });
  window.addEventListener("pointerup", () => dragging = false);
  window.addEventListener("pointermove", (e) => {
    if (!dragging || game.paused) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    game.player.angle = normalizeAbsoluteAngle(game.player.angle + dx * 0.004);
  });

  function normalizeAngle(a) {
    while (a < -Math.PI) a += TAU;
    while (a > Math.PI) a -= TAU;
    return a;
  }

  function normalizeAbsoluteAngle(a) {
    while (a < 0) a += TAU;
    while (a >= TAU) a -= TAU;
    return a;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function shadeColor(hex, brightness) {
    const rgb = hex.replace("#", "");
    const r = parseInt(rgb.slice(0, 2), 16);
    const g = parseInt(rgb.slice(2, 4), 16);
    const b = parseInt(rgb.slice(4, 6), 16);
    return `rgb(${Math.floor(r * brightness)},${Math.floor(g * brightness)},${Math.floor(b * brightness)})`;
  }

  function hexToRgba(hex, alpha) {
    const rgb = hex.replace("#", "");
    const r = parseInt(rgb.slice(0, 2), 16);
    const g = parseInt(rgb.slice(2, 4), 16);
    const b = parseInt(rgb.slice(4, 6), 16);
    return `rgba(${r},${g},${b},${clamp(alpha, 0, 1)})`;
  }

  // Initial render before game starts.
  game.chapter = STORY_DATA.chapters[0];
  game.map = game.chapter.map.map(row => row.split("").map(Number));
  requestAnimationFrame(loop);

})();
