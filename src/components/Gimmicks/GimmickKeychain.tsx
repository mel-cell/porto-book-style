"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import s from "./GimmickKeychain.module.css";

interface Props {
  className?: string;
}

export default function GimmickKeychain({ className }: Props) {
  return (
    <motion.div 
      className={`${s.container} ${className}`}
      drag
      dragConstraints={{ left: -10, right: 10, top: -10, bottom: 10 }}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
    >
      {/* THE KEY (Underneath) */}
      <motion.div 
        className={s.key}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image 
            src="/img/thekey.png" 
            alt="Heart Key" 
            fill 
            sizes="80px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </motion.div>

      {/* THE CAT (Overlapping) */}
      <motion.div 
        className={s.cat}
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
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image 
            src="/img/rin-catkey.png" 
            alt="Clinging Cat" 
            fill 
            sizes="110px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
