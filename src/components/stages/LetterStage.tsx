import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playSparkle } from "../../lib/music";

// 1. Nhập các bức ảnh gia đình từ thư mục assets
// (Bạn nhớ chuẩn bị các file ảnh family1.jpg, family2.jpg... trong src/assets/images/)
import anhdoi1 from "../../assets/images/anhdoi1.png";
import anhdoi2 from "../../assets/images/anhdoi2.png";
import anhdoi3 from "../../assets/images/anhdoi3.png";
import anhdoi4 from "../../assets/images/anhdoi4.png";

// Danh sách các bức ảnh kèm chú thích
const FAMILY_PHOTOS = [
  { url: anhdoi1, caption: "Tụi mình luôn bên nhau 💕" },
  { url: anhdoi2, caption: "Người xinh nhất trên đời ✨" },
  { url: anhdoi3, caption: "Chúc em luôn mỉm cười thật tươi, đừng khót nữa nhé hì 🌸" },
  { url: anhdoi4, caption: "Mãi yêu em hihi" },
];

// 2. Nội dung thư chúc mừng 20/10 mới
const LINES = [
  "Gửi Như Quỳnh yêu dấu,",
  "Nhân ngày Phụ nữ Việt Nam 20/10, anh chúc em luôn vui vẻ, tràn đầy sức khỏe và thật hạnh phúc!",
  "Cảm ơn em đã luôn là tựa gối bình yên, luôn yêu thương, quan tâm anh từng ngày.",
  "Em nhớ giữ gìn sức khỏe, luôn tươi cười và bình yên em nhé.",
  "Yêu em <3",
];

function useTypewriter(lines: string[], speed = 26) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished || lineIdx >= lines.length) {
      if (lineIdx >= lines.length && !finished) setFinished(true);
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      const t = window.setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 480);
    return () => window.clearTimeout(t);
  }, [lines, lineIdx, charIdx, speed, finished]);

  const skip = useCallback(() => {
    setLineIdx(lines.length);
    setCharIdx(0);
    setFinished(true);
  }, [lines.length]);

  return { lineIdx, charIdx, finished, skip };
}

export default function LetterStage({ onNext }: { onNext: () => void }) {
  const { lineIdx, charIdx, finished, skip } = useTypewriter(LINES);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [lineIdx, charIdx, finished]);

  const handleNext = () => {
    playSparkle();
    onNext();
  };

  return (
    <section className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-xl flex-col px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <div className="paper relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl shadow-xl">
          {/* Header thiệp */}
          <div className="flex items-center justify-between border-b border-dashed border-blush-300/70 px-5 py-3 bg-white/50">
            <span className="font-script text-xl text-blush-600">Thư gửi mẹ</span>
            <span className="font-body text-[0.65rem] uppercase tracking-[0.25em] text-blush-400">
              20 · 10
            </span>
          </div>

          <div
            ref={scrollRef}
            className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4 text-left sm:px-7 sm:py-6"
          >
            {/* Nội dung thư chạy chữ */}
            {LINES.slice(0, Math.min(lineIdx, LINES.length)).map((line, i) => (
              <p
                key={i}
                className={`font-body leading-relaxed text-ink-200 ${
                  i === 0
                    ? "font-display text-xl italic text-blush-700 sm:text-2xl"
                    : i === LINES.length - 1
                      ? "pt-2 font-script text-2xl text-blush-600"
                      : "text-[0.95rem] sm:text-base"
                }`}
              >
                {line}
              </p>
            ))}
            {!finished && lineIdx < LINES.length && (
              <p className="font-body text-[0.95rem] leading-relaxed text-ink-200 sm:text-base">
                {LINES[lineIdx].slice(0, charIdx)}
                <span className="caret" />
              </p>
            )}

            {/* ALBUM ẢNH GIA ĐÌNH (Xuất hiện khi đọc xong thư) */}
            {finished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-6 border-t border-dashed border-blush-200 pt-6 space-y-6"
              >
                <p className="font-display text-center text-lg italic text-blush-600">
                  📸 Khoảnh khắc của tụi mình 💕
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {FAMILY_PHOTOS.map((photo, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border-2 border-white bg-white p-2 shadow-md transition hover:scale-105"
                    >
                      <img
                        src={photo.url}
                        alt={`Ảnh gia đình ${index + 1}`}
                        className="h-40 w-full rounded-lg object-cover"
                      />
                      <p className="mt-2 text-center font-body text-xs text-blush-700">
                        {photo.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {!finished && (
            <button
              type="button"
              onClick={skip}
              className="absolute bottom-3 right-3 z-20 rounded-full bg-white/85 px-4 py-1.5 font-body text-xs text-blush-600 shadow-md backdrop-blur transition active:scale-95 cursor-pointer"
            >
              Hiện hết thư & xem ảnh ✨
            </button>
          )}
        </div>

        {finished && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 flex flex-col items-center gap-3 relative z-30"
          >
            <p className="font-body text-sm text-ink-100">
              Xem xong ảnh, em bấm vào đây nhé 💕
            </p>
            <button
              type="button"
              onClick={handleNext}
              className="relative z-50 rounded-full bg-gradient-to-br from-blush-400 via-blush-500 to-blush-600 px-8 py-3.5 font-display text-lg font-semibold text-white shadow-[0_16px_34px_-14px_rgba(189,75,109,0.75)] transition active:scale-95 cursor-pointer pointer-events-auto"
            >
              💕 Em ấn vào đây
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}