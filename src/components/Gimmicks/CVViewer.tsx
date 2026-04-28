"use client";

import React, { useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CVViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVViewer({ isOpen, onClose }: CVViewerProps) {
  const cvPath = "/pdf/RESUME MAULIDANI BRIAN MELVINO.pdf";
  const id = useId();
  const docId = id.replace(/:/g, "").toUpperCase();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center pointer-events-none perspective-[2000px]">
          {/* Subtle backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/[0.04] pointer-events-auto"
            onClick={onClose}
          />

          {/* CV Floating Panel - LARGER and ROTATED RIGHT */}
          <motion.div
            initial={{ y: "100%", x: 420, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: 0, 
              x: 350, 
              opacity: 1, 
              rotateY: 15,
              scale: 1 
            }}
            exit={{ y: "100%", x: 450, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 28, stiffness: 100 }}
            style={{ transformStyle: "preserve-3d" }}
            className="relative w-[750px] h-[92vh] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.3),0_0_20px_rgba(0,0,0,0.05)] flex flex-col pointer-events-auto origin-bottom"
          >
            {/* PDF Content Area - Maximized to reduce empty space */}
            <div className="flex-1 overflow-hidden bg-white relative">
               <iframe 
                 src={`${cvPath}#toolbar=0&navpanes=0&scrollbar=0`}
                 className="w-full h-full border-none pointer-events-auto"
                 title="CV Viewer"
               />
               
               {/* Aesthetic overlays */}
               <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
               <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.03)]" />
            </div>

            {/* Float Navigation (Circular Buttons) */}
            <div className="absolute -top-14 right-2 flex items-center gap-4 z-[120]">
                <motion.a
                  href={cvPath}
                  download
                  className="w-10 h-10 rounded-full border border-black/20 bg-white/90 backdrop-blur-md text-black flex items-center justify-center transition-all hover:bg-black hover:text-white shadow-lg active:scale-95 no-underline"
                  whileHover={{ scale: 1.1, y: -2 }}
                  title="Download Resume"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </motion.a>

                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full border border-black/20 bg-white/90 backdrop-blur-md text-black flex items-center justify-center transition-all hover:bg-red-500 hover:text-white hover:border-red-500 shadow-lg active:scale-95 text-[14px]"
                  whileHover={{ scale: 1.1, y: -2 }}
                  title="Close (ESC)"
                >
                  ✕
                </motion.button>
            </div>

            {/* Corner ID Tag */}
            <div className="absolute bottom-6 left-6 font-mono text-[8px] opacity-25 uppercase tracking-[0.4em] pointer-events-none">
                VERIFIED // {docId || "INITIALIZING..."}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
