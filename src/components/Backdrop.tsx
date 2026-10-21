import { useMemo } from "react";

/** Soft background: gradient glow, falling petals, floating stars */
export default function Backdrop() {
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const size = 11 + Math.random() * 12;
        const pair = [
          ["#ffe3ec", "#ffb9cf"],
          ["#ffd9e4", "#f9a8c3"],
          ["#fde6d8", "#f6c3ae"],
        ][i % 3];
        return {
          key: i,
          left: Math.random() * 100,
          dur: 13 + Math.random() * 12,
          delay: -Math.random() * 22,
          swayDur: 3.5 + Math.random() * 3.5,
          drift: -60 + Math.random() * 140,
          scale: 0.7 + Math.random() * 0.7,
          opacity: 0.45 + Math.random() * 0.4,
          size,
          a: pair[0],
          b: pair[1],
        };
      }),
    []
  );

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        key: i,
        left: Math.random() * 100,
        top: 4 + Math.random() * 82,
        dur: 4.5 + Math.random() * 5,
        delay: -Math.random() * 8,
        size: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* soft moving bokeh light */}
      <div className="absolute -top-24 left-1/2 h-[46vh] w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.9),rgba(255,255,255,0))] glow-pulse" />
      <div className="absolute bottom-[-18vh] left-[-22vw] h-[52vh] w-[80vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,205,220,0.75),rgba(255,205,220,0))] glow-pulse" style={{ animationDelay: "1.4s" }} />
      <div className="absolute bottom-[-14vh] right-[-20vw] h-[46vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(255,232,205,0.7),rgba(255,232,205,0))] glow-pulse" style={{ animationDelay: "2.6s" }} />

      {petals.map((p) => (
        <div
          key={p.key}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              "--petal-dur": `${p.dur}s`,
              "--petal-delay": `${p.delay}s`,
              "--sway-dur": `${p.swayDur}s`,
              "--petal-drift": `${p.drift}px`,
              "--petal-scale": p.scale,
              "--petal-opacity": p.opacity,
              "--petal-a": p.a,
              "--petal-b": p.b,
            } as React.CSSProperties
          }
        >
          <div className="petal-inner" />
        </div>
      ))}

      {stars.map((s) => (
        <div
          key={s.key}
          className="star"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              "--star-dur": `${s.dur}s`,
              "--star-delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
