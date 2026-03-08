// Page 2 — Intro / Who Am I (kanan di spread pertama)
// Nanti isi dengan: foto, nama besar, bio singkat, info dasar

import styles from "./page.module.css";

export default function Page2Intro() {
  return (
    <div className={styles.page} data-page="2">
      <div className={styles.pageNumber}>02</div>
      <div className={styles.placeholder}>
        <span className={styles.label}>INTRO</span>
        <span className={styles.sublabel}>Who Am I</span>
      </div>
    </div>
  );
}
