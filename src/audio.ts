/**
 * Web Audio API Sound Synthesizer
 * Generates all sound effects dynamically without external audio dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Soft tactile button click
  public playClick() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore audio errors
    }
  }

  // Helper to play a polyphonic chord (Hợp âm)
  public playChord(frequencies: number[], duration = 0.4, type: OscillatorType = 'triangle', volume = 0.15) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(volume / frequencies.length, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // ignore
    }
  }

  // Dual chime "ting ting" & C-Major Chord for correct answer
  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Play C-Major Chord triad (C5 - E5 - G5 - C6)
      this.playChord([523.25, 659.25, 783.99, 1046.50], 0.35, 'triangle', 0.25);

      // Note 2: B6 (ting ting higher chime)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1975.53, now + 0.12);
      gain2.gain.setValueAtTime(0.3, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch {
      // ignore audio errors
    }
  }

  // Ascending Combo Chord Progression (Hợp âm Combo tăng dần)
  public playComboChord(comboLevel: number) {
    const ctx = this.getContext();
    if (!ctx) return;

    // Different chord harmonies based on combo level
    const chords: number[][] = [
      [523.25, 659.25, 783.99],          // C Major
      [587.33, 739.99, 880.00],          // D Major
      [659.25, 830.61, 987.77],          // E Major
      [698.46, 880.00, 1046.50],         // F Major
      [783.99, 987.77, 1174.66, 1396.91] // G Major 7th
    ];

    const chordIndex = Math.min(comboLevel - 1, chords.length - 1);
    const selectedChord = chords[Math.max(0, chordIndex)];

    this.playChord(selectedChord, 0.5, 'sine', 0.3);
  }

  // Dissonant Minor/Diminished chord for incorrect answer
  public playIncorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Dissonant low chord (C3, Eb3, F#3)
      this.playChord([130.81, 155.56, 185.00], 0.35, 'sawtooth', 0.2);

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // ignore audio errors
    }
  }

  // Victory Fanfare & Grand Harmony Chord Sequence
  public playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Step 1: C Major Chord
      setTimeout(() => this.playChord([523.25, 659.25, 783.99], 0.25, 'triangle', 0.25), 0);
      // Step 2: F Major Chord
      setTimeout(() => this.playChord([698.46, 880.00, 1046.50], 0.25, 'triangle', 0.25), 200);
      // Step 3: G Major Chord
      setTimeout(() => this.playChord([783.99, 987.77, 1174.66], 0.25, 'triangle', 0.25), 400);
      // Step 4: Grand C Major 7th Harmony Chord Swell
      setTimeout(() => this.playChord([523.25, 659.25, 783.99, 1046.50, 1318.51], 0.8, 'sine', 0.35), 600);
    } catch {
      // ignore
    }
  }

  // Marching drum sound
  public playMarchStep() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
