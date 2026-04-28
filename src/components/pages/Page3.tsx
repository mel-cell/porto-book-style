"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
  },
};

// Skeleton Helper for Page 3
const SkeletonPage3 = () => (
  <div className="flex flex-col gap-4 opacity-[0.15] animate-pulse py-4">
    <div className="space-y-3">
      <div className="h-2 w-full bg-black rounded-sm" />
      <div className="h-2 w-full bg-black rounded-sm" />
      <div className="h-2 w-5/6 bg-black rounded-sm" />
    </div>
    <div className="space-y-3 mt-10">
      <div className="h-2 w-full bg-black rounded-sm" />
      <div className="h-2 w-3/4 bg-black rounded-sm" />
    </div>
  </div>
);

export default function Page3() {
  const [initLoading, setInitLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-6 after:bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10"
      data-page="3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none" variants={itemVariants}>03</motion.div>

      <div className="flex-1 flex flex-col p-12 pr-6 relative h-full">
        {/* ── TOP META ── */}
        <motion.div className="flex justify-between items-center mb-7 pb-4 border-b border-black/5" variants={itemVariants}>
          <span className="font-mono text-[9px] tracking-[0.35em] text-[var(--text-muted)] uppercase font-medium">SUMMARY</span>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-[1.2fr_1.2fr] gap-4 h-full items-start">

          {/* LEFT – slimmed down content */}
          <div className="flex flex-col pt-0 max-w-[260px]">
            {initLoading ? (
              <SkeletonPage3 />
            ) : (
              <motion.div className="font-serif text-[clamp(9.5px,1.15vw,11.5px)] leading-[1.8] text-[var(--text-primary)] opacity-80 text-justify pr-4" variants={itemVariants}>
                
                {/* Section 1: Who Am I */}
                <div className="mb-4">
                  <p>
                    Saya Melvin, seorang Software Engineer yang fokus pada pengembangan solusi digital efisien dan performan. Berbasis di Malang, saya mengintegrasikan keahlian teknis untuk membangun sistem yang tangguh dari skala kecil hingga menengah.
                  </p>
                </div>

                {/* Section 2: How I Work */}
                <div className="mb-4">
                  <p>
                    Saya bekerja dengan pendekatan sistematis; mengutamakan stabilitas sistem yang bersih, automasi tugas berulang melalui DevOps, dan memastikan skalabilitas infrastruktur tetap terjaga di setiap tahapan pengembangan.
                  </p>
                </div>

                {/* Section 3: Tech Stack */}
                <div className="mb-4">
                  <p>
                    Keahlian utama saya mencakup ekosistem TypeScript (React, Next.js, Node.js) untuk pengembangan aplikasi, serta penggunaan Docker, CI/CD, dan Cloud Services untuk manajemen infrastruktur dan deployment.
                  </p>
                </div>

                <div className="mt-4 font-mono text-[8px] tracking-[0.1em] uppercase opacity-40">
                  Registry: mel-cell (Melvin) <br/>
                  Location: MALANG, ID // 112.6326° E
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT – Image Scrawl */}
          <motion.div className="relative -mt-20 -ml-2 w-[110%] h-[120%] opacity-60 mix-blend-multiply flex items-center justify-center pointer-events-none" variants={itemVariants}>
            {!initLoading && (
              <Image
                src="/img/abstractext.png"
                alt="abstract handwriting"
                fill
                className="object-contain grayscale contrast-[1.2]"
                sizes="40vw"
              />
            )}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
