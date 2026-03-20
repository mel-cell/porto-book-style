"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import s from "./Page4Marginalia.module.css";

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
      className={s.marginaliaLayer}
      variants={fadeVariants}
      initial="hidden"
      animate="visible"
    >

 

      {/* ── TECHNICAL SKETCH (Hand-drawn style) ── */}
      <div className={s.sketch}>
        <svg viewBox="0 0 200 120" stroke="currentColor" fill="none" strokeWidth="1.2" strokeLinecap="round">
          {/* Box 1 (Server) */}
          <path d="M40 80 L90 80 L80 40 L30 40 Z" />
          <path d="M40 80 L40 100 L90 100 L90 80" />
          {/* Box 2 (Database) */}
          <path d="M100 90 L150 90 L140 50 L90 50 Z" />
          <path d="M100 90 L100 110 L150 110 L150 90" />
          {/* Messy Connection Lines */}
          <path d="M60 40 C 60 20, 120 20, 120 50" strokeDasharray="2 2" />
          <path d="M80 60 Q 95 35, 110 60" />
          <path d="M50 100 Q 70 120, 110 110" />
          {/* Random Scribble Details */}
          <path d="M35 85 h10 M35 90 h15" />
          <path d="M105 100 h15 M105 105 h10" />
        </svg>
      </div>

      {/* ── INK SPLAT ── */}
      <div className={s.splat}>
         <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 30 Q 55 10, 70 30 T 90 50 T 70 70 T 50 90 T 30 70 T 10 50 T 30 30 Z" />
            <circle cx="20" cy="20" r="3" />
            <circle cx="85" cy="85" r="5" />
            <circle cx="15" cy="80" r="4" />
         </svg>
      </div>

      {/* ── DATE STAMP ── */}
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', opacity: 0.3, fontFamily: 'var(--font-rough)', fontSize: '0.65rem' }}>
         BATCH_RUN_ID: 110324_v2
      </div>
    </motion.div>
  );
}
