"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageFlip } from "@/hooks/usePageFlip";
import PageFlipOverlay from "./PageFlipOverlay";
import styles from "./BookSpread.module.css";

interface SpreadContent {
  left: React.ReactNode;
  right: React.ReactNode;
}

interface BookSpreadProps {
  spreads: SpreadContent[];
  currentSpread: number;
  onNext: () => void;
  onPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  onClose: () => void;
}

export default function BookSpread({
  spreads,
  currentSpread,
  onNext,
  onPrev,
  canGoNext,
  canGoPrev,
  onClose,
}: BookSpreadProps) {
  const {
    flipState,
    pageRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    cornerPeekSide,
    onMouseMove,
    onMouseLeave,
  } = usePageFlip({
    onFlipNext: onNext,
    onFlipPrev: onPrev,
    canGoNext,
    canGoPrev,
  });

  const current = spreads[currentSpread];
  const next = spreads[currentSpread + 1];
  const prev = spreads[currentSpread - 1];

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      style={{ perspective: "var(--perspective)" }}
    >
      {/* Spine divider (center of book) */}
      <div className={styles.spine} />

      {/* Ambient glow */}
      <div className={styles.glow} />

      {/* Main spread container */}
      <div
        ref={pageRef}
        className={styles.spread}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {/* LEFT PAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`left-${currentSpread}`}
            className={styles.pageLeft}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          >
            {current?.left}

            {/* Corner peek indicator — left */}
            {canGoPrev && (
              <motion.div
                className={styles.cornerPeekLeft}
                animate={{ opacity: cornerPeekSide === "left" ? 1 : 0, x: cornerPeekSide === "left" ? 0 : -5 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* RIGHT PAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`right-${currentSpread}`}
            className={styles.pageRight}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          >
            {current?.right}

            {/* Corner peek indicator — right (bottom corner lifting) */}
            {canGoNext && (
              <motion.div
                className={styles.cornerPeekRight}
                animate={{
                  opacity: cornerPeekSide === "right" ? 1 : 0,
                  y: cornerPeekSide === "right" ? -4 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Flip overlay (corner peel + 3D flip) */}
        <PageFlipOverlay
          flipState={flipState}
          backContent={
            flipState.direction === "right" ? next?.left : prev?.right
          }
        />
      </div>

      {/* Bottom HUD */}
      <div className={styles.hud}>
        <span className={styles.hudNav}>
          {canGoPrev ? "← swipe right to go back" : ""}
        </span>
        <span className={styles.hudSpread}>
          {currentSpread + 1} / {spreads.length}
        </span>
        <span className={styles.hudNav}>
          {canGoNext ? "swipe left for more →" : ""}
        </span>
      </div>

      {/* Close button */}
      <motion.button
        className={styles.closeBtn}
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Close book"
      >
        <span>✕</span>
      </motion.button>
    </motion.div>
  );
}
