import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "./components/Backdrop";
import Fireworks, { type FireworksHandle } from "./components/Fireworks";
import IntroStage from "./components/stages/IntroStage";
import BloomStage from "./components/stages/BloomStage";
import EnvelopeStage from "./components/stages/EnvelopeStage";
import LetterStage from "./components/stages/LetterStage";
import ExploreStage from "./components/stages/ExploreStage";
import FinaleStage from "./components/stages/FinaleStage";
import { playPop, startMusic, stopMusic } from "./lib/music";

type Stage = "intro" | "bloom" | "envelope" | "letter" | "explore" | "finale";

export default function App() {
  const [stage, setStage] = useState<Stage>("intro");
  const [musicOn, setMusicOn] = useState(false);
  const fwRef = useRef<FireworksHandle | null>(null);

  const toggleMusic = useCallback(() => {
    setMusicOn((on) => {
      if (on) {
        stopMusic();
        return false;
      }
      startMusic();
      return true;
    });
  }, []);

  const handleOpenGift = useCallback(() => {
    if (!musicOn) {
      startMusic();
      setMusicOn(true);
    }
    playPop();
    fwRef.current?.burst(0.5, 0.3, { count: 30, power: 3.8 });
    window.setTimeout(() => fwRef.current?.burst(0.32, 0.42, { count: 16, power: 2.6 }), 260);
    window.setTimeout(() => fwRef.current?.burst(0.7, 0.38, { count: 16, power: 2.6 }), 480);
    setStage("bloom");
  }, [musicOn]);

  const handleReplay = useCallback(() => {
    setStage("intro");
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#ffe4ec] flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Khung thẻ bo tròn căn giữa hoàn hảo trên máy tính */}
      <div className="relative w-full sm:max-w-md md:max-w-lg min-h-screen sm:min-h-[85vh] bg-[#fff8fa] sm:rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(160,84,106,0.25)] overflow-hidden border border-pink-100 flex flex-col items-center justify-center">
        
        <Backdrop />
        <Fireworks ref={fwRef} />

        {/* Nút bật/tắt nhạc */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={musicOn}
          aria-label={musicOn ? "Tắt nhạc" : "Bật nhạc"}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-base shadow-md backdrop-blur transition active:scale-90 cursor-pointer"
          style={{ top: "max(1rem, env(safe-area-inset-top))" }}
        >
          <span className={musicOn ? "animate-pulse" : "opacity-45 grayscale"}>
            {musicOn ? "🎵" : "🔇"}
          </span>
        </button>

        {/* Khung chứa các stage được căn giữa tuyệt đối */}
        <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full flex flex-col items-center justify-center"
            >
              {stage === "intro" && <IntroStage onOpen={handleOpenGift} />}
              {stage === "bloom" && (
                <BloomStage onDone={() => setStage("envelope")} />
              )}
              {stage === "envelope" && (
                <EnvelopeStage onOpen={() => setStage("letter")} />
              )}
              {stage === "letter" && <LetterStage onNext={() => setStage("explore")} />}
              {stage === "explore" && <ExploreStage onNext={() => setStage("finale")} />}
              {stage === "finale" && (
                <FinaleStage fwRef={fwRef} onReplay={handleReplay} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}