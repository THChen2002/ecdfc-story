import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <img
        src="https://truehearts.com.tw/wp-content/uploads/2025/02/399811_0-scaled.jpg"
        alt="ECDFC Story Banner"
        className={styles.heroImage}
      />
      <div className={styles.heroContent}>
        <p className={styles.heroSubtitle}>Design for Change</p>
        <h1 className={styles.heroTitle}>DFC × SDGs</h1>
        <p className={styles.heroTagline}>幼教聲影故事</p>
      </div>
    </section>
  )
}
