"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
      className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-6 after:bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10"
      data-page="3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none" variants={itemVariants}>03</motion.div>

      <div className="flex-1 flex flex-col p-12 relative h-full">
        {/* ── TOP META ── */}
        <motion.div className="flex justify-between items-center mb-8 pb-4 border-b border-black/5" variants={itemVariants}>
          <span className="font-mono text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase font-medium">INTRODUCTION</span>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-[1.2fr_1fr] gap-8 h-full">

          {/* LEFT – formal typed prose */}
          <motion.div className="flex flex-col" variants={itemVariants}>
            <div className="font-serif text-[clamp(9px,1.2vw,12px)] leading-[1.8] text-[var(--text-secondary)] text-justify pr-4">
              <p className="mb-4">
                My name is Melvin — a software engineer and DevOps enthusiast
                based in Malang, Indonesia. I build systems that breathe: from
                expressive user interfaces to the pipelines that keep them alive.
              </p>
              <p className="mb-4">
                The digital world is built on layers of abstraction hidden
                behind polished surfaces. Underneath there lies raw, complex
                machinery. This is where I find my purpose.
              </p>
              <p className="mb-4">
                Whether crafting a micro-interaction or architecting a
                deployment strategy, I approach every problem with the
                same question — not just <em className="italic opacity-80">how</em> it works,
                but <em className="italic opacity-80">why</em> it matters.
              </p>
              <p className="mt-8 font-mono text-[10px] tracking-wider uppercase">
                Status: <strong className="font-bold text-[var(--text-primary)]">online</strong> — encrypted — building in public.
              </p>
            </div>
          </motion.div>

          {/* RIGHT – abstract scrawl image */}
          <motion.div className="relative w-full h-full opacity-60 mix-blend-multiply flex items-center justify-center p-4 border-l border-black/5" variants={itemVariants}>
            <Image
              src="/img/abstractext.png"
              alt="abstract handwriting"
              fill
              className="object-contain grayscale contrast-[1.2]"
              sizes="30vw"
              priority
            />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
