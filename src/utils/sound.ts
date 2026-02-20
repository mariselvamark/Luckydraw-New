// Play clap sound from public/clapsound.wav

export const playApplause = (_durationMs: number = 3500): void => {
  try {
    const audio = new Audio('/clapsound.wav');
    audio.volume = 0.3;
    audio.play().catch((e) => console.warn('Could not play clap sound:', e));
  } catch (e) {
    console.warn('Could not play clap sound:', e);
  }
};

// Celebratory chime sound — ascending major chord arpeggio
export const playConfettiPop = (): void => {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    // Three ascending notes: C6, E6, G6 — a cheerful major triad
    const notes = [1047, 1319, 1568]; // Hz
    const noteSpacing = 0.1; // seconds between notes

    notes.forEach((freq, i) => {
      const startTime = now + i * noteSpacing;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain).connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });

    // Cleanup
    setTimeout(() => ctx.close(), 1000);
  } catch (e) {
    console.warn('Could not play confetti sound:', e);
  }
};
