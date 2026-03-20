"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";
import s from "./Page4TechStack.module.css";
import Page4Marginalia from "@/components/Gimmicks/Page4Marginalia";

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
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Page4Projects() {
  return (
    <motion.div 
      className={styles.page} 
      data-page="4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.pageNumber}>04</div>

      {/* TECHNICAL MARGINALIA & ARCHIVE DETAIL */}
      <Page4Marginalia />

      <div className={s.pageContainer}>
        <h2 className={s.contentsTitle}>TECK STACK OR WHAT ?</h2>

        {/* --- SETELAN MANUAL SATU-SATU UNTUK LENGKUNGAN PRESISI --- */}
        <motion.div className={s.tocItem} style={{ paddingLeft: '0rem' }} variants={itemVariants}>
          <span className={s.label}>TypeScript / ES6+ Development</span>
          <div className={s.dots}></div>
          <span className={s.value}>08</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '3.5rem' }} variants={itemVariants}>
          <span className={s.label}>Laravel Framework / Ecosystem</span>
          <div className={s.dots}></div>
          <span className={s.value}>15</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '6rem' }} variants={itemVariants}>
          <span className={s.label}>Modern PHP 8.4 Engine</span>
          <div className={s.dots}></div>
          <span className={s.value}>22</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '8rem' }} variants={itemVariants}>
          <span className={s.label}>Next.js 14 / App Router</span>
          <div className={s.dots}></div>
          <span className={s.value}>29</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '10.5rem' }} variants={itemVariants}>
          <span className={s.label}>React / Framer Motion UI</span>
          <div className={s.dots}></div>
          <span className={s.value}>36</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '12rem' }} variants={itemVariants}>
          <span className={s.label}>Node.js / Express Services</span>
          <div className={s.dots}></div>
          <span className={s.value}>41</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '13rem' }} variants={itemVariants}>
          <span className={s.label}>Supabase / PostgreSQL DB</span>
          <div className={s.dots}></div>
          <span className={s.value}>48</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '14rem' }} variants={itemVariants}>
          <span className={s.label}>Docker Containerization</span>
          <div className={s.dots}></div>
          <span className={s.value}>55</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '15.5rem' }} variants={itemVariants}>
          <span className={s.label}>AWS Cloud Architecture</span>
          <div className={s.dots}></div>
          <span className={s.value}>62</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '16rem' }} variants={itemVariants}>
          <span className={s.label}>GitHub Actions / CI/CD Pipeline</span>
          <div className={s.dots}></div>
          <span className={s.value}>69</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '16.4rem' }} variants={itemVariants}> {/* PUNCAK */}
          <span className={s.label}>Linux / System Administration</span>
          <div className={s.dots}></div>
          <span className={s.value}>74</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '16.8rem' }} variants={itemVariants}>
          <span className={s.label}>Software Architecture Design</span>
          <div className={s.dots}></div>
          <span className={s.value}>81</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '17rem' }} variants={itemVariants}>
          <span className={s.label}>API Development / GraphQL</span>
          <div className={s.dots}></div>
          <span className={s.value}>88</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '17rem' }} variants={itemVariants}>
          <span className={s.label}>UI/UX Design / Interaction</span>
          <div className={s.dots}></div>
          <span className={s.value}>95</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '17rem' }} variants={itemVariants}>
          <span className={s.label}>Network Security / SSL Setup</span>
          <div className={s.dots}></div>
          <span className={s.value}>102</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '14rem' }} variants={itemVariants}>
          <span className={s.label}>Redis / High-Perf Caching</span>
          <div className={s.dots}></div>
          <span className={s.value}>109</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '12.5rem' }} variants={itemVariants}>
          <span className={s.label}>Unit Testing / Pest / Jest</span>
          <div className={s.dots}></div>
          <span className={s.value}>116</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '12.2rem' }} variants={itemVariants}>
          <span className={s.label}>System Profiling & Metrics</span>
          <div className={s.dots}></div>
          <span className={s.value}>125</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '11rem' }} variants={itemVariants}>
          <span className={s.label}>Cloudflare Edge Optimization</span>
          <div className={s.dots}></div>
          <span className={s.value}>132</span>
        </motion.div>

        <motion.div className={s.tocItem} style={{ paddingLeft: '7rem' }} variants={itemVariants}>
          <span className={s.label}>Scalable Infrastructure Logic</span>
          <div className={s.dots}></div>
          <span className={s.value}>144</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
