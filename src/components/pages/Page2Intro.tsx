"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";
import novelStyles from "./Page2Intro.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.8
    },
  }
};

export default function Page2Intro() {
  return (
    <motion.div 
      className={styles.page} 
      data-page="2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.pageNumber}>02</div>
      
      <div className={novelStyles.pageContainer}>
        <div className={novelStyles.chapterTitle}>Introduction</div>
        
        <div className={novelStyles.novelBody}>
          <p>
            The digital world is often built on layers of abstraction, hidden behind polished interfaces and seamless interactions. Yet, underneath the surface, there lies a raw, complex machinery that keeps the system breathing. This is where I find my purpose.
          </p>
          <p>
            My name is Melvin, a software engineer and DevOps enthusiast based in Malang, Indonesia. My journey isn&apos;t just about writing code; it&apos;s about architecting pathways that connect human creativity with machine efficiency. I believe that technology should feel as organic as the paper in this book, yet as powerful as the servers that power the web.
          </p>
          
          <p>
            Over the years, I have navigated the territories of both frontend elegance and backend stability. Whether it&apos;s crafting an expressive user interface or optimizing a deployment pipeline, I approach every challenge with the same curiosity—the desire to understand not just <i>how</i> it works, but <i>why</i> it matters.
          </p>
        </div>

        {/* GitHub Sticker Link - Static with slight rotation */}
        <motion.a 
          href="https://github.com/melvin-cell" 
          target="_blank" 
          rel="noopener noreferrer"
          className={novelStyles.githubSticker}
          whileHover={{ y: -5, rotate: 12, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 8 }} // Rotasi dikit biar makin estetik
          transition={{ delay: 1.8, type: "spring", stiffness: 200 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  );
}
