"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5
    },
  }
};

export default function Page1InsideCover() {
  return (
    <motion.div 
      className={styles.page} 
      data-page="1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
        <div className={styles.pageNumber}>01</div>
        {/* Page 1 is now empty */}
    </motion.div>
  );
}
