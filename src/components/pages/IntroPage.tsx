"use client";

import { motion } from "framer-motion";
import styles from "./IntroPage.module.css";

export default function IntroPage() {
  return (
    <div className={styles.page}>
      {/* Page number */}
      <span className={styles.pageNum}>01</span>

      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
          hidden: {},
        }}
      >
        {/* Label */}
        <motion.div
          className={styles.label}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className={styles.labelDot} />
          WEB DEV × DEVOPS
        </motion.div>

        {/* Name */}
        <motion.h1
          className={styles.name}
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          Halo, Aku
          <br />
          <span className={styles.nameAccent}>Melvin</span>
        </motion.h1>

        {/* Bio */}
        <motion.p
          className={styles.bio}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          Web craftsman & infrastructure thinker. I build things that run
          fast, look great, and stay alive at 3am.
        </motion.p>

        <motion.div
          className={styles.divider}
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        />

        {/* Info rows */}
        <motion.div
          className={styles.infoGrid}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.6 }}
        >
          {[
            { icon: "📍", label: "Location", value: "Indonesia" },
            { icon: "🎓", label: "Education", value: "Computer Science" },
            { icon: "💼", label: "Status", value: "Open to work" },
          ].map((item) => (
            <div key={item.label} className={styles.infoRow}>
              <span className={styles.infoIcon}>{item.icon}</span>
              <div>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>{item.value}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Avatar placeholder */}
        <motion.div
          className={styles.avatarWrap}
          variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.avatarRing} />
          <div className={styles.avatar}>
            <span className={styles.avatarInitial}>M</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
