import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCalendarAlt,
  faThumbtack,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons'
import Loading from '@/components/common/Loading/Loading'
import {
  WatercolorSpot,
  GrowingLeaves,
  DoodleCloud,
} from '@/components/common/Decorations/Decorations'
import { useNewsDetail } from '@/hooks/useNews'
import { formatDate } from '@/utils/formatDate'
import styles from './NewsDetailPage.module.css'

export default function NewsDetailPage() {
  const { id } = useParams()
  const { newsItem, loading, error } = useNewsDetail(id)

  if (loading) {
    return <Loading fullPage text="載入消息中..." />
  }

  if (error || !newsItem) {
    return (
      <div className={styles.notFound}>
        <h2 className={styles.notFoundTitle}>找不到此消息</h2>
        <Link to="/news" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} />
          返回最新消息
        </Link>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <WatercolorSpot color="#F2C94C" size={260} className={styles.bgSpot1} />
      <GrowingLeaves
        size={240}
        mainColor="#7BC5A0"
        lineColor="#4A8A6A"
        className={styles.leaves}
      />
      <DoodleCloud size={170} className={styles.cloud} />

      <div className={styles.container}>
        <Link to="/news" className={styles.backLink}>
          <FontAwesomeIcon icon={faArrowLeft} />
          返回最新消息
        </Link>

        <article className={styles.article}>
          <div className={styles.meta}>
            <span className={styles.categoryBadge}>
              <FontAwesomeIcon icon={faNewspaper} />
              {newsItem.category}
            </span>
            {newsItem.pinned && (
              <span className={styles.pinned}>
                <FontAwesomeIcon icon={faThumbtack} />
                置頂
              </span>
            )}
            <span className={styles.date}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {formatDate(newsItem.publishDate)}
            </span>
          </div>

          <h1 className={styles.title}>{newsItem.title}</h1>

          {newsItem.coverImage && (
            <div className={styles.coverWrap}>
              <img
                src={newsItem.coverImage}
                alt={newsItem.title}
                className={styles.cover}
              />
            </div>
          )}

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: newsItem.content || '' }}
          />
        </article>
      </div>
    </section>
  )
}
