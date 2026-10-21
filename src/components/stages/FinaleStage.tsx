import React, { useEffect } from "react";
import { motion } from "framer-motion";
import heartImg from "../../assets/images/heart-flowers.png";
import type { FireworksHandle } from "../Fireworks";

export default function FinaleStage({
  fwRef,
  onReplay,
}: {
  fwRef: React.MutableRefObject<FireworksHandle | null>;
  onReplay: () => void;
}) {
  useEffect(() => {
    fwRef.current?.autoFire(11000, 800);
    // a couple of welcoming bursts right away
    fwRef.current?.burst(0.28, 0.24);
    window.setTimeout(() => fwRef.current?.burst(0.72, 0.2), 350);
  }, [fwRef]);

  return (
    <section className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.35 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3, damping: 12 }}
        className="relative"
      >
        <div className="absolute inset-[-16%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,220,232,0.95),rgba(255,220,232,0))] glow-pulse" />
        <img
          src={heartImg}
          alt="Trái tim được kết bằng hoa hồng và hoa cẩm chướng"
          className="watercolor breathe w-60 select-none sm:w-72"
          draggable={false}
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1 }}
        className="mt-7 max-w-sm font-display text-[1.45rem] italic leading-snug text-ink-300 sm:text-3xl"
      >
        Chúc mẹ ngày 20/10 thật vui vẻ,
        <br />
        luôn mạnh khỏe, bình an và hạnh phúc
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9 }}
        className="mt-5"
      >
        <p className="font-script text-2xl text-blush-600 sm:text-3xl">
          Gửi đến mẹ sì Nhung
        </p>
        <p className="mt-1 font-body text-sm text-ink-100">
          — Ma Công Huy —
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="mt-9 flex flex-col items-center gap-3"
      >
        <p className="hint-bounce font-body text-xs text-blush-400">
          💮 Mẹ giữ lại làm kỷ niệm nhé
        </p>
        <button
          type="button"
          onClick={onReplay}
          className="rounded-full border border-blush-300 bg-white/80 px-6 py-2.5 font-body text-sm text-blush-600 shadow-sm backdrop-blur transition active:scale-95"
        >
          🎁 Mở lại từ đầu
        </button>
      </motion.div>
    </section>
  );
}
