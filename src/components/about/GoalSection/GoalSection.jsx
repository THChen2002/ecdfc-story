import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faSeedling,
  faUsers,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons'
import styles from './GoalSection.module.css'

const goals = [
  {
    icon: faBullseye,
    title: '精進師資培育品質',
    desc: '透過系統化的課程設計與教學實踐，提升幼兒園師資的專業知能與教學能力。',
  },
  {
    icon: faSeedling,
    title: '推動永續發展教育',
    desc: '將 SDGs 融入幼兒教育課程，培養具有全球視野與環境意識的下一代。',
  },
  {
    icon: faUsers,
    title: '建立教師專業社群',
    desc: '透過跨校合作與經驗分享，建立幼教師資的專業成長網絡與支持系統。',
  },
  {
    icon: faChalkboardTeacher,
    title: '發展創新教學模式',
    desc: '運用 DFC 設計思考與 SEL 社會情緒學習，開發適合幼兒的創新教學方案。',
  },
]

export default function GoalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>計畫目標</h2>
        <div className={styles.grid}>
          {goals.map((goal, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrap}>
                <FontAwesomeIcon
                  icon={goal.icon}
                  className={styles.icon}
                />
              </div>
              <div className={styles.textWrap}>
                <h3 className={styles.goalTitle}>{goal.title}</h3>
                <p className={styles.goalDesc}>{goal.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
