/**
 * Gentle piano music generated with the Web Audio API.
 * No audio files needed — a soft looping lullaby in C major
 * with felt-piano tone and a light reverb tail.
 */

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let wet: GainNode | null = null;
let timer: number | null = null;
let nextTime = 0;
let eighth = 0; // eighth-note index inside the loop

const STEP = 0.31; // seconds per eighth note (~97 BPM feel)
const ARP = [0, 4, 7, 12, 7, 4, 11, 7]; // arpeggio semitone offsets

// 8-bar chord progression (root midi, quality)
// C – G – Am – Em – F – C – F/G – C
const BARS: { root: number; minor?: boolean }[] = [
  { root: 48 },
  { root: 43 },
  { root: 45 },
  { root: 40 },
  { root: 41 },
  { root: 48 },
  { root: 41 },
  { root: 48 },
];

// melody: [eighth index within bar, midi, duration in steps]
const MELODY: Record<number, [number, number, number][]> = {
  0: [[0, 67, 3], [4, 72, 4]],
  1: [[0, 71, 3], [4, 74, 4]],
  2: [[0, 72, 3], [4, 76, 4]],
  3: [[0, 74, 3], [4, 71, 4]],
  4: [[0, 72, 2], [2, 76, 6]],
  5: [[0, 79, 3], [4, 76, 4]],
  6: [[0, 77, 3], [4, 74, 4]],
  7: [[0, 72, 7]],
};

function midiToFreq(m: number) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

function ensureCtx() {
  if (ctx) return ctx;
  const AC: typeof AudioContext =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();

  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // gentle lowpass to soften the tone
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 2600;
  lp.Q.value = 0.4;
  lp.connect(master);

  // simple reverb: decaying noise impulse
  const conv = ctx.createConvolver();
  const len = Math.floor(ctx.sampleRate * 2.4);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6) * 0.6;
    }
  }
  conv.buffer = buf;
  const wetGain = ctx.createGain();
  wetGain.gain.value = 0.35;
  wetGain.connect(conv);
  conv.connect(lp);
  wet = wetGain;

  return ctx;
}

function note(freq: number, time: number, dur: number, vel: number) {
  if (!ctx || !master) return;
  const g = ctx.createGain();
  g.connect(master);
  if (wet) g.connect(wet);

  const peak = vel * 0.16;
  g.gain.setValueAtTime(0.0001, time);
  g.gain.linearRampToValueAtTime(peak, time + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);

  const o1 = ctx.createOscillator();
  o1.type = "sine";
  o1.frequency.value = freq;
  o1.connect(g);

  const g2 = ctx.createGain();
  g2.gain.value = 0.32;
  g2.connect(g);
  const o2 = ctx.createOscillator();
  o2.type = "triangle";
  o2.frequency.value = freq * 2;
  o2.connect(g2);

  const g3 = ctx.createGain();
  g3.gain.value = 0.12;
  g3.connect(g);
  const o3 = ctx.createOscillator();
  o3.type = "sine";
  o3.frequency.value = freq * 3.01;
  o3.connect(g3);

  o1.start(time);
  o2.start(time);
  o3.start(time);
  const stop = time + dur + 0.1;
  o1.stop(stop);
  o2.stop(stop);
  o3.stop(stop);
}

function scheduleBar(bar: number, at: number) {
  const chord = BARS[bar % BARS.length];
  for (let i = 0; i < 8; i++) {
    const semi = ARP[i];
    const isAccent = i === 0;
    const m = chord.root + semi + (chord.minor && semi === 3 ? -1 : 0);
    note(midiToFreq(m), at + i * STEP, STEP * 2.6, isAccent ? 0.75 : 0.5);
  }
  const mel = MELODY[bar % BARS.length] || [];
  for (const [off, m, steps] of mel) {
    note(midiToFreq(m + 12), at + off * STEP, STEP * steps * 1.15, 0.62);
  }
}

function tick() {
  if (!ctx) return;
  const lookAhead = 0.35;
  while (nextTime < ctx.currentTime + lookAhead) {
    const bar = Math.floor(eighth / 8) % BARS.length;
    const pos = eighth % 8;
    if (pos === 0) scheduleBar(bar, nextTime);
    eighth++;
    nextTime += STEP;
  }
}

export function startMusic() {
  const c = ensureCtx();
  if (c.state === "suspended") void c.resume();
  if (master) {
    master.gain.cancelScheduledValues(c.currentTime);
    master.gain.setTargetAtTime(0.85, c.currentTime, 0.8);
  }
  if (timer === null) {
    eighth = 0;
    nextTime = c.currentTime + 0.12;
    timer = window.setInterval(tick, 60);
    tick();
  }
}

export function stopMusic() {
  if (!ctx || !master) return;
  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
  if (timer !== null) {
    window.clearInterval(timer);
    timer = null;
  }
}

/** Soft sparkle chime for taps & reveals */
export function playSparkle() {
  const c = ensureCtx();
  if (c.state === "suspended") void c.resume();
  if (!master) return;
  const t0 = c.currentTime + 0.01;
  note(midiToFreq(84), t0, 0.5, 0.34);
  note(midiToFreq(91), t0 + 0.09, 0.6, 0.26);
}

/** Warm pop for opening the gift */
export function playPop() {
  const c = ensureCtx();
  if (c.state === "suspended") void c.resume();
  if (!master) return;
  const t0 = c.currentTime + 0.01;
  [60, 64, 67, 72, 76].forEach((m, i) => note(midiToFreq(m), t0 + i * 0.07, 1.1, 0.5));
}
