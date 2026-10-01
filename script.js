/**
 * OPERATION: MAKE HIM SING 🎤
 * Interactive Tactical Script & Browser Experience
 * Pure Vanilla JavaScript — Zero External Dependencies — 100% Local & Responsive
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS ENGINE (Web Audio API) ---
  class SoundEngine {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.ctx = new AudioContext();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.enabled = !this.enabled;
      return this.enabled;
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    }

    playStep() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    }

    playRejectionBuzzer() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc2.frequency.setValueAtTime(147, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.28);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 0.28);
      osc2.stop(this.ctx.currentTime + 0.28);
    }

    playVictoryFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C arpeggio
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + index * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    }

    playBeepHigh() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    }
  }

  const sfx = new SoundEngine();

  // --- CANVAS CONFETTI ENGINE (Offline & Fast) ---
  class ConfettiEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animating = false;
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    fire(count = 120) {
      const colors = ['#00ff88', '#00e5ff', '#ffb703', '#ff2a5f', '#ffffff', '#a855f7'];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: window.innerWidth * (0.3 + Math.random() * 0.4),
          y: window.innerHeight * 0.65,
          vx: (Math.random() - 0.5) * 18,
          vy: -Math.random() * 16 - 8,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          opacity: 1,
          decay: Math.random() * 0.008 + 0.004,
          shape: Math.random() > 0.3 ? 'rect' : 'circle'
        });
      }

      if (!this.animating) {
        this.animating = true;
        this.animate();
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity -= p.decay;

        if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        requestAnimationFrame(() => this.animate());
      } else {
        this.animating = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  // --- EXCUSES LIST (Prompt requirements + funny extras) ---
  const EXCUSES_RESPONSES = [
    "Counterargument rejected.",
    "Interesting. Unfortunately, the committee has heard this one before.",
    "Fine. You may be terrible. We simply require evidence.",
    "You do not need to be good. You need to be audible.",
    "The target is attempting negotiation. Fascinating.",
    "Objection logged, timestamped, archived, and decisively overruled.",
    "Our acoustic satellites have designated your voice as ‘certified friendship grade.’",
    "Under Section 4 of The Bro Code, vocal hesitation is punishable by infinite memes.",
    "Counter-offer: You sing badly, and we applaud violently like you're an international popstar.",
    "If singing was restricted to skilled individuals, showers around the world would fall silent.",
    "You cannot filibuster this mission. The stage is already set.",
    "Error 404: Valid excuse not found in classified database.",
    "Your throat is officially requisitioned for 20 seconds. Resistance is futile."
  ];

  // --- STALL TIPS FOR THE 1-MINUTE TIMER ---
  const STALL_TIPS = [
    "“Tip #1: Autotune is merely a mindset. Your raw voice is acoustic gold.”",
    "“Tip #2: Shake out your arms. You are about to become a vocal legend.”",
    "“Tip #3: Even if you sound like a dying squeak toy, we will cheer relentlessly.”",
    "“Tip #4: Take a sip of water. Channel your inner rock star.”",
    "“Tip #5: Remember: exactly 20 seconds and your civic duty is completed.”"
  ];

  // --- STATE MANAGEMENT ---
  let currentStage = 0;
  const TOTAL_STAGES = 7; // 0 to 7
  let excusesAttempted = 0;
  let minuteTimerInterval = null;
  let minuteSecondsLeft = 60;
  let courageTimerInterval = null;
  let courageSecondsLeft = 20;
  let floatingNotesInterval = null;

  // --- DOM ELEMENTS ---
  const stagePanels = document.querySelectorAll('.stage-panel');
  const progressFillBar = document.getElementById('progress-fill-bar');
  const progressPercentage = document.getElementById('progress-percentage');
  const progressStageName = document.getElementById('progress-stage-name');
  const phasePips = document.querySelectorAll('.phase-pips .pip');
  const metaStatusText = document.getElementById('meta-status-text');
  const excuseCounterBadge = document.getElementById('excuse-counter-badge');
  const mainStamp = document.getElementById('main-stamp');

  // Modals & Canvas
  const excuseModal = document.getElementById('excuse-modal');
  const excuseResponseText = document.getElementById('excuse-response-text');
  const modalExcuseCount = document.getElementById('modal-excuse-count');
  const minuteModal = document.getElementById('minute-modal');
  const minuteCountdown = document.getElementById('minute-countdown');
  const breathingText = document.getElementById('breathing-text');
  const stallTip = document.getElementById('stall-tip');
  const songsModal = document.getElementById('songs-modal');
  const toastHub = document.getElementById('toast-hub');
  const confettiCanvas = document.getElementById('confetti-canvas');

  const confetti = new ConfettiEngine(confettiCanvas);

  // --- STAGE DATA ---
  const STAGE_CONFIG = [
    { title: "MISSION PHASE: BRIEFING", status: "UNCOMPLIANT", pct: 0 },
    { title: "PHASE 01: SELECTION", status: "TARGET IDENTIFIED", pct: 16 },
    { title: "PHASE 02: SCIENTIFIC FACT", status: "DISPELLING MYTHS", pct: 33 },
    { title: "PHASE 03: CONCESSIONS", status: "TERMS NEGOTIATED", pct: 50 },
    { title: "PHASE 04: SONG FREEDOM", status: "DIGNITY SECURED", pct: 67 },
    { title: "PHASE 05: SUPREME PROTOCOL", status: "CORNERED", pct: 83 },
    { title: "PHASE 06: FINAL TASK", status: "CRITICAL JUNCTURE", pct: 95 },
    { title: "PHASE 07: DEPLOYMENT VICTORY", status: "VOCALLY DEPLOYED", pct: 100 }
  ];

  // --- UTILITY: SHOW TOAST ---
  function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : ''}`;
    toast.innerHTML = `<span>${isError ? '⚠️' : '⚡'}</span> <span>${message}</span>`;
    toastHub.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // --- UPDATE UI FOR STAGE ---
  function goToStage(stageIndex) {
    if (stageIndex < 0 || stageIndex > TOTAL_STAGES) return;
    currentStage = stageIndex;
    sfx.playStep();

    // Toggle Panels
    stagePanels.forEach(panel => {
      const pStage = parseInt(panel.getAttribute('data-stage'), 10);
      if (pStage === currentStage) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // Update Progress
    const config = STAGE_CONFIG[currentStage];
    progressFillBar.style.width = `${config.pct}%`;
    progressPercentage.textContent = `${config.pct}%`;
    progressStageName.textContent = config.title;
    metaStatusText.textContent = config.status;

    // Update Pips
    phasePips.forEach((pip, idx) => {
      if (idx <= currentStage) {
        pip.classList.add('active');
      } else {
        pip.classList.remove('active');
      }
    });

    // Handle Stamp Changes
    if (currentStage === 7) {
      mainStamp.textContent = "SUCCESSFUL";
      mainStamp.className = "stamp stamp-success";
      triggerVictoryCelebration();
    } else if (currentStage === 6) {
      mainStamp.textContent = "FINAL ORDER";
      mainStamp.className = "stamp stamp-classified";
      stopFloatingNotes();
    } else {
      mainStamp.textContent = "CLASSIFIED";
      mainStamp.className = "stamp stamp-classified";
      stopFloatingNotes();
    }

    // Scroll card into view smoothly
    document.getElementById('mission-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // --- EXCUSE REJECTION SYSTEM ---
  let lastExcuseIndex = -1;
  function triggerExcuseModal() {
    sfx.playRejectionBuzzer();
    excusesAttempted++;
    excuseCounterBadge.textContent = `${excusesAttempted} (DENIED)`;
    modalExcuseCount.textContent = `${excusesAttempted}`;

    // Pick random excuse without immediate repetition
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * EXCUSES_RESPONSES.length);
    } while (randIdx === lastExcuseIndex && EXCUSES_RESPONSES.length > 1);
    lastExcuseIndex = randIdx;

    excuseResponseText.textContent = `“${EXCUSES_RESPONSES[randIdx]}”`;
    excuseModal.classList.add('open');
    excuseModal.setAttribute('aria-hidden', 'false');
  }

  function closeExcuseModal() {
    sfx.playClick();
    excuseModal.classList.remove('open');
    excuseModal.setAttribute('aria-hidden', 'true');
  }

  // --- TACTICAL 1-MINUTE STALL SYSTEM ---
  function openMinuteModal() {
    sfx.playClick();
    minuteModal.classList.add('open');
    minuteModal.setAttribute('aria-hidden', 'false');
    startMinuteTimer();
  }

  function closeMinuteModal() {
    sfx.playClick();
    minuteModal.classList.remove('open');
    minuteModal.setAttribute('aria-hidden', 'true');
  }

  function startMinuteTimer() {
    clearInterval(minuteTimerInterval);
    minuteSecondsLeft = 60;
    updateMinuteDisplay();

    let tipIdx = 0;
    stallTip.textContent = STALL_TIPS[0];

    minuteTimerInterval = setInterval(() => {
      minuteSecondsLeft--;
      updateMinuteDisplay();

      // Cycle tips every 12 seconds
      if (minuteSecondsLeft % 12 === 0) {
        tipIdx = (tipIdx + 1) % STALL_TIPS.length;
        stallTip.textContent = STALL_TIPS[tipIdx];
      }

      // Breathing text cycle
      if (minuteSecondsLeft % 6 >= 3) {
        breathingText.textContent = "Exhale Self-Doubt...";
      } else {
        breathingText.textContent = "Inhale Courage...";
      }

      if (minuteSecondsLeft <= 0) {
        clearInterval(minuteTimerInterval);
        closeMinuteModal();
        showToast("Grace period expired! Time to sing! 🎤");
        goToStage(7); // push them right to victory!
      }
    }, 1000);
  }

  function updateMinuteDisplay() {
    const mins = Math.floor(minuteSecondsLeft / 60);
    const secs = minuteSecondsLeft % 60;
    minuteCountdown.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // --- COURAGE 20-SECOND LIVE VOCAL TIMER ---
  const courageClock = document.getElementById('courage-clock');
  const btnStartCourageTimer = document.getElementById('btn-start-courage-timer');
  const btnResetCourageTimer = document.getElementById('btn-reset-courage-timer');
  const courageMsg = document.getElementById('courage-msg');

  function startCourageTimer() {
    sfx.playBeepHigh();
    btnStartCourageTimer.style.display = 'none';
    btnResetCourageTimer.style.display = 'inline-block';
    courageMsg.textContent = '🎶 Singing in progress! We are cheering for you!';
    courageMsg.style.color = 'var(--color-green)';

    clearInterval(courageTimerInterval);
    courageSecondsLeft = 20;
    updateCourageDisplay();

    courageTimerInterval = setInterval(() => {
      courageSecondsLeft--;
      updateCourageDisplay();

      if (courageSecondsLeft <= 5 && courageSecondsLeft > 0) {
        sfx.playBeepHigh();
      }

      if (courageSecondsLeft <= 0) {
        clearInterval(courageTimerInterval);
        sfx.playVictoryFanfare();
        confetti.fire(150);
        courageMsg.textContent = '🏆 20 SECONDS COMPLETE! YOU OFFICIALLY DID IT!';
        courageMsg.style.color = 'var(--color-amber)';
        showToast('Mission Accomplished! You sang like a champ! 🌟');
      }
    }, 1000);
  }

  function resetCourageTimer() {
    sfx.playClick();
    clearInterval(courageTimerInterval);
    courageSecondsLeft = 20;
    updateCourageDisplay();
    btnStartCourageTimer.style.display = 'inline-block';
    btnResetCourageTimer.style.display = 'none';
    courageMsg.textContent = 'Hit start whenever you begin singing!';
    courageMsg.style.color = 'var(--color-text-dim)';
  }

  function updateCourageDisplay() {
    courageClock.textContent = `00:${courageSecondsLeft.toString().padStart(2, '0')}`;
  }

  // --- VICTORY CELEBRATION (Stage 7) ---
  function triggerVictoryCelebration() {
    sfx.playVictoryFanfare();
    confetti.fire(180);

    // Secondary burst of confetti
    setTimeout(() => {
      confetti.fire(120);
    }, 900);

    startFloatingNotes();
    resetCourageTimer();
    showToast("OPERATION SUCCESSFUL: Subject Vocally Deployed!");
  }

  function startFloatingNotes() {
    stopFloatingNotes();
    const symbols = ['♪', '♫', '♬', '🎙️', '⭐', '✨', '🎸', '🎤'];
    floatingNotesInterval = setInterval(() => {
      const note = document.createElement('div');
      note.className = 'floating-note';
      note.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      note.style.left = `${Math.random() * 90 + 5}vw`;
      note.style.bottom = '10px';
      note.style.fontSize = `${Math.random() * 1.5 + 1.2}rem`;
      document.body.appendChild(note);

      setTimeout(() => {
        note.remove();
      }, 4000);
    }, 450);
  }

  function stopFloatingNotes() {
    if (floatingNotesInterval) {
      clearInterval(floatingNotesInterval);
      floatingNotesInterval = null;
    }
    document.querySelectorAll('.floating-note').forEach(n => n.remove());
  }

  // --- EASY SONGS CHEAT SHEET MODAL ---
  function openSongsModal() {
    sfx.playClick();
    songsModal.classList.add('open');
    songsModal.setAttribute('aria-hidden', 'false');
  }

  function closeSongsModal() {
    sfx.playClick();
    songsModal.classList.remove('open');
    songsModal.setAttribute('aria-hidden', 'true');
  }

  // --- COPY DEBRIEF FOR CHAT ---
  function copyDebriefToClipboard() {
    sfx.playClick();
    const text = 
`🎤 **OPERATION: MAKE HIM SING — OFFICIAL MISSION DEBRIEF** 🎤
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STATUS: ✅ OPERATION SUCCESSFUL
TARGET: VOCALLY DEPLOYED
REASON: "I am not good at singing" is legally invalid.
PROTOCOL: 20 seconds. Zero judgement. Maximum entertainment.
DECREE: You did it! History honors your vocal bravery. 🫡🎶
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Mission debrief copied to clipboard! Paste it into your chat! 📋");
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast("Debrief copied to clipboard! 📋");
    } catch (e) {
      showToast("Unable to auto-copy. Please share the site link!", true);
    }
    ta.remove();
  }

  // --- EVENT LISTENERS INITIALIZATION ---
  function initEvents() {
    // Audio Toggle
    const sfxToggle = document.getElementById('sfx-toggle');
    const sfxIcon = sfxToggle.querySelector('.sfx-icon');
    const sfxText = sfxToggle.querySelector('.sfx-text');

    sfxToggle.addEventListener('click', () => {
      const isEnabled = sfx.toggle();
      sfxIcon.textContent = isEnabled ? '🔊' : '🔇';
      sfxText.textContent = isEnabled ? 'AUDIO: ON' : 'AUDIO: OFF';
      showToast(isEnabled ? 'Sound effects enabled' : 'Sound effects muted');
      if (isEnabled) sfx.playClick();
    });

    // Easy Songs Nav Button
    document.getElementById('emergency-songs-btn').addEventListener('click', openSongsModal);
    document.getElementById('btn-close-songs').addEventListener('click', closeSongsModal);
    document.getElementById('btn-pick-song-done').addEventListener('click', closeSongsModal);

    // Landing Button
    document.getElementById('btn-start-operation').addEventListener('click', () => {
      goToStage(1);
    });

    // Generic "Next Stage" Buttons
    document.querySelectorAll('.btn-next-stage').forEach(btn => {
      btn.addEventListener('click', () => {
        goToStage(currentStage + 1);
      });
    });

    // Excuse Buttons everywhere
    document.querySelectorAll('.btn-excuse').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        triggerExcuseModal();
      });
    });

    // Modal Excuse Actions
    document.getElementById('btn-close-excuse').addEventListener('click', closeExcuseModal);
    document.getElementById('btn-another-excuse').addEventListener('click', triggerExcuseModal);
    document.getElementById('btn-accept-fate').addEventListener('click', () => {
      closeExcuseModal();
      goToStage(currentStage + 1 <= TOTAL_STAGES ? currentStage + 1 : TOTAL_STAGES);
    });

    // Phase 6 Final Buttons
    document.getElementById('btn-will-sing').addEventListener('click', () => {
      goToStage(7);
    });

    document.getElementById('btn-need-minute').addEventListener('click', () => {
      openMinuteModal();
    });

    // Minute Stall Modal Buttons
    document.getElementById('btn-close-minute').addEventListener('click', closeMinuteModal);
    document.getElementById('btn-abort-minute').addEventListener('click', closeMinuteModal);
    document.getElementById('btn-ready-early').addEventListener('click', () => {
      closeMinuteModal();
      goToStage(7);
    });

    // Courage 20s Live Timer
    btnStartCourageTimer.addEventListener('click', startCourageTimer);
    btnResetCourageTimer.addEventListener('click', resetCourageTimer);

    // Victory Screen Buttons
    document.getElementById('btn-blast-confetti').addEventListener('click', () => {
      sfx.playVictoryFanfare();
      confetti.fire(160);
    });

    document.getElementById('btn-replay-mission').addEventListener('click', () => {
      goToStage(0);
      showToast("Operation reset. Re-briefing initiated.");
    });

    document.getElementById('btn-copy-debrief').addEventListener('click', copyDebriefToClipboard);

    // Close modals on escape key or backdrop click
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeExcuseModal();
        closeMinuteModal();
        closeSongsModal();
      }
    });

    [excuseModal, minuteModal, songsModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          modal.setAttribute('aria-hidden', 'true');
          sfx.playClick();
        }
      });
    });
  }

  // --- BOOTSTRAP ---
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    goToStage(0);
  });
})();
