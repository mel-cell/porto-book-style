"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  className?: string;
}

export default function GimmickKeychain({ className }: Props) {
  return (
    <motion.div 
      className={`absolute top-[60vh] -left-[160px] w-24 h-auto z-[100] cursor-grab active:cursor-grabbing ${className}`}
      drag
      dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
    >
      {/* THE KEY (Underneath) */}
      <motion.div 
        className="absolute w-20 h-auto top-0 left-0 drop-shadow-[5px_8px_12px_rgba(0,0,0,0.35)]"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div className="relative w-full aspect-[2/5]">
          <Image 
            src="/img/thekey.png" 
            alt="Heart Key" 
            fill 
            sizes="80px"
            className="object-contain"
            priority
            quality={90}
          />
        </div>
      </motion.div>

      {/* THE CAT (Overlapping) */}
      <motion.div 
        className="absolute w-[6.8rem] h-auto top-[0.6rem] left-[-2.2rem] drop-shadow-[15px_15px_15px_rgba(0,0,0,0.25)]"
        animate={{ 
          rotate: [0, -3, 0, 3, 0],
          y: [0, 2, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3.5, 
          ease: "easeInOut",
          delay: 0.5 
        }}
      >
        <div className="relative w-full aspect-square">
          <Image 
            src="/img/rin-catkey.png" 
            alt="Clinging Cat" 
            fill 
            sizes="110px"
            className="object-contain"
            priority
            quality={90}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
