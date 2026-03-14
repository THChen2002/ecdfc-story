import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLightbulb,
  faGlobe,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import styles from './HighlightCards.module.css'

const highlights = [
  {
    icon: faLightbulb,
    color: '#f2c94c',
    bg: '#fef9e7',
    title: 'DFC 設計思考',
    desc: '運用「感受、想像、實踐、分享」四步驟，引導幼兒從生活中發現問題並主動解決，培養創新思維。',
  },
  {
    icon: faGlobe,
    color: '#5bb8d4',
    bg: '#e8f4fa',
    title: 'SDGs 永續發展',
    desc: '將聯合國永續發展目標融入幼兒園課程，讓孩子從小建立環境意識與全球公民素養。',
  },
  {
    icon: faHeart,
    color: '#f4a4a4',
    bg: '#fde8e8',
    title: 'SEL 社會情緒學習',
    desc: '培養幼兒的自我覺察、情緒管理與人際互動能力，奠定健全人格發展的基礎。',
  },
]

export default function HighlightCards() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>計畫核心理念</h2>
        <div className={styles.grid}>
          {highlights.map((item, index) => (
            <div key={index} className={styles.card}>
              <div
                className={styles.iconCircle}
                style={{ backgroundColor: item.bg }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ color: item.color }}
                  className={styles.icon}
                />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
