import { useCallback } from 'react';
import { getAudioContext } from '../utils/audioContext';

function playTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Audio context unavailable — skip silently
  }
}

export function useSound() {
  const playAlert = useCallback(() => {
    playTone(880, 0.3);
    setTimeout(() => playTone(880, 0.3), 350);
  }, []);

  const playStart = useCallback(() => {
    playTone(1046, 0.3);
    setTimeout(() => playTone(1319, 0.4), 200);
  }, []);

  const playComplete = useCallback(() => {
    playTone(1046, 0.35);
    setTimeout(() => playTone(1319, 0.35), 200);
    setTimeout(() => playTone(1568, 0.6), 400);
  }, []);

  return { playAlert, playStart, playComplete };
}
