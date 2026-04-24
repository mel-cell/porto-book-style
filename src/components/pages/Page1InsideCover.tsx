"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8
    },
  }
};

export default function Page1InsideCover() {
  return (
    <motion.div
      className="w-full h-full relative bg-[#0a0a0a] flex flex-col overflow-hidden text-white after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-6 after:bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10" 
      data-page="1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="relative w-full h-full max-w-[80%] max-h-[80%]">
          <Image 
            src="/img/bla3.png" 
            alt="Inside Cover Illustration" 
            fill 
            className="object-contain invert brightness-200"
            sizes="50vw"
            priority
          />
        </div>
      </div>
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-white/50 opacity-50 select-none">01</div>
    </motion.div>
  );
}
