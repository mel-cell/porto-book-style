"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import { FlipState } from "@/hooks/usePageFlip";
import styles from "./PageFlipOverlay.module.css";

interface PageFlipOverlayProps {
  flipState: FlipState;
  backContent: React.ReactNode;
}

export default function PageFlipOverlay({ flipState, backContent }: PageFlipOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (!flipState.isFlipping || flipState.progress <= 0) return;

    const { progress, originX, originY, direction } = flipState;

    // Determine fold start point (where drag originated)
    const startX = direction === "right" ? w : 0;
    const startY = originY * h;

    // How far the fold has progressed
    const foldProgress = progress;

    // Shadow gradient on folded part
    const foldWidth = foldProgress * w * 0.5;
    const shadowGrad = ctx.createLinearGradient(
      startX,
      0,
      startX - (direction === "right" ? foldWidth : -foldWidth),
      0
    );
    shadowGrad.addColorStop(0, "rgba(0, 0, 0, 0.0)");
    shadowGrad.addColorStop(0.3, "rgba(0, 0, 0, 0.25)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0.55)");

    // Draw shadow on the underlying page
    if (direction === "right") {
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(w - foldWidth, 0, foldWidth, h);
    } else {
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, 0, foldWidth, h);
    }

    // Corner curl highlight
    const curlRadius = 20 * foldProgress;
    const cx = direction === "right" ? w - foldWidth : foldWidth;
    const cy = startY;
    const highlightGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, curlRadius * 3);
    highlightGrad.addColorStop(0, "rgba(255,255,255,0.06)");
    highlightGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = highlightGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, curlRadius * 3, 0, Math.PI * 2);
    ctx.fill();
  }, [flipState]);

  if (!flipState.isFlipping) return null;

  const { progress, direction, originX, originY } = flipState;

  // Clip path for the flipping page portion
  // The unflipped portion animates as rotateY
  const rotateAngle = direction === "right"
    ? -progress * 185
    : progress * 185;

  const originXPercent = direction === "right" ? "0%" : "100%";

  return (
    <div className={styles.overlay}>
      {/* Shadow canvas drawn on top of current pages */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={800}
        height={600}
      />

      {/* The flipping page itself */}
      <motion.div
        className={styles.flippingPage}
        style={{
          // Clip to only the half that's flipping
          clipPath: direction === "right"
            ? `polygon(${(1 - progress * 0.5) * 100}% 0%, 100% 0%, 100% 100%, ${(1 - progress * 0.5) * 100}% 100%)`
            : `polygon(0% 0%, ${progress * 50}% 0%, ${progress * 50}% 100%, 0% 100%)`,
          transformOrigin: `${originXPercent} ${originY * 100}%`,
          transform: `perspective(1200px) rotateY(${rotateAngle}deg)`,
          transition: flipState.progress >= 1 ? "transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
        }}
      >
        <div className={styles.backFace}>
          {backContent}
        </div>
      </motion.div>

      {/* Corner peel curl shadow */}
      <div
        className={styles.curlShadow}
        style={{
          opacity: progress * 0.8,
          bottom: `${(1 - originY) * 100}%`,
          [direction === "right" ? "right" : "left"]: 0,
          width: `${progress * 30}%`,
        }}
      />
    </div>
  );
}
