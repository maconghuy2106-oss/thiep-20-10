import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type FireworksHandle = {
  /** Small sparkle burst at a point (normalized 0-1 of viewport, or px if raw=true) */
  burst: (x?: number, y?: number, opts?: BurstOpts) => void;
  /** Keep firing small fireworks for a while */
  autoFire: (durationMs: number, intervalMs?: number) => void;
};

type BurstOpts = { count?: number; power?: number; colors?: string[] };

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
};

const PALETTES = [
  ["#f4b942", "#ef476f", "#fff8ec"],
  ["#ffd166", "#d64570", "#ffffff"],
  ["#ffffff", "#e85d75", "#f7c948"],
];

const Fireworks = forwardRef<FireworksHandle>(function Fireworks(_props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number | null>(null);
  const autoUntil = useRef(0);
  const autoTimer = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    burst(nx = 0.5, ny = 0.35, opts = {}) {
      const cv = canvasRef.current;
      if (!cv) return;
      const { count = 34, power = 4.2, colors } = opts;
      const pal = colors ?? PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const x = nx * cv.width;
      const y = ny * cv.height;
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const sp = (power * 0.55 + Math.random() * power) * (window.devicePixelRatio > 1.5 ? 1.6 : 1.2);
        particles.current.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 0,
          maxLife: 55 + Math.random() * 40,
          size: (1 + Math.random() * 1.5) * (window.devicePixelRatio || 1),
          color: pal[Math.floor(Math.random() * pal.length)],
        });
      }
      start();
    },
    autoFire(durationMs, intervalMs = 750) {
      autoUntil.current = Date.now() + durationMs;
      if (autoTimer.current === null) {
        autoTimer.current = window.setInterval(() => {
          if (Date.now() > autoUntil.current) {
            if (autoTimer.current !== null) {
              window.clearInterval(autoTimer.current);
              autoTimer.current = null;
            }
            return;
          }
          const cv = canvasRef.current;
          if (!cv) return;
          const nx = 0.15 + Math.random() * 0.7;
          const ny = 0.08 + Math.random() * 0.26;
          const cvAny = cv as HTMLCanvasElement & {
            __burst?: (x: number, y: number) => void;
          };
          cvAny.__burst?.(nx, ny);
        }, intervalMs);
      }
      start();
    },
  }));

  // expose burst on canvas element for the auto timer
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const self = cv as HTMLCanvasElement & { __burst?: (x: number, y: number) => void };
    self.__burst = (x, y) =>
      (ref as React.RefObject<FireworksHandle | null>)?.current?.burst?.(x, y);
    return () => {
      self.__burst = undefined;
    };
  }, [ref]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = window.innerWidth * dpr;
      cv.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      if (autoTimer.current !== null) window.clearInterval(autoTimer.current);
    };
  }, []);

  const start = () => {
    if (raf.current !== null) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const c2d = cv.getContext("2d");
    if (!c2d) return;
    const loop = () => {
      c2d.clearRect(0, 0, cv.width, cv.height);
      const list = particles.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.985;
        p.vy *= 0.985;
        const t = p.life / p.maxLife;
        if (t >= 1) {
          list.splice(i, 1);
          continue;
        }
        const alpha = (1 - t) * 0.8;
        c2d.globalAlpha = alpha;
        c2d.fillStyle = p.color;
        c2d.beginPath();
        c2d.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
        c2d.fill();
      }
      c2d.globalAlpha = 1;
      if (list.length > 0) {
        raf.current = requestAnimationFrame(loop);
      } else {
        raf.current = null;
      }
    };
    raf.current = requestAnimationFrame(loop);
  };

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
});

export default Fireworks;
