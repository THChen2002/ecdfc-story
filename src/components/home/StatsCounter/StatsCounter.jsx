import { SITE_CONFIG } from '@/constants/siteConfig'
import { useInView } from '@/hooks/useInView'
import styles from './StatsCounter.module.css'
import companionTitle from '@/assets/title-companion.png'
import footprints from '@/assets/deco-footprints.png'

// 數字下方的手繪小捲線
function Squiggle({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 28" fill="none" aria-hidden="true">
      <path
        d="M6,16 C18,4 34,4 44,15 C52,24 64,24 72,14 C80,5 96,6 104,16 C108,21 114,20 116,14"
        stroke="#6b5744"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

const statsConfig = [
  { key: 'students', label: '培育師資', suffix: '+', color: '#cb5e1c', bg: '#d8ab74', blob: '58% 42% 56% 44% / 52% 56% 44% 48%' },
  { key: 'projects', label: '教學方案', suffix: '+', color: '#789239', bg: '#eeddb5', blob: '46% 54% 60% 40% / 56% 44% 56% 44%' },
  { key: 'partners', label: '合作夥伴', suffix: '+', color: '#bd4a33', bg: '#d8ab74', blob: '54% 46% 42% 58% / 44% 56% 44% 56%' },
  { key: 'years', label: '執行年數', suffix: '+', color: '#c68e22', bg: '#eeddb5', blob: '50% 50% 62% 38% / 60% 42% 58% 40%' },
]

function StatItem({ item, value, idx }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      className={`${styles.stat} ${inView ? styles.statIn : ''}`}
      style={{ transitionDelay: `${idx * 0.12}s` }}
    >
      <div className={styles.blob} style={{ borderRadius: item.blob, background: item.bg }}>
        <span className={styles.number} style={{ color: item.color }}>
          {value}
          <span className={styles.suffix}>{item.suffix}</span>
        </span>
      </div>
      <Squiggle className={styles.squiggle} />
      <span className={styles.label}>{item.label}</span>
    </div>
  )
}

export default function StatsCounter({ stats = SITE_CONFIG.defaultStats }) {
  const [headRef, headIn] = useInView({ threshold: 0.4 })

  return (
    <section className={styles.section}>
      <img src={footprints} alt="" aria-hidden="true" className={styles.footPrint1} />
      <img src={footprints} alt="" aria-hidden="true" className={styles.footPrint2} />

      <div className={styles.container}>
        <div
          ref={headRef}
          className={`${styles.header} ${headIn ? styles.headerIn : ''}`}
        >
          <img src={companionTitle} alt="陪伴的足跡" className={styles.titleImg} />
        </div>

        <div className={styles.grid}>
          {statsConfig.map((item, idx) => (
            <StatItem
              key={item.key}
              item={item}
              value={stats[item.key]}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
