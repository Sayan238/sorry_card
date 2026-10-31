// Web Audio API synth for cute sound effects and ambient lofi chords
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sparkle / Chime sound
export function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.5);
    });
  } catch (e) {
    console.warn("Audio error", e);
  }
}

// Cute playful dodge whoosh / boing
export function playBoing() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.22);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  } catch (e) {
    console.warn("Audio error", e);
  }
}

// Heavy satisfying rubber stamp sound
export function playStamp() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Thump
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);

    // After-chime
    setTimeout(() => playChime(), 120);
  } catch (e) {
    console.warn("Audio error", e);
  }
}

// Ambient Lofi BGM generator
let bgmInterval = null;
let bgmPlaying = false;

export function toggleAmbientBgm(onStateChange) {
  const ctx = getAudioContext();
  if (!ctx) return false;

  if (bgmPlaying) {
    if (bgmInterval) {
      clearInterval(bgmInterval);
      bgmInterval = null;
    }
    bgmPlaying = false;
    if (onStateChange) onStateChange(false);
    return false;
  }

  bgmPlaying = true;
  if (onStateChange) onStateChange(true);

  // Soothing chord progression: Fmaj7 -> G6 -> Em7 -> Am7
  const chords = [
    [349.23, 440.0, 523.25, 659.25], // F4, A4, C5, E5
    [392.0, 493.88, 587.33, 659.25], // G4, B4, D5, E5
    [329.63, 392.0, 493.88, 587.33], // E4, G4, B4, D5
    [440.0, 523.25, 659.25, 783.99], // A4, C5, E5, G5
  ];
  let chordIndex = 0;

  const playChord = () => {
    if (!bgmPlaying) return;
    try {
      const currentChord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;
      const now = ctx.currentTime;

      currentChord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.025, now + i * 0.05 + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 2.5);
      });
    } catch (e) {
      console.warn("BGM error", e);
    }
  };

  playChord();
  bgmInterval = setInterval(playChord, 2200);
  return true;
}
