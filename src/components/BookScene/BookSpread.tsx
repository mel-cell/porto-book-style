"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageFlip } from "@/hooks/usePageFlip";
import styles from "./BookSpread.module.css";

// ─── Page Registry ───────────────────────────────────────────────────────────
// To add a page: import it and add to PAGE_COMPONENTS.
// Index 0  → Inside Cover (always left when book first opens)
// Index 1  → First right page (first spread)
// Index 2  → Second left page (after first flip)
// Index 3  → Second right page
// ... and so on. Always pairs.
import Page1InsideCover from "@/components/pages/Page1InsideCover";
import Page2Intro       from "@/components/pages/Page2Intro";
import Page3Skills      from "@/components/pages/Page3Skills";
import Page4Projects    from "@/components/pages/Page4Projects";
import Page5Contact     from "@/components/pages/Page5Contact";

const PAGES = [
  <Page1InsideCover key="p1" />,
  <Page2Intro       key="p2" />,
  <Page3Skills      key="p3" />,
  <Page4Projects    key="p4" />,
  <Page5Contact     key="p5" />,
];
// ─────────────────────────────────────────────────────────────────────────────

interface BookSpreadProps {
  onClose: () => void;
}

export default function BookSpread({ onClose }: BookSpreadProps) {
  const {
    currentPage,   // index of the RIGHT page (starts at 1)
    canGoNext,
    canGoPrev,
    spreadRef,
    flipCardRef,
    flipState,
    isFlipping,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onMouseMove,
    onMouseLeave,
    hoverEdge,
  } = usePageFlip(PAGES.length);

  // ── Page indices ──────────────────────────────────────────────────────────
  const rightIdx = currentPage;
  const leftIdx  = currentPage - 1;

  // After a FORWARD flip: right page turns → new left = currentPage+1, new right = currentPage+2
  // After a BACKWARD flip: left turns back → new left = currentPage-3, new right = currentPage-2
  // The UNDER layer shows what will be visible after the flip completes
  const underForwardRight = rightIdx + 2;  // new right after forward
  const underForwardLeft  = rightIdx + 1;  // new left after forward (currently flipping page's back)
  const underBackwardLeft = leftIdx - 2;   // new left after backward
  const underBackwardRight = leftIdx - 1;  // new right after backward

  const get = (i: number) => (i >= 0 && i < PAGES.length ? PAGES[i] : null);

  // ── Spread counter ────────────────────────────────────────────────────────
  const spreadNum    = Math.ceil(currentPage / 2);
  const totalSpreads = Math.ceil((PAGES.length - 1) / 2);
  const showPrev     = canGoPrev;
  const showNext     = canGoNext;

  // ── Flip direction helpers ────────────────────────────────────────────────
  const isForward  = flipState?.direction === "forward";
  const isBackward = flipState?.direction === "backward";

  return (
    <div className={styles.wrapper}>
      <div className={styles.glow} />

      {/* ── Book block ── */}
      <div
        ref={spreadRef}
        className={styles.book}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >

        {/* ════════════════ LEFT PAGE ════════════════ */}
        <div className={`${styles.page} ${styles.pageLeft}`}>

          {/* Static left page content — NO FADE ANIMATION to prevent loop bug */}
          <div
            className={styles.fill}
            style={{ opacity: isBackward ? 0 : 1 }} // Instant hide/show
          >
            {get(leftIdx)}
          </div>

          {/* Under-layer for BACKWARD flip (shows previous left page beneath) */}
          {isBackward && (
            <div className={`${styles.fill} ${styles.underLayer}`}>
              {get(underBackwardLeft)}
            </div>
          )}

          {/* BACKWARD flip card — flips from left page to the right */}
          {isBackward && (
            <div
              ref={flipCardRef}
              className={`${styles.flipCard} ${styles.flipCardLeft}`}
            >
              <div className={styles.flipFront}>
                {get(leftIdx)}
                <div className={styles.shadowFront} />
              </div>
              <div className={styles.flipBack}>
                {get(underBackwardRight)}
                <div className={styles.shadowBack} />
              </div>
              <div className={styles.foldLine} />
            </div>
          )}

          <div
            className={styles.cornerLeft}
            style={{ opacity: hoverEdge === "left" && showPrev ? 1 : 0 }}
          />
        </div>

        {/* ════════════════ SPINE ════════════════ */}
        <div className={styles.spine} />

        {/* ════════════════ RIGHT PAGE ════════════════ */}
        <div className={`${styles.page} ${styles.pageRight}`}>

          {/* Static right page content — NO FADE ANIMATION */}
          <div
            className={styles.fill}
            style={{ opacity: isForward ? 0 : 1 }} // Instant hide/show
          >
            {get(rightIdx)}
          </div>

          {/* Under-layer for FORWARD flip (shows next right page beneath) */}
          {isForward && (
            <div className={`${styles.fill} ${styles.underLayer}`}>
              {get(underForwardRight)}
            </div>
          )}

          {/* FORWARD flip card — flips from right page over spine to the left */}
          {isForward && (
            <div
              ref={flipCardRef}
              className={`${styles.flipCard} ${styles.flipCardRight}`}
              // transform is driven directly by JS, no CSS transition
            >
              {/* Front face = current right page */}
              <div className={styles.flipFront}>
                {get(rightIdx)}
                <div className={styles.shadowFront} />
              </div>

              {/* Back face = next spread's left page */}
              <div className={styles.flipBack}>
                {get(underForwardLeft)}
                <div className={styles.shadowBack} />
              </div>

              <div className={styles.foldLine} />
            </div>
          )}

          {/* Corner peek — right */}
          <div
            className={styles.cornerRight}
            style={{
              opacity: hoverEdge === "right" && showNext ? 1 : 0,
              transform: hoverEdge === "right" && showNext ? "translateY(-5px)" : "translateY(0)",
            }}
          />
        </div>
      </div>

      {/* ─── HUD ─── */}
      <div className={styles.hud}>
        <span className={styles.hint}>{showPrev ? "← drag" : ""}</span>
        <span className={styles.counter}>{spreadNum} / {totalSpreads}</span>
        <span className={styles.hint} style={{ textAlign: "right" }}>
          {showNext ? "drag →" : ""}
        </span>
      </div>

      {/* Close */}
      <motion.button
        className={styles.closeBtn}
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        title="Close book"
      >
        ✕
      </motion.button>
    </div>
  );
}
