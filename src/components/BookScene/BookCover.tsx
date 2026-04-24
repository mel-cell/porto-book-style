"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BookCoverProps {
  onOpen: () => void;
}

export default function BookCover({ onOpen }: BookCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring-ify for smoothness
  const springConfig = { stiffness: 150, damping: 20, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  // Shine effect pos
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  // Shadow offset
  const shadowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const shadowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center gap-8 select-none"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Ambient glow underneath */}
      <motion.div
        className="absolute w-[260px] h-[60px] bottom-[-10px] left-1/2 -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,0,0,0.25)_0%,transparent_70%)] blur-[18px] pointer-events-none z-0"
        style={{ x: shadowX, y: shadowY }}
      />

      {/* Floating animation wrapper */}
      <motion.div
        className="relative z-[1]"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Tilt wrapper */}
        <motion.div
          ref={containerRef}
          className="cursor-pointer preserve-3d relative"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={onOpen}
          whileTap={{ scale: 0.97 }}
        >
          {/* Book body */}
          <div className="flex relative w-[var(--book-width)] h-[var(--book-height)] preserve-3d">
            {/* Spine */}
            <div className="absolute -left-6 top-0 w-6 h-full bg-[linear-gradient(to_right,#050505,#1a1a1a)] rounded-l-[2px] flex items-center justify-center origin-right -rotate-y-90 -translate-x-[12px] preserve-3d">
              <span className="[writing-mode:vertical-rl] [text-orientation:mixed] rotate-180 text-[9px] font-medium tracking-[0.35em] text-[#555] font-mono whitespace-nowrap">
                MELVIN • 2026
              </span>
            </div>

            {/* Cover face */}
            <div className="relative w-full h-full bg-[#050505] rounded-r-[3px] overflow-hidden shadow-[4px_0_0_rgba(255,255,255,0.04),-2px_0_8px_rgba(0,0,0,0.8),8px_14px_40px_rgba(0,0,0,0.6),2px_4px_12px_rgba(0,0,0,0.5)]">
              {/* Layered backgrounds (Brush + Star) */}
              <div className="absolute -inset-[10%] w-[120%] h-[120%] opacity-40 pointer-events-none z-[1]">
                <Image 
                  src="/img/kuaskasar.png" 
                  alt="brush texture" 
                  fill 
                  className="object-cover invert contrast-[1.1] mix-blend-screen"
                  priority
                />
                <Image 
                  src="/img/star.png" 
                  alt="star" 
                  fill 
                  className="object-contain object-right -mt-[10%] p-[5%] invert contrast-[5] brightness-[1.5] mix-blend-screen opacity-100"
                  priority
                />
              </div>

              {/* Shine overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: useTransform(
                    [shineX, shineY],
                    ([x, y]) =>
                      `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`
                  ),
                }}
              />

              {/* Content */}
              <div className="relative z-[5] p-10 h-full flex flex-col">
                <div className="flex items-center gap-2 text-[9px] font-medium tracking-[0.22em] text-[#555] font-mono uppercase">
                  <span className="w-[5px] h-[5px] rounded-full bg-white opacity-70" />
                  MEL-CELL ARCHIVE
                </div>

                <div className="mt-auto flex flex-col gap-5">
                  {/* Chaotic name letters */}
                  <div className="flex items-center text-[clamp(2.1rem,5vw,3.5rem)] leading-[0.8] text-white -ml-[5px]">
                    <motion.span 
                      className="font-rough"
                      style={{ rotate: -8, scale: 1.1, display: 'inline-block' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >M</motion.span>
                    <motion.span 
                      className="font-zeyada"
                      style={{ rotate: 12, x: -5, display: 'inline-block' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >e</motion.span>
                    <motion.span 
                      className="font-scrawl"
                      style={{ rotate: -5, x: -2, scale: 0.9, display: 'inline-block' }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >l</motion.span>
                    <motion.span 
                      className="font-rough"
                      style={{ rotate: 7, x: -8, display: 'inline-block' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                    >v</motion.span>
                    <motion.span 
                      className="font-zeyada"
                      style={{ rotate: -15, x: -12, scale: 1.2, display: 'inline-block' }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1.2 }}
                      transition={{ delay: 1.5 }}
                    >i</motion.span>
                    <motion.span 
                      className="font-scrawl"
                      style={{ rotate: 4, x: -15, display: 'inline-block' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >n</motion.span>
                  </div>
                </div>

                <div className="my-[1.5rem] h-[1px] bg-[linear-gradient(to_right,#333,transparent)] w-[55%]" />
                
                {/* Grid lines kept at low opacity */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />
              </div>

              {/* Page edge effect (right side) */}
              <div className="absolute -right-[5px] top-[1px] bottom-[1px] w-[5px] flex flex-col overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-[#e8e4dc]' : 'bg-[#f0ede5]'} border-r border-black/10`} />
                ))}
              </div>
            </div>
          </div>

          {/* Shadow under book */}
          <motion.div
            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-3/4 h-5 bg-[radial-gradient(ellipse,rgba(0,0,0,0.35)_0%,transparent_70%)] blur-[6px] pointer-events-none"
            style={{ x: shadowX, scaleX: useTransform(mouseX, [-0.5, 0.5], [0.85, 1.15]) }}
          />
        </motion.div>
      </motion.div>

      {/* Hint text */}
      <motion.p
        className="text-[10px] font-mono tracking-[0.15em] text-[#999] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        Click to begin
      </motion.p>
    </motion.div>
  );
}
