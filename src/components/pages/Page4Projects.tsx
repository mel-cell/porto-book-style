"use client";

import { motion, Variants } from "framer-motion";
import Page4Marginalia from "@/components/Gimmicks/Page4Marginalia";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Page4Projects() {
  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-6 after:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10" 
      data-page="4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-6 right-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none z-10">04</div>

      {/* TECHNICAL MARGINALIA & ARCHIVE DETAIL */}
      <Page4Marginalia />

      <div className="flex-1 flex flex-col p-12 pr-16 justify-center">
        <h2 className="font-sans text-[clamp(1.2rem,3vw,1.8rem)] font-[900] tracking-tighter uppercase mb-8 border-b-2 border-black/5 pb-2 text-[var(--text-primary)]">
          TECK STACK OR WHAT ?
        </h2>

        {/* --- MANUAL LIST ITEMS FOR PRECISION --- */}
        <div className="flex flex-col gap-1 w-full max-w-[600px]">
          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '0rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">TypeScript / ES6+ Development</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">08</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '3.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Laravel Framework / Ecosystem</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">15</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '6rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Modern PHP 8.4 Engine</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">22</span>
          </motion.div>

          {/* ... keeping the same manual structure for all items as per original design ... */}
          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '8.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Next.js 14 / App Router</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">29</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '10.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">React / Framer Motion UI</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">36</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '11.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Node.js / Express Services</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">41</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '12.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Docker Containerization</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">55</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '13.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">AWS Cloud Architecture</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">62</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '14rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Linux / System Admin</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">74</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '12.5rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Unit Testing / Jest / Pest</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">116</span>
          </motion.div>

          <motion.div className="flex items-center gap-2" style={{ paddingLeft: '8rem' }} variants={itemVariants}>
            <span className="font-mono text-[clamp(9px,2vw,12px)] tracking-[0.1em] text-[var(--text-secondary)] whitespace-nowrap uppercase">Scalable Infrastructure</span>
            <div className="flex-1 border-b border-dotted border-black/10 mt-1"></div>
            <span className="font-mono text-[clamp(9px,2vw,12px)] text-[var(--text-muted)]">144</span>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
