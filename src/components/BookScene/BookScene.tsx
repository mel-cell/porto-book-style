"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import BookCover from "./BookCover";
import BookSpread from "./BookSpread";
import styles from "./BookScene.module.css";

type AppState = "cover" | "opening" | "open" | "closing";

export default function BookScene() {
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
      <div className={styles.bg} />

      <AnimatePresence mode="wait">
        {(appState === "cover" || appState === "closing") && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.88,
              rotateY: -12,
              x: -40,
              transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <BookCover onOpen={handleOpen} />
          </motion.div>
        )}

        {(appState === "open" || appState === "opening") && (
          <motion.div
            key="spread"
            initial={{ opacity: 0, scale: 0.88, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
            transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformPerspective: 1600 }}
          >
            <BookSpread onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
