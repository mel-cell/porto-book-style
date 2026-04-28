"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -12, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] }
  }
};

export default function Page7() {
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

      {/* Decorative handwriting / diary content to fill space */}
      <div className="absolute top-16 left-12 right-12 z-0 opacity-60 pointer-events-none">
        <div className="relative">
          {/* Subtle ink blot/highlight behind text */}
          <div className="absolute -inset-2 bg-[#f0e6d2]/30 blur-2xl rounded-full -z-10" />
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="font-handwrite text-2xl leading-relaxed text-[var(--text-secondary)] tracking-wider transform -rotate-1"
          >
            Everything here is built not just with code, but with pieces of memory scattered across late nights. If you resonate with this, let&apos;s explore possibilities together...
          </motion.p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-10 relative z-10 pt-24">
        {/* Refined Header */}
        <div className="relative mb-10">
          <span className="font-mono text-[10px] tracking-[0.35em] text-[var(--text-muted)] uppercase font-semibold relative z-10">
            ESTABLISH CONNECTION
          </span>
          <div className="absolute -bottom-1.5 left-0 w-full h-2.5 bg-yellow-400/15 -rotate-1 z-0 shadow-[0_0_10px_rgba(250,204,21,0.1)]" />
        </div>
        
        <div className="flex flex-col gap-6 w-full max-w-[260px]">
          {/* Taped Label Style Link 1 */}
          <motion.a 
            href="https://github.com/mel-cell" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-between no-underline" 
            variants={linkVariants}
          >
            {/* "Tape" effect */}
            <div className="absolute -top-3 left-[15%] w-12 h-6 bg-[#e3dec6]/50 shadow-sm opacity-70 -rotate-3 z-20 pointer-events-none border-x border-black/5" 
                 style={{ clipPath: 'polygon(2% 0%, 98% 2%, 100% 95%, 95% 100%, 5% 98%, 0% 92%)' }} />
            
            <div className="w-full bg-white/40 backdrop-blur-[2px] border border-black/10 py-4 px-6 shadow-[2px_2px_15px_rgba(0,0,0,0.02)] group-hover:bg-white/80 group-hover:shadow-[4px_10px_20px_rgba(0,0,0,0.05)] group-hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-[var(--text-primary)] font-bold text-[11px] tracking-tight">GITHUB</span>
                <span className="text-[var(--text-muted)] text-[9px] group-hover:text-[var(--text-secondary)] transition-colors">{"// mel-cell"}</span>
              </div>
            </div>
          </motion.a>

          {/* Taped Label Style Link 2 */}
          <motion.a 
            href="https://www.linkedin.com/in/maulidani-brian-melvino-38067133b/" 
            className="group relative flex items-center justify-between no-underline" 
            variants={linkVariants}
          >
            <div className="absolute -bottom-3 right-[10%] w-14 h-6 bg-[#e3dec6]/60 shadow-sm rotate-6 z-20 pointer-events-none border-x border-black/5" 
                 style={{ clipPath: 'polygon(1% 4%, 95% 0%, 100% 88%, 92% 100%, 8% 95%, 0% 10%)' }} />
            
            <div className="w-full bg-[#f9f9f9]/80 border border-black/10 py-4 px-6 shadow-[2px_2px_15px_rgba(0,0,0,0.02)] group-hover:bg-black group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-500">
              <div className="flex justify-between items-baseline font-mono">
                <span className="group-hover:text-white transition-colors font-bold text-[11px] tracking-tight text-[var(--text-primary)]">LINKEDIN</span>
                <span className="group-hover:text-white/40 transition-colors text-[9px] text-[var(--text-muted)]">{"// MELVIN"}</span>
              </div>
            </div>
          </motion.a>

          {/* Taped Label Style Link 3 */}
          <motion.a 
            href="mailto:contact@melvin.com" 
            className="group relative flex items-center justify-between no-underline" 
            variants={linkVariants}
          >
             <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-5 h-10 bg-[#e3dec6]/40 shadow-sm -rotate-[15deg] z-20 pointer-events-none border-y border-black/5" 
                 style={{ clipPath: 'polygon(5% 2%, 92% 0%, 100% 95%, 88% 100%, 0% 92%, 4% 8%)' }} />

            <div className="w-full bg-white/40 border border-black/10 py-4 px-6 shadow-[2px_2px_15px_rgba(0,0,0,0.02)] group-hover:border-black/40 group-hover:translate-x-1 group-hover:bg-white/90 transition-all duration-300">
              <div className="flex justify-between items-baseline font-mono">
                <span className="text-[var(--text-primary)] font-bold text-[11px] tracking-tight">EMAIL</span>
                <span className="text-[var(--text-muted)] text-[9px]">{"// SEND_SIGNAL"}</span>
              </div>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Decorative Scribbles with better organic placement */}
      <div className="absolute bottom-24 right-10 z-0 opacity-50 pointer-events-none transform rotate-3">
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
           animate={{ opacity: 1, scale: 1, rotate: 3 }}
           transition={{ delay: 1, duration: 1 }}
        >
          <span className="font-zeyada text-[3.2rem] text-[var(--text-secondary)] mix-blend-multiply block leading-none">
            Let&apos;s talk!
          </span>
          <div className="w-28 h-[1.5px] bg-black/10 -mt-2 -rotate-2" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 left-12 z-0 opacity-20 pointer-events-none rotate-[-12deg]">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="font-scrawl text-6xl text-[var(--text-secondary)]"
        >
          ... ?
        </motion.span>
      </div>

      <div className="absolute bottom-8 left-10 right-10 flex justify-between font-mono text-[7px] text-[var(--text-muted)] opacity-40">
        <span>© MMXXVI // MELVIN</span>
        <span>EOF // END OF FILE</span>
      </div>

      {/* Book fold effect shadow */}
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/[0.04] to-transparent pointer-events-none z-10" />
    </motion.div>
  );
}
