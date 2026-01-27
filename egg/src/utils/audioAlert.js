// Advanced audio notification system with multiple alert types

export class AudioAlertSystem {
  constructor() {
    this.audioContext = null;
    this.masterGain = null;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.5; // 50% volume
    } catch (error) {
      console.log('AudioContext not available:', error);
    }
  }

  // Play a melodic completion alert (pleasant bell-like sound)
  playCompletionAlert() {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (C major chord)

    notes.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.value = freq;
      filter.type = 'lowpass';
      filter.frequency.value = 8000;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      // Staggered attack-decay envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);

      osc.start(now);
      osc.stop(now + 0.8);
    });
  }

  // Countdown alert (beep sounds)
  playCountdownAlert() {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = 1000;

      osc.connect(gain);
      gain.connect(this.masterGain);

      const startTime = now + i * 0.15;
      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.setValueAtTime(0, startTime + 0.1);

      osc.start(startTime);
      osc.stop(startTime + 0.1);
    }
  }

  // Level milestone alert (ascending notes)
  playMilestoneAlert() {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const frequencies = [392, 440, 494]; // G, A, B

    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freq;

      osc.connect(gain);
      gain.connect(this.masterGain);

      const startTime = now + index * 0.1;
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  // Pause notification (single low tone)
  playPauseAlert() {
    if (!this.audioContext) return;

    const ctx = this.audioContext;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 440;

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Set volume (0 to 1)
  setVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  // Mute/unmute
  toggleMute(mute) {
    if (this.masterGain) {
      this.masterGain.gain.value = mute ? 0 : 0.5;
    }
  }
}

export default new AudioAlertSystem();
