"use client";

import { motion } from "framer-motion";
import styles from "./SkillsPage.module.css";

const skills = {
  Frontend: [
    { name: "React / Next.js", level: 90 },
    { name: "TypeScript", level: 80 },
    { name: "CSS / Animation", level: 85 },
  ],
  Backend: [
    { name: "Node.js", level: 75 },
    { name: "PostgreSQL", level: 78 },
    { name: "REST / GraphQL", level: 72 },
  ],
  DevOps: [
    { name: "Docker", level: 88 },
    { name: "Linux / Bash", level: 92 },
    { name: "CI/CD", level: 70 },
  ],
};

const accentColors: Record<string, string> = {
  Frontend: "#6c63ff",
  Backend: "#00d4aa",
  DevOps: "#ff6584",
};

export default function SkillsPage() {
  return (
    <div className={styles.page}>
      <span className={styles.pageNum}>02</span>

      <motion.div
        className={styles.content}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        <motion.div
          className={styles.header}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className={styles.headerLabel}>TECH STACK</span>
          <span className={styles.headerSub}>What I work with</span>
        </motion.div>

        <div className={styles.categories}>
          {Object.entries(skills).map(([category, items]) => (
            <motion.div
              key={category}
              className={styles.category}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            >
              <h3
                className={styles.categoryTitle}
                style={{ color: accentColors[category] }}
              >
                [{category}]
              </h3>

              <div className={styles.skillList}>
                {items.map((skill, i) => (
                  <div key={skill.name} className={styles.skillItem}>
                    <div className={styles.skillMeta}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLvl} style={{ color: accentColors[category] }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={styles.track}>
                      <motion.div
                        className={styles.bar}
                        style={{ background: accentColors[category] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.3 + i * 0.1,
                          ease: [0.19, 1, 0.22, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools icons row */}
        <motion.div
          className={styles.tools}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className={styles.toolsLabel}>Also using</span>
          <div className={styles.toolsList}>
            {["Git", "Nginx", "Redis", "Vercel", "Cloudflare"].map((t) => (
              <span key={t} className={styles.toolTag}>{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
