import React, { useState } from "react";
import { motion } from "framer-motion";
import { playSparkle } from "../../lib/music";

export default function EnvelopeStage({ onOpen }: { onOpen: () => void }) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    playSparkle();
    window.setTimeout(onOpen, 1900);
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col items-center justify-center px-6 py-12 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-2xl italic text-ink-300 sm:text-3xl"
      >
        Mẹ ơi, có một bức thư gửi mẹ ✉️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-2 font-body text-sm text-ink-100"
      >
        Đây là những lời chúc 20/10 của Ma Huy
      </motion.p>

      <motion.button
        type="button"
        onClick={handleOpen}
        initial={{ opacity: 0, scale: 0.7, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9, type: "spring", bounce: 0.3 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Mở bức thư"
        className={`group relative mt-10 block ${opened ? "env-open" : ""}`}
      >
        <div
          className="relative"
          style={{ perspective: "1000px", width: "min(300px, 78vw)" }}
        >
          <div className="relative aspect-[300/205] w-full">
            {/* envelope back */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-cream-200 to-blush-200 shadow-[0_26px_50px_-24px_rgba(160,84,106,0.6)]" />

            {/* letter sliding out */}
            <div className="env-letter paper absolute bottom-[10%] left-[7%] right-[7%] top-[9%] z-10 rounded-md px-4 py-3 text-left">
              <p className="font-script text-lg text-blush-700">Gửi mẹ yêu,</p>
              <p className="mt-1 font-body text-[0.62rem] leading-relaxed text-ink-100/80 sm:text-[0.7rem">
                Có rất nhiều thứ ở trong này
              </p>
            </div>

            {/* front pockets */}
            <div className="absolute inset-x-0 bottom-0 z-20 h-[64%] overflow-hidden rounded-b-xl bg-gradient-to-b from-blush-400 to-blush-500">
              <div
                className="absolute inset-0 bg-gradient-to-br from-blush-500/70 to-transparent"
                style={{ clipPath: "polygon(0 0, 58% 42%, 0 100%)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-bl from-blush-500/70 to-transparent"
                style={{ clipPath: "polygon(100% 0, 42% 42%, 100% 100%)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-blush-600/60 to-transparent"
                style={{ clipPath: "polygon(0 100%, 50% 40%, 100% 100%)" }}
              />
            </div>

            {/* flap */}
            <div
              className="env-flap absolute inset-x-0 top-0 z-30 h-[58%]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blush-500 to-blush-600" />
            </div>

            {/* wax seal */}
            <div
              className={`absolute left-1/2 top-[52%] z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-blush-600 to-blush-800 shadow-lg transition-all duration-500 ${
                opened ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              <span className="text-lg">💗</span>
              <span className="absolute inset-0 rounded-full border border-white/30" />
            </div>
          </div>

          {/* tap ripple hint */}
          {!opened && (
            <span className="ring-ripple pointer-events-none absolute inset-2 rounded-xl" />
          )}
        </div>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className={`hint-bounce mt-9 font-body text-sm text-blush-600 ${
          opened ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      >
        👆 Mẹ nhấn vào phong bì để mở thư nhé
      </motion.p>
    </section>
  );
}
