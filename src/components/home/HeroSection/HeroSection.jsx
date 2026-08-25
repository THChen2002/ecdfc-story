import styles from './HeroSection.module.css'
import heroPhoto from '@/assets/首頁照片.jpg'

// 右下／左下分離的尾巴泡泡 — 大小、數量、位置刻意不規則散佈
// side: 靠哪一邊；edge: 距該邊的百分比；bottom: 下緣外偏移(px)；bg: 顯示的照片區塊
// 注意：照片下緣弧線在兩側較高（約離 hero 底 60–66px），泡泡頂端須低於此才不會碰到照片
const tailBubbles = [
  { side: 'right', size: 96, edge: 6, bottom: -64, bg: '86% 88%' },
  { side: 'right', size: 56, edge: 3.2, bottom: -102, bg: '92% 78%' },
  { side: 'right', size: 30, edge: 1.6, bottom: -132, bg: '80% 92%' },
  { side: 'right', size: 16, edge: 5.4, bottom: -146, bg: '88% 84%' },
  { side: 'left', size: 76, edge: 8.5, bottom: -56, bg: '12% 86%' },
  { side: 'left', size: 42, edge: 5, bottom: -96, bg: '6% 92%' },
  { side: 'left', size: 22, edge: 11.5, bottom: -78, bg: '18% 78%' },
]

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <img
        src={heroPhoto}
        alt="ECDFC Story Banner"
        className={styles.heroImage}
      />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Design for Change</h1>
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
            backgroundImage: `url(${heroPhoto})`,
            backgroundPosition: b.bg,
          }}
        />
      ))}
    </section>
  )
}
