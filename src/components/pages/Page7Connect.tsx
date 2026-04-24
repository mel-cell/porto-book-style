"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Page7Connect() {
  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page)] flex flex-col overflow-hidden text-[var(--text-primary)]"
      data-page="7"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-6 right-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">
        07
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-10">
        <span className="font-mono text-[10px] tracking-[0.35em] text-[var(--text-muted)] uppercase font-medium mb-4">
          ESTABLISH CONNECTION
        </span>
        
        <div className="flex flex-col gap-4 w-full max-w-[240px]">
          <motion.a 
            href="#" 
            className="font-mono text-[11px] text-[var(--text-primary)] no-underline border border-black/10 py-3 px-5 flex justify-between transition-all duration-300 bg-white/40 hover:bg-[var(--text-primary)] hover:text-[var(--bg-page)] hover:translate-x-1" 
            variants={linkVariants}
          >
            GITHUB <span>{"// 0xAF"}</span>
          </motion.a>
          <motion.a 
            href="#" 
            className="font-mono text-[11px] text-[var(--text-primary)] no-underline border border-black/10 py-3 px-5 flex justify-between transition-all duration-300 bg-white/40 hover:bg-[var(--text-primary)] hover:text-[var(--bg-page)] hover:translate-x-1" 
            variants={linkVariants}
          >
            LINKEDIN <span>{"// MELVIN"}</span>
          </motion.a>
          <motion.a 
            href="#" 
            className="font-mono text-[11px] text-[var(--text-primary)] no-underline border border-black/10 py-3 px-5 flex justify-between transition-all duration-300 bg-white/40 hover:bg-[var(--text-primary)] hover:text-[var(--bg-page)] hover:translate-x-1" 
            variants={linkVariants}
          >
            EMAIL <span>{"// ECHO_LOCATION"}</span>
          </motion.a>
        </div>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between font-mono text-[7px] text-[var(--text-muted)] opacity-40">
        <span>© MMXXVI // MELVIN</span>
        <span>EOF // END OF FILE</span>
      </div>

      {/* Book fold effect shadow (Right page: shadow on right edge) */}
      <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-10" />
    </motion.div>
  );
}
