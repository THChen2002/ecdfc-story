import styles from './HeroSection.module.css'

// 右下／左下分離的尾巴泡泡 — 大小、數量、位置刻意不規則散佈
// side: 靠哪一邊；edge: 距該邊的百分比；bottom: 下緣外偏移(px)；bg: 顯示的照片區塊
const tailBubbles = [
  { side: 'right', size: 66, edge: 7.5, bottom: -24, bg: '58% 80%' },
  { side: 'right', size: 38, edge: 4.4, bottom: -56, bg: '44% 86%' },
  { side: 'right', size: 20, edge: 2.4, bottom: -82, bg: '66% 70%' },
  { side: 'right', size: 11, edge: 6.2, bottom: -94, bg: '50% 78%' },
  { side: 'left', size: 50, edge: 9, bottom: -30, bg: '46% 82%' },
  { side: 'left', size: 27, edge: 6, bottom: -62, bg: '34% 88%' },
  { side: 'left', size: 14, edge: 11.5, bottom: -48, bg: '54% 74%' },
]

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
      {tailBubbles.map((b, i) => (
        <span
          key={i}
          className={styles.bubble}
          style={{
            '--s': `${b.size}px`,
            '--b': `${b.bottom}px`,
            [b.side]: `${b.edge}%`,
            backgroundPosition: b.bg,
          }}
        />
      ))}
    </section>
  )
}
