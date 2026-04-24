"use client";

import { motion } from "framer-motion";

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delay: 1, duration: 2 } 
  }
};

export default function Page4Marginalia() {
  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none z-[5] overflow-hidden font-handwrite text-[#3e2723] opacity-75"
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── ARCHIVE STAMP (Restored Detail) ── */}
      <div className="absolute top-10 left-8 border-[1.5px] border-[#d32f2f] text-[#d32f2f] px-2 py-0.5 font-mono text-[0.6rem] uppercase -rotate-[15deg] opacity-40 rounded-[2px] tracking-wider">
        VERIFIED_DATA
      </div>

      {/* ── TECHNICAL SKETCH (SVG Path Detail) ── */}
      <div className="absolute top-[40%] left-[30px] w-[140px] h-[100px] opacity-60">
        <svg viewBox="0 0 200 120" stroke="currentColor" fill="none" strokeWidth="1.2" strokeLinecap="round">
          <path d="M40 80 L90 80 L80 40 L30 40 Z" />
          <path d="M40 80 L40 100 L90 100 L90 80" />
          <path d="M100 90 L150 90 L140 50 L90 50 Z" />
          <path d="M60 40 C 60 20, 120 20, 120 50" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* ── INK SPLAT ── */}
      <div className="absolute top-[25%] right-[5%] w-[30px] h-[30px] opacity-20">
         <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 30 Q 55 10, 70 30 T 90 50 T 70 70 T 50 90 T 30 70 T 10 50 T 30 30 Z" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="85" cy="85" r="5" />
         </svg>
      </div>

      <div className="absolute top-[15%] left-[5%] text-[0.85rem] leading-[1.1] -rotate-[10deg] whitespace-nowrap">{"optimize this loop.."}</div>
      <div className="absolute top-[48%] left-[6%] text-[1rem] leading-[1.1] -rotate-[2deg] whitespace-nowrap">{"System architecture v4.0"}</div>

      <div className="absolute bottom-6 right-6 opacity-30 font-[var(--font-mono)] text-[0.65rem]">
         BATCH_RUN_ID: 110324_v2
      </div>
    </motion.div>
  );
}
