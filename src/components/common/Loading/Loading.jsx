import styles from './Loading.module.css'

export default function Loading({ text = '載入中...', fullPage = false }) {
  return (
    <div className={`${styles.loading} ${fullPage ? styles.fullPage : ''}`}>
      <div className={styles.spinner}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  )
}
