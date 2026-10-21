import React from "react";
import { motion } from "framer-motion";
import giftboxImg from "../../assets/images/giftbox.png";

export default function IntroStage({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-4">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="font-script text-4xl text-blush-600 sm:text-5xl"
      >
        20 <span className="text-gold-soft">·</span> 10
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-1 font-body text-xs uppercase tracking-[0.3em] text-blush-500"
      >
        Ngày Phụ nữ Việt Nam
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring", bounce: 0.3 }}
        className="relative mt-4 flex justify-center items-center w-full"
      >
        <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,214,228,0.9),rgba(255,214,228,0))] glow-pulse" />
        <img
          src={giftboxImg}
          alt="Hộp quà màu hồng"
          className="watercolor gentle-file w-32 sm:w-40 select-none object-contain mx-auto"
          style={{ maxWidth: "140px" }}
          draggable={false}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-3 font-display text-2xl italic leading-snug text-ink-300 sm:text-3xl"
      >
        Đây là quà của
        <br />
        <span className="not-italic font-semibold text-blush-700">Ma Công Huy</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-2 max-w-xs font-body text-sm leading-relaxed text-ink-100 mx-auto"
      >
        Tặng Như Quỳnh yêu dấu nhân ngày 20/10 — có một điều bất ngờ đang chờ em mở ra 💗
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-5 flex flex-col items-center justify-center w-full gap-2"
      >
        <div className="relative ring-ripple rounded-full flex justify-center">
          <button
            type="button"
            onClick={onOpen}
            className="rounded-full bg-gradient-to-br from-blush-400 via-blush-500 to-blush-600 px-8 py-3 font-display text-lg font-semibold tracking-wide text-white shadow-lg transition active:scale-95 cursor-pointer"
          >
            🎁 Mở quà!
          </button>
        </div>
        <p className="hint-bounce font-body text-xs text-blush-500">
          Em bấm nhẹ vào nút nhé ↓
        </p>
      </motion.div>
    </div>
  );
}