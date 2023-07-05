import styles from '@/src/ui/components/global/Preloader/Preloader.module.scss';

export default function Preloader() {
  return (
    <div>
      <div className={styles.preloaderWrapper}>
        <div className={styles.preloaderWrapper_lg}></div>
        <div className={styles.preloaderWrapper_lg}></div>
        <div className={styles.preloaderWrapper_lg}></div>
      </div>
    </div>
  );
}
