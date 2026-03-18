"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./IntroGimmick.module.css";

// ─── MAIN INTRO COMPONENT ───
interface IntroGimmickProps {
  isFading: boolean;
  onStartFade: () => void;
  onComplete: () => void;
}

export default function IntroGimmick({ isFading, onStartFade, onComplete }: IntroGimmickProps) {
  
  // Triggers exit and unmounts component after 1 second fading out
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
      className={styles.container}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{ pointerEvents: isFading ? "none" : "auto" }}
    >

      {/* Foreground Warning Box */}
      <div className={styles.overlay}>
        <div className={styles.content}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon}
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>

          <h2 className={styles.title}>SENSITIVE CONTENT</h2>
          <p className={styles.subtitle}>
            This portfolio holds something that could spark your excitement
          </p>

          <button
            className={styles.viewBtn}
            onClick={onStartFade}
          >
            VIEW PORTFOLIO
          </button>
        </div>
      </div>
    </motion.div>
  );
}
