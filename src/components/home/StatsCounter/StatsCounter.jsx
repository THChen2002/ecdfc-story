import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGraduate,
  faProjectDiagram,
  faHandshake,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import { useInView } from '@/hooks/useInView'
import {
  WatercolorSpot,
  GrowingLeaves,
  LeafSprig,
  WaterDrop,
  DoodleCloud,
  FlatTree,
  FlatRabbit,
} from '@/components/common/Decorations/Decorations'
import styles from './StatsCounter.module.css'

const statsConfig = [
  {
    key: 'students',
    label: '培育師資',
    icon: faUserGraduate,
    suffix: '+',
    blob: '60% 40% 55% 45% / 50% 60% 40% 50%',
    color: '#E8742A',
    bg: '#FFE4CC',
    sprigColor: '#7BC5A0',
    dropColor: '#7BC5A0',
  },
  {
    key: 'projects',
    label: '教學方案',
    icon: faProjectDiagram,
    suffix: '+',
    blob: '45% 55% 60% 40% / 55% 45% 50% 55%',
    color: '#7BC5A0',
    bg: '#DDF0E2',
    sprigColor: '#E8742A',
    dropColor: '#E88B8B',
  },
  {
    key: 'partners',
    label: '合作夥伴',
    icon: faHandshake,
    suffix: '+',
    blob: '55% 45% 40% 60% / 45% 55% 60% 40%',
    color: '#E88B8B',
    bg: '#FBDFDF',
    sprigColor: '#7BC5A0',
    dropColor: '#F2C94C',
  },
  {
    key: 'years',
    label: '執行年數',
    icon: faCalendarAlt,
    suffix: '+',
    blob: '50% 50% 65% 35% / 60% 40% 55% 45%',
    color: '#D4A02A',
    bg: '#FAEAB8',
    sprigColor: '#7BC5A0',
    dropColor: '#E8742A',
  },
]

function StatItem({ item, value, idx }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  return (
    <div
      ref={ref}
      className={`${styles.stat} ${inView ? styles.statIn : ''}`}
      style={{
        transitionDelay: `${idx * 0.12}s`,
      }}
    >
      <div className={styles.blobWrap}>
        {/* 從 blob 邊緣長出的嫩枝 */}
        <LeafSprig size={38} color={item.sprigColor} className={styles.sprig} />
        {/* 掛在 blob 邊的水滴 */}
        <WaterDrop size={18} color={item.dropColor} className={styles.drop} />

        <div
          className={styles.blob}
          style={{
            background: item.bg,
            borderRadius: item.blob,
          }}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className={styles.icon}
            style={{ color: item.color }}
          />
          <span className={styles.number} style={{ color: item.color }}>
            {value}
            <span className={styles.suffix}>{item.suffix}</span>
          </span>
        </div>
      </div>
      <span className={styles.label}>{item.label}</span>
    </div>
  )
}

export default function StatsCounter({ stats = SITE_CONFIG.defaultStats }) {
  const [headRef, headIn] = useInView({ threshold: 0.4 })

  return (
    <section className={styles.section}>
      {/* 背景水彩暈染 */}
      <WatercolorSpot color="#F2C94C" size={300} className={styles.bgSpot1} />
      <WatercolorSpot color="#7BC5A0" size={260} className={styles.bgSpot2} />

      {/* 主視覺 — 大片葉群從左下延伸（取代多個散佈小圖） */}
      <GrowingLeaves
        size={320}
        mainColor="#7BC5A0"
        lineColor="#4A8A6A"
        className={styles.bigLeavesLeft}
      />
      <GrowingLeaves
        size={240}
        mainColor="#E8742A"
        lineColor="#C85D1A"
        className={styles.bigLeavesRight}
        flip
      />

      {/* 保留少量點綴 */}
      <FlatTree size={120} className={styles.statTree} />
      <FlatRabbit size={90} className={styles.statRabbit} />
      <DoodleCloud size={190} className={styles.bgCloud} />

      <div className={styles.container}>
        <div
          ref={headRef}
          className={`${styles.header} ${headIn ? styles.headerIn : ''}`}
        >
          <p className={styles.lead}>一路走來，謝謝有你</p>
          <h2 className={styles.title}>陪伴的足跡</h2>
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
