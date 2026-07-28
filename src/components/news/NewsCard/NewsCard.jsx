import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faThumbtack,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/formatDate'
import PlaceholderArt from '@/components/common/PlaceholderArt/PlaceholderArt'
import styles from './NewsCard.module.css'

export default function NewsCard({ news }) {
  return (
    <Link to={`/news/${news.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {news.coverImage ? (
          <img
            src={news.coverImage}
            alt={news.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <PlaceholderArt className={styles.placeholderArt} bg="#e2ecf5" />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.categoryBadge}>{news.category}</span>
          {news.pinned && (
            <span className={styles.pinned}>
              <FontAwesomeIcon icon={faThumbtack} />
            </span>
          )}
        </div>
        <div className={styles.date}>
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{formatDate(news.publishDate)}</span>
        </div>
        <h3 className={styles.title}>{news.title}</h3>
        <span className={styles.more}>
          more <FontAwesomeIcon icon={faChevronRight} />
        </span>
      </div>
    </Link>
  )
}
