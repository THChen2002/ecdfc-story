import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCalendarAlt,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import { useNews } from '@/hooks/useNews'
import { formatDate } from '@/utils/formatDate'
import { stripHtml, truncateText } from '@/utils/truncateText'
import styles from './LatestNews.module.css'

export default function LatestNews() {
  const { news, loading } = useNews({ published: true, limit: 3 })

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>最新消息</h2>
          <div style={{ textAlign: 'center', padding: '2rem 0', color: '#888' }}>載入中...</div>
        </div>
      </section>
    )
  }

  if (news.length === 0) return null

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>最新消息</h2>
        <div className={styles.grid}>
          {news.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.category}>{item.category}</span>
                {item.pinned && (
                  <span className={styles.pinned}>
                    <FontAwesomeIcon icon={faThumbtack} />
                    <span>置頂</span>
                  </span>
                )}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>
                {truncateText(stripHtml(item.content), 80)}
              </p>
              <div className={styles.cardDate}>
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{formatDate(item.publishDate)}</span>
              </div>
            </article>
          ))}
        </div>
        <div className={styles.viewAll}>
          <Link to="/news" className={styles.viewAllLink}>
            查看全部消息
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </section>
  )
}
