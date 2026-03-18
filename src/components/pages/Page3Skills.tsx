"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";
import s from "./Page3Skills.module.css";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0, // Animate together
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "linear" } 
  },
};

export default function Page3Skills() {
  return (
    <motion.div
      className={styles.page}
      data-page="3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className={styles.pageNumber} variants={itemVariants}>03</motion.div>

      <div className={s.pageContainer}>
        {/* ── TOP META ── */}
        <motion.div className={s.topMeta} variants={itemVariants}>
          <span className={s.monthLabel}>INTRODUCTION</span>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className={s.columnsGrid}>

          {/* LEFT – formal typed prose */}
          <motion.div className={s.leftColumn} variants={itemVariants}>
            <div className={s.novelBody}>
              <p>
                My name is Melvin — a software engineer and DevOps enthusiast
                based in Malang, Indonesia. I build systems that breathe: from
                expressive user interfaces to the pipelines that keep them alive.
              </p>
              <p>
                The digital world is built on layers of abstraction hidden
                behind polished surfaces. Underneath there lies raw, complex
                machinery. This is where I find my purpose.
              </p>
              <p>
                Whether crafting a micro-interaction or architecting a
                deployment strategy, I approach every problem with the
                same question — not just <em>how</em> it works,
                but <em>why</em> it matters.
              </p>
              <p>
                Status: <strong>online</strong> — encrypted — building in public.
              </p>
            </div>
          </motion.div>

          {/* RIGHT – abstract scrawl image */}
          <motion.div className={s.rightColumn} variants={itemVariants}>
            <Image
              src="/img/abstractext.png"
              alt="abstract handwriting"
              fill
              className={s.abstractImage}
              sizes="30vw"
              priority
            />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
