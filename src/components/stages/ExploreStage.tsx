import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playSparkle } from "../../lib/music";

const ITEMS: { icon: string; label: string; message: string }[] = [
  {
    icon: "🌹",
    label: "Một lời cảm ơn",
    message:
      "Thank you mẹ đã dạy dỗ con và Tùng.",
  },
  {
    icon: "💐",
    label: "Một lời hứa",
    message:
      "Con sẽ cố gắng học tập trong môi trường quân sự này.",
  },
  {
    icon: "🌸",
    label: "Điều con nhớ nhất",
    message:
      "Cách mẹ chăm con và Tùng lúc ốm.",
  },
  {
    icon: "💗",
    label: "Con dặn mẹ",
    message:
      "Sống vui vẻ, mạnh khỏe với ba Kim.",
  },
  {
    icon: "✨",
    label: "Một bất ngờ nho nhỏ",
    message:
      "Là không có bất ngờ gì :)).",
  },
];

export default function ExploreStage({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number[]>([]);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const open = (i: number) => {
    playSparkle();
    setOpened((prev) => (prev.includes(i) ? prev : [...prev, i]));
    window.setTimeout(
      () =>
        cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" }),
      350
    );
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col items-center px-5 py-10 text-center sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-display text-2xl italic text-ink-300 sm:text-3xl"
      >
        Mẹ ấn vào đây nhá
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.8 }}
        className="mt-2 max-w-xs font-body text-sm leading-relaxed text-ink-100"
      >
        Ở đây mẹ ấn từng cái một
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.85 }}
        className="mt-7 grid w-full max-w-sm grid-cols-2 gap-3"
      >
        {ITEMS.map((item, i) => {
          const isOpen = opened.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => open(i)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-4 shadow-sm transition active:scale-95 ${
                isOpen
                  ? "border-blush-400 bg-white/95 text-blush-700"
                  : "border-white/70 bg-white/70 text-ink-200 hover:bg-white/95"
              } ${i === ITEMS.length - 1 ? "col-span-2" : ""}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-body text-[0.8rem] font-medium leading-tight">
                {item.label}
              </span>
              <span className="font-body text-[0.62rem] text-blush-400">
                {isOpen ? "✓ Đã mở" : "Ấn để mở"}
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="mt-7 w-full max-w-sm space-y-3">
        <AnimatePresence>
          {opened.map((i) => (
            <motion.div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, type: "spring", bounce: 0.3 }}
              className="paper rounded-2xl px-5 py-4 text-left"
            >
              <p className="font-script text-xl text-blush-600">
                {ITEMS[i].icon} {ITEMS[i].label}
              </p>
              <p className="mt-1 font-body text-[0.9rem] leading-relaxed text-ink-200">
                {ITEMS[i].message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {opened.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-9 flex flex-col items-center gap-3"
        >
          <p className="font-body text-sm text-ink-100">
            Còn một món quà cuối cùng chờ mẹ khám phá
          </p>
          <button
            type="button"
            onClick={() => {
              playSparkle();
              onNext();
            }}
            className="rounded-full bg-gradient-to-br from-blush-400 via-blush-500 to-blush-600 px-8 py-3.5 font-display text-lg font-semibold text-white shadow-[0_16px_34px_-14px_rgba(189,75,109,0.75)] transition active:scale-95"
          >
            💝 Xem quà cuối cùng
          </button>
        </motion.div>
      )}
    </section>
  );
}
