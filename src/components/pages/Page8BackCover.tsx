"use client";

import { motion } from "framer-motion";

export default function Page8BackCover() {
  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)]"
      data-page="8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">
        08
      </div>

      <div className="absolute top-[15%] left-10 right-10 rotate-[-4deg] z-0 opacity-50">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="font-zeyada text-[2.5rem] leading-[1.2] text-center text-[var(--text-primary)]"
        >
          Fin.<br/>Or maybe just the beginning...
        </motion.p>
      </div>

      <div className="absolute top-[40%] left-[10%] right-[10%] -rotate-2 z-0 opacity-40">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="font-rough text-[2rem] leading-none text-center text-red-900/60 mix-blend-multiply"
        >
          DO NOT DELETE
        </motion.p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-end pb-32 px-10 relative z-10">
        <div className="p-8 border-2 border-[var(--text-muted)] opacity-20 relative">
           <h3 className="m-0 text-[10px] tracking-[0.5em] font-mono text-[var(--text-primary)]">
             CLASSIFIED
           </h3>
           <div className="absolute -top-4 -right-6 font-brush text-3xl opacity-60 text-red-900 transform rotate-[15deg]">
             X
           </div>
        </div>
      </div>

      <div className="absolute bottom-[4.5rem] left-10 right-10 rotate-1 z-0 opacity-30">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="font-handwrite text-xl leading-snug text-center text-[var(--text-secondary)]"
        >
          Signing off,<br/>Melvin.
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between font-mono text-[7px] text-[var(--text-muted)] opacity-40 mt-4 border-t border-black/10 pt-2">
        <span>{"// CASE_FILE_TERMINATED"}</span>
        <span>2026.04.24</span>
      </div>

      {/* Book fold effect shadow */}
      <div className="absolute inset-y-0 left-0 w-6 bg-[linear-gradient(to_right,rgba(0,0,0,0.04),transparent)] pointer-events-none z-10" />
    </motion.div>
  );
}
