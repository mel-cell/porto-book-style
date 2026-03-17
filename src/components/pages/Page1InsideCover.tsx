"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import coverStyles from "./Page1InsideCover.module.css";

// Animation Variants for enter sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1, // 1 second delay when the book opens
      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 12 } 
  },
};

export default function Page1InsideCover() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      className={styles.page} 
      data-page="1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
        <div className={styles.pageNumber}>01</div>
        
        {/* Document Background Layout */}
        <motion.div className={coverStyles.documentLayer} variants={itemVariants}>
          <div className={coverStyles.docHeaderTop}>
            <span>17-MAR-2026 13:00</span>
            <span>FROM: SYS_ADMIN</span>
            <span>ID: MEL-CELL</span>
          </div>
          
          <h1 className={coverStyles.docTitle}>MELVIN PORTFOLIO</h1>
          
          <div className={coverStyles.docMeta}>
            <p>SOFTWARE ENGINEER - DEVOPS ENTHUSIAST - MALANG, ID</p>
            <p>STATUS: ONLINE - ENCRYPTED HTTP - CONNECTION NO.7490</p>
          </div>

          <h3 className={coverStyles.docSub}>Not in our name...</h3>

          <div className={coverStyles.docBody}>
            <p>
              This serves as an introduction document and a visual representation of my work. The ideas, code, and systems developed herein represent a commitment to robust architecture and raw, authentic design.
            </p>
            <p>
              If you would like to join us in this, we will be devoting as much space as is needed in our upcoming projects. This is not an ordinary technical showcase. We need to do this immediately and publish as soon as we can.
            </p>
            <p>
              The brief is absolutely free; let us build something remarkable together. We suggest bringing your ideas in whatever way you want to.
            </p>
          </div>

          {/* Brutal overlays */}
          <div className={coverStyles.hwOverlay}>
            <span className={coverStyles.hwLine}>MELVIN</span>
            <span className={coverStyles.hwLine}>WEB DEV</span>
            <span className={coverStyles.hwLine}>DEVOPS PUNK</span>
          </div>
        </motion.div>

        <div className={coverStyles.polaroidContainer}>

          {/* Wrapper controls the initial entrance drop */}
          <motion.div className={coverStyles.polaroidWrapper} variants={itemVariants}>
            
            {/* Paperclip that lifts up independently of the photo flipping  */}
            <motion.svg 
              className={coverStyles.paperclip} 
              viewBox="0 0 32 85" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, y: -20, rotate: 15 }}
              animate={{ 
                opacity: 1,
                y: isFlipped ? -80 : 0,    // Terbang tinggi banget
                x: isFlipped ? 50 : 0,     // Geser jauh
                rotate: isFlipped ? 45 : 15 // Miring
              }}
              transition={{ type: "spring", stiffness: 90, damping: 10 }}
            >
              <path d="M16 80C8.8203 80 3 74.1797 3 67V22C3 16.4772 7.47715 12 13 12C18.5228 12 23 16.4772 23 22V63C23 66.3137 20.3137 69 17 69C13.6863 69 11 66.3137 11 63V26" stroke="#444" strokeWidth="4" strokeLinecap="round" />
            </motion.svg>

            <motion.div
              className={coverStyles.polaroidInner}
              whileHover={{ scale: 1.05 }}
              animate={{ rotateY: isFlipped ? 180 : -5, rotateZ: isFlipped ? 0 : -3 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              onClick={() => setIsFlipped(!isFlipped)}
              style={{ transformStyle: "preserve-3d" }} // <-- WAJIB: Biar belakangnya (tanggal) gak tembus hilang!
            >
              {/* Front of Photo */}
              <div className={coverStyles.polaroidFront}>
                {/* Masking Tape in the center top */}
                <div className={coverStyles.maskingTape}></div>

                <div className={coverStyles.imageWrapper}>
                  <Image 
                    src="/img/image.png" 
                    alt="Melvin" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className={coverStyles.styledImage} 
                  />
                </div>
              </div>

              {/* Back of Photo */}
              <div className={coverStyles.polaroidBack}>
                <span className={coverStyles.dateText}>21 - 3 - 2009</span>
              </div>
            </motion.div>
            
            <motion.span 
              className={coverStyles.titleHint}
              animate={{ opacity: isFlipped ? 0 : 1 }} // Biar gak hilang tiba2, tapi pudar
            >
              click to flip
            </motion.span>
          </motion.div>

        </div>
      </motion.div>
  );
}
