import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.divider}>
          <span className={styles.star}>✦</span>
        </div>
        <p className={styles.thankYou}>Terima kasih atas doa restu Anda.</p>
        <p className={styles.credit}>
          Exclusive Wedding Invitation by{' '}
          <a
            href="https://github.com/mhderdnsyh"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            mhderdnsyh
          </a>
        </p>
      </div>
    </footer>
  );
}
