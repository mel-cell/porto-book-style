// Page 3 — Skills (kiri di spread kedua)
// Nanti isi dengan: tech stack bars, kategori frontend/backend/devops

import styles from "./page.module.css";

export default function Page3Skills() {
  return (
    <div className={styles.page} data-page="3">
      <div className={styles.pageNumber}>03</div>
      <div className={styles.placeholder}>
        <span className={styles.label}>SKILLS</span>
        <span className={styles.sublabel}>Tech Stack</span>
      </div>
    </div>
  );
}
