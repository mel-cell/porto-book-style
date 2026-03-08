// Page 5 — Contact / Back Cover (kiri di spread terakhir)
// Nanti isi dengan: email, socials, CTA, "close book" button

import styles from "./page.module.css";

export default function Page5Contact() {
  return (
    <div className={styles.page} data-page="5">
      <div className={styles.pageNumber}>05</div>
      <div className={styles.placeholder}>
        <span className={styles.label}>CONTACT</span>
        <span className={styles.sublabel}>Let&apos;s Build Together</span>
      </div>
    </div>
  );
}
