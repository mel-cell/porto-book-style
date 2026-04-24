"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.15, // Let's keep a small stagger for page 2 as requested before
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

export default function Page2Intro() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCardOut, setIsCardOut] = useState(false);

  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-6 after:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10" 
      data-page="2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <div className="absolute top-6 right-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">02</div>
        
        <motion.div className="absolute inset-0 w-full h-full p-12 z-[1] flex flex-col pointer-events-none" variants={itemVariants}>
          <div className="flex justify-between font-serif text-[0.65rem] text-[var(--text-secondary)] uppercase mb-8 tracking-[0.1em] opacity-80">
            <span>17-MAR-2026 13:00</span>
            <span>FROM: SYS_ADMIN</span>
            <span>ID: MEL-CELL</span>
          </div>
          
          <h1 className="font-sans text-[clamp(2.5rem,6vw,4rem)] mt-8 font-[800] text-center tracking-[0.02em] leading-[0.9] mb-4 text-[var(--text-primary)] scale-y-[1.1]">MELVIN PORTFOLIO</h1>
          
          <div className="font-mono text-[0.5rem] text-center tracking-[0.1em] mb-6 text-[var(--text-secondary)] leading-[1.6]">
            <p>SOFTWARE ENGINEER - DEVOPS ENTHUSIAST - MALANG, ID</p>
            <p>STATUS: ONLINE - ENCRYPTED HTTP - CONNECTION NO.7490</p>
          </div>

          <h3 className="font-serif text-[1.1rem] font-[600] mb-2 px-4 whitespace-nowrap">Not in our name...</h3>

          <div className="font-serif text-[0.75rem] leading-[1.6] text-[var(--text-secondary)] text-justify px-4">
            <p className="mb-2">
              This serves as an introduction document and a visual representation of my work. The ideas, code, and systems developed herein represent a commitment to robust architecture and raw, authentic design.
            </p>
            <p className="mb-2">
              If you would like to join us in this, we will be devoting as much space as is needed in our upcoming projects. This is not an ordinary technical showcase. We need to do this immediately and publish as soon as we can.
            </p>
            <p className="mb-2">
              The brief is absolutely free; let us build something remarkable together. We suggest bringing your ideas in whatever way you want to.
            </p>
          </div>

          <div className="absolute top-[36%] left-[8%] w-full z-[2] flex flex-col gap-0 pointer-events-none">
            <span className="font-brush text-[3.5rem] text-[#0a0a0a]/95 leading-[0.85] -rotate-3 [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)]">MELVIN</span>
            <span className="font-brush text-[3.8rem] text-[#0a0a0a]/95 leading-[0.85] -rotate-1 ml-8 [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)]">WEB DEV</span>
            <span className="font-brush text-[4.5rem] text-[#0a0a0a]/95 leading-[0.85] -rotate-5 -ml-4 [text-shadow:1px_1px_4px_rgba(0,0,0,0.1)] opacity-95">DEVOPS CHASO</span>
          </div>
        </motion.div>

        <div className="absolute top-[40%] left-0 w-full h-auto flex flex-col items-center justify-start perspective-[1200px] z-[5] translate-x-[15%] pointer-events-none">
          <motion.div className="relative w-[200px] h-[250px] perspective-[1200px] preserve-3d pointer-events-auto" variants={itemVariants}>
            <motion.svg 
              className="absolute -top-[11%] right-[26px] w-[23px] h-auto z-[15] rotate-[15deg] pointer-events-none filter drop-shadow-[2px_3px_2px_rgba(0,0,0,0.2)]" 
              viewBox="0 0 32 85" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, y: -20, rotate: 15 }}
              animate={{ 
                opacity: 1,
                y: isFlipped ? -60 : 0,
                x: isFlipped ? 20 : 0,
                rotate: isFlipped ? 45 : 15
              }}
              transition={{ type: "spring", stiffness: 60, damping: 12 }}
            >
              <path d="M16 80C8.8203 80 3 74.1797 3 67V22C3 16.4772 7.47715 12 13 12C18.5228 12 23 16.4772 23 22V63C23 66.3137 20.3137 69 17 69C13.6863 69 11 66.3137 11 63V26" stroke="#444" strokeWidth="4" strokeLinecap="round" />
            </motion.svg>

            <motion.div 
               className="absolute inset-0 bg-[#fdfdfd] border border-black/10 z-[1] cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.1)] pointer-events-auto"
               style={{
                 backgroundImage: `repeating-linear-gradient(rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 100%), repeating-linear-gradient(90deg, rgba(0,0,0,0.01) 0, rgba(0,0,0,0.01) 1px, transparent 1px, transparent 100%)`,
                 backgroundSize: '3px 3px'
               }}
               initial={false}              
               animate={{ 
                 x: isCardOut ? -50 : -130 ,
                 y: isCardOut ? 30 : 55,
                 rotate: isCardOut ? -20 : 6 
               }}
               transition={{ type: "spring", stiffness: 100, damping: 20 }}
               onClick={(e) => {
                 e.stopPropagation();
                 setIsCardOut(!isCardOut);
               }}
            />

            <motion.div
              className="relative w-[190px] h-[240px] preserve-3d cursor-pointer shadow-[0_8px_25px_rgba(0,0,0,0.15)] z-[2]"
              whileHover={{ scale: 1.05 }}
              animate={{ rotateY: isFlipped ? 180 : -5, rotateZ: isFlipped ? 0 : -8 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 backface-hidden bg-white p-[12px_12px_48px_12px] flex flex-col border border-black/10 z-[2] rotate-y-0 preserve-3d">
                <div 
                   className="absolute -top-[12px] left-1/2 -ml-[55px] rotate-[-4deg] w-[110px] h-[30px] bg-[#e3dec6]/90 z-10 shadow-[0_1px_3px_rgba(0,0,0,0.1),inset_0_0_4px_rgba(0,0,0,0.05)] mix-blend-multiply pointer-events-none"
                   style={{ clipPath: 'polygon(1% 4%, 2% 2%, 4% 6%, 6% 1%, 95% 3%, 97% 5%, 98% 1%, 100% 4%, 99% 96%, 98% 99%, 95% 95%, 94% 98%, 4% 97%, 3% 99%, 1% 95%, 0% 98%)' }}
                />
                <div className="relative w-full h-full bg-black overflow-hidden pointer-events-none">
                    <Image 
                      src="/img/image.png" 
                      alt="Melvin" 
                      fill 
                      priority
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover opacity-90 grayscale-[0.8] contrast-[1.2]" 
                    />
                </div>
              </div>

              <div className="absolute inset-0 backface-hidden bg-[#fdfdfa] border border-black/10 z-[1] rotate-y-180 flex flex-col items-start p-8 preserve-3d">
                <span className="font-handwrite text-[1.2rem] text-[var(--text-secondary)] -rotate-10 opacity-80 whitespace-nowrap">21 - 3 - 2009</span>
              </div>
            </motion.div>
            
            <motion.span className="absolute -bottom-[30px] left-[-40%] -translate-x-1/2 font-handwrite text-[1.2rem] text-[var(--text-muted)] whitespace-nowrap leading-tight">
              im so tired.. <br />
              do you?
            </motion.span>
          </motion.div>
        </div>
    </motion.div>
  );
}
