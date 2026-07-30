import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Tag from '@/components/common/Tag/Tag'
import PlaceholderArt from '@/components/common/PlaceholderArt/PlaceholderArt'
import styles from './PortfolioCard.module.css'

export default function PortfolioCard({ portfolio, categoryLabel }) {
  const displayCategory = categoryLabel || (portfolio.category ? portfolio.category : '未分類')

  return (
    <Link
      to={`/portfolio/${portfolio.id}`}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        {portfolio.coverImage ? (
          <img
            src={portfolio.coverImage}
            alt={portfolio.title}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <PlaceholderArt className={styles.placeholderArt} bg="#efe3d1" />
        )}
        <span className={styles.category}>
          {displayCategory}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{portfolio.title}</h3>
        {portfolio.summary && (
          <p className={styles.summary}>{portfolio.summary}</p>
        )}
        {portfolio.tags?.length > 0 && (
          <div className={styles.tags}>
            {portfolio.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} size="sm">{tag}</Tag>
            ))}
          </div>
        )}
        <span className={styles.readMore}>
          查看詳情 <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </Link>
  )
}
