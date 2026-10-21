import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import bouquetImg from "../../assets/images/bouquet.png";
import giftboxImg from "../../assets/images/giftbox.png";

export default function BloomStage({ onDone }: { onDone: () => void }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const ang = (Math.PI * 2 * i) / 16;
        return { ang, dist: 110 + Math.random() * 90, delay: 1.15 + Math.random() * 0.35, size: 5 + Math.random() * 7 };
      }),
    []
  );

  useEffect(() => {
    const t = setTimeout(onDone, 4600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <section className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      {/* light burst */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: [0, 0.9, 0], scale: [0.4, 2.4, 3.2] }}
        transition={{ delay: 0.9, duration: 1.5, times: [0, 0.35, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#ffffff,rgba(255,255,255,0))]"
      />

      {/* gift box shakes then gives way to bouquet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 30 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1.06, 0.8],
          y: [30, 0, 0, -20],
          rotate: [0, 0, -6, 8, -10],
        }}
        transition={{ duration: 1.5, times: [0, 0.28, 0.5, 0.9, 1] }}
        className="absolute"
      >
        <img
          src={giftboxImg}
          alt=""
          className="watercolor w-40 select-none sm:w-48"
          draggable={false}
        />
      </motion.div>

      {/* bouquet blooms */}
      <motion.div
        initial={{ opacity: 0, scale: 0.15, rotate: -14 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 1.25, duration: 1.5, type: "spring", bounce: 0.3, damping: 12 }}
        className="relative"
      >
        <div className="absolute inset-[-12%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,236,214,0.95),rgba(255,236,214,0))] glow-pulse" />
        <img
          src={bouquetImg}
          alt="Bó hoa hồng và hoa cẩm chướng tặng mẹ"
          className="watercolor breathe w-64 select-none sm:w-80"
          draggable={false}
        />
        {sparkles.map((s, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.cos(s.ang) * s.dist,
              y: Math.sin(s.ang) * s.dist,
              scale: [0.4, 1.1, 0.3],
            }}
            transition={{ delay: s.delay, duration: 1.4, ease: "easeOut" }}
            className="pointer-events-none absolute left-1/2 top-1/2 rounded-full bg-[radial-gradient(circle,#fff8e4,#ffd98f_55%,rgba(255,217,143,0)_72%)]"
            style={{ width: s.size, height: s.size }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.9 }}
        className="mt-6"
      >
        <h2 className="font-display text-2xl italic text-ink-300 sm:text-3xl">
          Bó hoa này là của mẹ 💐
        </h2>
        <p className="mx-auto mt-2 max-w-xs font-body text-sm leading-relaxed text-ink-100 sm:text-base">
          Hoa hồng và cẩm chướng — con gửi tặng mẹ.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 0.8 }}
        className="hint-bounce mt-8 font-body text-sm text-blush-500"
      >
        ... còn một bức thư đang đợi mẹ ↓
      </motion.p>
    </section>
  );
}
