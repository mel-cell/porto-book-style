"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./BookCover.module.css";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-ify for smoothness
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  // Shine effect pos
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Shadow offset
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className={styles.scene}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Ambient glow underneath */}
      <motion.div
        className={styles.ambientGlow}
        style={{ x: shadowX, y: shadowY }}
      />

      {/* Floating animation wrapper */}
      <motion.div
        className={styles.floatWrapper}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Tilt wrapper */}
        <motion.div
          ref={containerRef}
          className={styles.tiltWrapper}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onOpen}
          whileTap={{ scale: 0.97 }}
        >
          {/* Book body */}
          <div className={styles.book}>
            {/* Spine */}
            <div className={styles.spine}>
              <span className={styles.spineText}>MELVIN</span>
            </div>

            {/* Cover face */}
            <div className={styles.cover}>
              {/* Shine overlay */}
              <motion.div
                className={styles.shine}
                style={{
                  background: useTransform(
                    [shineX, shineY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
                  ),
                }}
              />

              {/* Content */}
              <div className={styles.coverContent}>
                <div className={styles.coverTag}>
                  <span className={styles.dot} />
                  WEB DEV × DEVOPS
                </div>

                <div className={styles.coverTitle}>
                  <span className={styles.coverName}>Melvin</span>
                  <span className={styles.coverSub}>Portfolio</span>
                </div>

                <div className={styles.coverDivider} />

                <div className={styles.coverCta}>
                  <span>Open to explore</span>
                  <motion.span
                    className={styles.ctaArrow}
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>

                {/* Corner decoration */}
                <div className={styles.cornerTL} />
                <div className={styles.cornerBR} />

                {/* Grid lines */}
                <div className={styles.gridLines} />
              </div>

              {/* Page edge effect (right side) */}
              <div className={styles.pageEdges}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={styles.pageEdge} />
                ))}
              </div>
            </div>
          </div>

          {/* Shadow under book */}
          <motion.div
            className={styles.bookShadow}
            style={{ x: shadowX, scaleX: useTransform(mouseX, [-0.5, 0.5], [0.85, 1.15]) }}
          />
        </motion.div>
      </motion.div>

      {/* Hint text */}
      <motion.p
        className={styles.hint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Click to open
      </motion.p>
    </motion.div>
  );
}
