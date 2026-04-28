"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BookCover from "./BookCover";
import BookSpread from "./BookSpread";
import PenIllustration from "./PenIllustration";

type AppState = "cover" | "opening" | "open" | "closing";

export default function BookScene() {
  const [appState, setAppState] = useState<AppState>("cover");
  const [isCVOpen, setIsCVOpen] = useState(false);

  const handleOpen = () => {
    setAppState("opening");
    setTimeout(() => setAppState("open"), 800);
  };

  const handleClose = () => {
    setIsCVOpen(false);
    setAppState("closing");
    setTimeout(() => setAppState("cover"), 700);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background remains sharp at all times - Animate gradient center when CV opens */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ 
          background: isCVOpen 
            ? "radial-gradient(ellipse 80% 70% at 35% 40%, #f8f6f2 0%, #ece9e2 100%)" 
            : "radial-gradient(ellipse 80% 70% at 50% 40%, #f8f6f2 0%, #ece9e2 100%)"
        }}
        transition={{ type: "spring", damping: 24, stiffness: 100 }}
      />

      {/* Floating Pen Illustration ... */}
      <motion.div
        className="absolute top-1/2 left-1/2 h-[clamp(380px,45vh,600px)] w-auto pointer-events-none z-[5] hidden lg:block"
        initial={{ opacity: 0, x: "calc(var(--book-width) * -0.5 - 15vw)", y: "-50%", rotate: -60 }}
        animate={{ 
          opacity: 1, 
          x: (appState === "cover" || appState === "closing") 
                ? "calc(var(--book-width) * -0.5 - 6vw)"  
                : isCVOpen 
                  ? "calc(var(--book-width) * -1 - 250px - 8vw)" // Follow the book slide
                : "calc(var(--book-width) * -1 - 8vw)",   
          y: "-50%", 
          marginTop: ["0px", "-20px", "0px"],
          rotate: (appState === "cover" || appState === "closing") ? -15 : isCVOpen ? -10 : -16, 
        }}
        transition={{ 
          opacity: { duration: 1 },
          rotate: { duration: 1, ease: "easeInOut" },
          x: { type: "spring", damping: 24, stiffness: 100 },
          marginTop: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <PenIllustration style={{ height: "100%", width: "auto" }} />
      </motion.div>

      <AnimatePresence mode="wait">
        {(appState === "cover" || appState === "closing") && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              rotateY: -12,
              x: -40,
              transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <BookCover onOpen={handleOpen} />
          </motion.div>
        )}

        {(appState === "open" || appState === "opening") && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, scale: 0.88, rotateX: 8 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              transition: { duration: 0.4 } 
            }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformPerspective: 1600 }}
          >
            <BookSpread 
              onClose={handleClose} 
              isCVOpen={isCVOpen}
              setIsCVOpen={setIsCVOpen}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
