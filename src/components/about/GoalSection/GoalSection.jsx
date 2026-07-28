import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBullseye,
  faSeedling,
  faUsers,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons'
import styles from './GoalSection.module.css'
import titleGoals from '@/assets/title-goals.png'
import illustHorse from '@/assets/illust-2.png'
import illustBoy from '@/assets/illust-3.png'
import dotsYellow from '@/assets/dots-yellow.png'
import dotsBlue from '@/assets/dots-blue.png'

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
      {/* 背景點點圓 */}
      <img src={dotsYellow} alt="" aria-hidden="true" className={styles.dotYellow} />
      <img src={dotsBlue} alt="" aria-hidden="true" className={styles.dotBlue} />

      {/* 四周散布手繪插圖 */}
      <img src={illustHorse} alt="" aria-hidden="true" className={styles.illHorse} />
      <img src={illustBoy} alt="" aria-hidden="true" className={styles.illBoy} />

      <div className={styles.container}>
        {/* 手繪標題框 */}
        <img src={titleGoals} alt="計畫目標" className={styles.titleImg} />

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
