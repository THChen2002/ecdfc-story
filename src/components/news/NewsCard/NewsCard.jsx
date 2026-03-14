import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/formatDate'
import { stripHtml, truncateText } from '@/utils/truncateText'
import styles from './NewsCard.module.css'

export default function NewsCard({ news }) {
  return (
    <article className={styles.card}>
      {news.coverImage && (
        <div className={styles.imageWrap}>
          <img
            src={news.coverImage}
            alt={news.title}
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.category}>{news.category}</span>
          {news.pinned && (
            <span className={styles.pinned}>
              <FontAwesomeIcon icon={faThumbtack} />
              置頂
            </span>
          )}
        </div>
        <h3 className={styles.title}>{news.title}</h3>
        <p className={styles.excerpt}>
          {truncateText(stripHtml(news.content), 120)}
        </p>
        <div className={styles.date}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{formatDate(news.publishDate)}</span>
        </div>
      </div>
    </article>
  )
}
