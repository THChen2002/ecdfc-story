import DOMPurify from 'dompurify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faFolder,
} from '@fortawesome/free-solid-svg-icons'
import Tag from '@/components/common/Tag/Tag'
import { formatDate } from '@/utils/formatDate'
import styles from './PortfolioDetail.module.css'

const categoryLabels = {
  'dfc-sdgs': 'DFC-SDGs',
  'dfc-sel': 'DFC-SEL',
}

export default function PortfolioDetail({ portfolio }) {
  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.meta}>
          <span className={styles.category}>
            <FontAwesomeIcon icon={faFolder} />
            {categoryLabels[portfolio.category] || portfolio.category}
          </span>
          {portfolio.year && (
            <span className={styles.year}>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {portfolio.year}
            </span>
          )}
        </div>
        <h1 className={styles.title}>{portfolio.title}</h1>
        {portfolio.summary && (
          <p className={styles.summary}>{portfolio.summary}</p>
        )}
        {portfolio.tags?.length > 0 && (
          <div className={styles.tags}>
            {portfolio.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
      {portfolio.coverImage && (
        <div className={styles.coverWrap}>
          <img
            src={portfolio.coverImage}
            alt={portfolio.title}
            className={styles.coverImage}
          />
        </div>
      )}
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(portfolio.content),
        }}
      />
      {portfolio.images?.length > 0 && (
        <div className={styles.gallery}>
          <h3 className={styles.galleryTitle}>相關圖片</h3>
          <div className={styles.galleryGrid}>
            {portfolio.images.map((img, index) => (
              <div key={index} className={styles.galleryItem}>
                <img
                  src={img}
                  alt={`${portfolio.title} ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
