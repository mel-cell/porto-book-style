// Page 1 — Inside Cover (kiri saat buku pertama dibuka)
// Nanti isi dengan: inside cover art, nama, tahun, dll.

import styles from "./page.module.css";

export default function Page1InsideCover() {
  return (
    <div className={styles.page} data-page="1">
      <div className={styles.pageNumber}>01</div>
      <div className={styles.placeholder}>
        <span className={styles.label}>INSIDE COVER</span>
      </div>
    </div>
  );
}
