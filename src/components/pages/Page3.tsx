"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0, 
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

export default function Page3() {
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
        <motion.div className="flex justify-between items-center" variants={itemVariants}>
          <span className="font-mono text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase font-medium">INTRODUCTION</span>
        </motion.div>

        {/* ── MAIN GRID ── (Right side is now wider) */}
        <div className="grid grid-cols-[1.2fr_1.4fr] gap-2 h-full items-start">

          {/* LEFT – formal typed prose */}
          <motion.div className="flex flex-col pt-4" variants={itemVariants}>
            <div className="font-serif text-[clamp(9px,1.1vw,11.5px)] leading-[1.85] text-[var(--text-secondary)] text-justify pr-2">
              <p className="mb-5">
                My name is Melvin — a software engineer and DevOps enthusiast
                based in Malang, Indonesia. I build systems that breathe: from
                expressive user interfaces to the pipelines that keep them alive.
              </p>
              <p className="mb-5">
                The digital world is built on layers of abstraction hidden
                behind polished surfaces. Underneath there lies raw, complex
                machinery. This is where I find my purpose.
              </p>
              <p className="mb-5">
                Whether crafting a micro-interaction or architecting a
                deployment strategy, I approach every problem with the
                same question — not just <em className="italic opacity-80">how</em> it works,
                but <em className="italic opacity-80">why</em> it matters.
              </p>
              <div className="mt-10 font-mono text-[9px] tracking-[0.15em] uppercase leading-relaxed">
                Status: <strong className="font-bold text-[var(--text-primary)]">online</strong> <br/>
                access: <span className="opacity-60">encrypted</span> <br/>
                node: <span className="opacity-60">malang_id</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – larger abstract scrawl image */}
          <motion.div className="relative mt-[-20%] w-full h-[110%] -mt-[5%] opacity-80 mix-blend-multiply flex items-center justify-center pointer-events-none" variants={itemVariants}>
            <Image
              src="/img/abstractext.png"
              alt="abstract handwriting"
              fill
              className="object-contain grayscale contrast-[1.3]"
              sizes="50vw"
              priority
            />
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
