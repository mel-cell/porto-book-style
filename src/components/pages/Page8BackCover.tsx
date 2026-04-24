"use client";

import { motion } from "framer-motion";

export default function Page8BackCover() {
  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)]"
      data-page="8"
    >
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">
        08
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-10">
        <div className="p-8 border-2 border-[var(--text-muted)] opacity-20">
           <h3 className="m-0 text-[10px] tracking-[0.5em] font-mono text-[var(--text-primary)]">
             CLASSIFIED
           </h3>
        </div>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between font-mono text-[7px] text-[var(--text-muted)] opacity-40">
        <span>{"// CASE_FILE_TERMINATED"}</span>
        <span>2026.04.24</span>
      </div>

      {/* Book fold effect shadow */}
      <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />
    </motion.div>
  );
}
