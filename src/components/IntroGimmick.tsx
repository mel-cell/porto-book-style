"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

// ─── MAIN INTRO COMPONENT ───
interface IntroGimmickProps {
  isFading: boolean;
  onStartFade: () => void;
  onComplete: () => void;
}

export default function IntroGimmick({ isFading, onStartFade, onComplete }: IntroGimmickProps) {
  
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [isFading, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ pointerEvents: isFading ? "none" : "auto" }}
    >
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="max-w-[500px] w-full flex flex-col items-center text-center gap-12 select-none">
          
          {/* ICON */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black opacity-30"
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>

          {/* TEXT CONTENT */}
          <div className="flex flex-col gap-4">
             <h2 className="text-black font-serif text-[1.8rem] tracking-[0.55em] uppercase font-[800] leading-none">
                 SENSITIVE CONTENT
             </h2>
             <div className="h-[1px] w-24 bg-black/20 mx-auto my-2" />
             <p className="text-black/60 font-mono text-[11px] tracking-[0.2em] leading-relaxed uppercase px-8">
               This portfolio holds something that could spark your excitement
             </p>
          </div>

          {/* ACTION */}
          <button
            className="mt-8 px-12 py-4 border border-black text-black font-mono text-[10px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-black hover:text-white active:scale-95 bg-transparent"
            onClick={onStartFade}
          >
            VIEW PORTFOLIO
          </button>
        </div>
      </div>
    </motion.div>
  );
}
