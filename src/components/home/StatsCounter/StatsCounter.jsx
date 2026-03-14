import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGraduate,
  faProjectDiagram,
  faHandshake,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'
import { SITE_CONFIG } from '@/constants/siteConfig'
import styles from './StatsCounter.module.css'

const statsConfig = [
  { key: 'students', label: '培育師資', icon: faUserGraduate, suffix: '+' },
  { key: 'projects', label: '教學方案', icon: faProjectDiagram, suffix: '+' },
  { key: 'partners', label: '合作夥伴', icon: faHandshake, suffix: '+' },
  { key: 'years', label: '執行年數', icon: faCalendarAlt, suffix: '+' },
]

export default function StatsCounter({ stats = SITE_CONFIG.defaultStats }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {statsConfig.map((item) => (
            <div key={item.key} className={styles.stat}>
              <FontAwesomeIcon icon={item.icon} className={styles.icon} />
              <span className={styles.number}>
                {stats[item.key]}{item.suffix}
              </span>
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
