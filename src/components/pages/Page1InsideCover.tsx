"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import s from "./Page1InsideCover.module.css";

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
      className={`${styles.page} ${s.pageBlack}`} 
      data-page="1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={s.contentCenter}>
        <div className={s.imageContainer}>
          <Image 
            src="/img/bla3.png" 
            alt="bla bla bla" 
            fill 
            className={s.invertImage}
            sizes="50vw"
            priority
          />
        </div>
      </div>
      <div className={`${styles.pageNumber} ${s.pageNumberWhite}`}>01</div>
    </motion.div>
  );
}
