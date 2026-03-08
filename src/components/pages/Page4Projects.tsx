// Page 4 — Projects Featured (kanan di spread kedua)
// Nanti isi dengan: 1 project besar di kiri + 2 kecil di kanan
// Data dari GitHub API

import styles from "./page.module.css";

export default function Page4Projects() {
  return (
    <div className={styles.page} data-page="4">
      <div className={styles.pageNumber}>04</div>
      <div className={styles.placeholder}>
        <span className={styles.label}>PROJECTS</span>
        <span className={styles.sublabel}>GitHub Portfolio</span>
      </div>
    </div>
  );
}
