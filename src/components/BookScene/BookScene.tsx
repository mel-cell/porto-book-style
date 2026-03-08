"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

import { useBookState } from "@/hooks/useBookState";
import BookCover from "./BookCover";
import BookSpread from "./BookSpread";
import IntroPage from "@/components/pages/IntroPage";
import SkillsPage from "@/components/pages/SkillsPage";

import styles from "./BookScene.module.css";

// Define all spreads (pairs of pages)
const SPREADS = [
  {
    left: <IntroPage />,
    right: <SkillsPage />,
  },
  // More spreads will be added here (projects, contact)
  {
    left: (
      <div style={{ width: "100%", height: "100%", background: "var(--bg-page)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.2em" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚧</div>
          PROJECTS<br />COMING SOON
        </div>
      </div>
    ),
    right: (
      <div style={{ width: "100%", height: "100%", background: "var(--bg-page-alt)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)", fontFamily: "JetBrains Mono, monospace", fontSize: "10px", letterSpacing: "0.2em" }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📬</div>
          CONTACT<br />COMING SOON
        </div>
      </div>
    ),
  },
];

export default function BookScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  const {
    state,
    currentSpread,
    openBook,
    closeBook,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev,
  } = useBookState(SPREADS.length);

  // GSAP opening animation
  const handleOpen = () => {
    if (!coverRef.current) return openBook();

    const tl = gsap.timeline({
      onComplete: openBook,
    });

    tl.to(coverRef.current, {
      y: 10,
      duration: 0.2,
      ease: "power2.in",
    })
      .to(coverRef.current, {
        rotateY: -180,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.inOut",
      })
      .to(coverRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, "-=0.2");
  };

  return (
    <div ref={containerRef} className={styles.scene}>
      {/* Background radial gradient */}
      <div className={styles.bg} />

      <AnimatePresence mode="wait">
        {(state === "cover" || state === "closing") && (
          <motion.div
            key="cover"
            ref={coverRef}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <BookCover onOpen={handleOpen} />
          </motion.div>
        )}

        {(state === "open" || state === "opening") && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <BookSpread
              spreads={SPREADS}
              currentSpread={currentSpread}
              onNext={nextPage}
              onPrev={prevPage}
              canGoNext={canGoNext}
              canGoPrev={canGoPrev}
              onClose={closeBook}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
