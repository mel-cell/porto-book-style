"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BookCover from "./BookCover";
import BookSpread from "./BookSpread";
import PenIllustration from "./PenIllustration";
import styles from "./BookScene.module.css";

type AppState = "cover" | "opening" | "open" | "closing";

interface BookSceneProps {
  isBlurred?: boolean;
}

export default function BookScene({ isBlurred = false }: BookSceneProps) {
  const [appState, setAppState] = useState<AppState>("cover");

  const handleOpen = () => {
    setAppState("opening");
    setTimeout(() => setAppState("open"), 800);
  };

  const handleClose = () => {
    setAppState("closing");
    setTimeout(() => setAppState("cover"), 700);
  };

  return (
    <div className={styles.scene}>
      {/* Background remains sharp at all times */}
      <div className={styles.bg} />

      {/* Floating Pen Illustration on the left (Hides on Mobile via CSS) */}
      <motion.div
        className={styles.pen}
        initial={{ opacity: 0, x: "calc(var(--book-width) * -0.5 - 15vw)", y: "-50%", rotate: -60 }}
        animate={{ 
          opacity: 1, 
          x: (appState === "cover" || appState === "closing") 
                ? "calc(var(--book-width) * -0.5 - 6vw)"  // Dekat dengan buku yang tertutup
                : "calc(var(--book-width) * -1 - 8vw)",   // Menjauh / geser ke samping saat buku dibuka
          y: "-50%", 
          marginTop: ["0px", "-20px", "0px"], // Efek mengambang (floating loop)
          rotate: (appState === "cover" || appState === "closing") ? -15 : -22, 
          filter: isBlurred ? "blur(32px)" : "blur(0px)" 
        }}
        transition={{ 
          opacity: { duration: 1 },
          filter: { duration: 1.2 },
          rotate: { duration: 1, ease: "easeInOut" },
          x: { duration: 1, ease: "easeInOut" },
          marginTop: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <PenIllustration style={{ height: "100%", width: "auto" }} />
      </motion.div>

      <AnimatePresence mode="wait">
        {(appState === "cover" || appState === "closing") && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(32px)" }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              filter: isBlurred ? "blur(32px)" : "blur(0px)" 
            }}
            exit={{
              opacity: 0,
              scale: 0.88,
              rotateY: -12,
              x: -40,
              filter: "blur(0px)",
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
            initial={{ opacity: 0, scale: 0.88, rotateX: 8, filter: "blur(32px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              filter: isBlurred ? "blur(32px)" : "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.9, 
              filter: "blur(0px)",
              transition: { duration: 0.4 } 
            }}
            transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformPerspective: 1600 }}
          >
            <BookSpread onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
