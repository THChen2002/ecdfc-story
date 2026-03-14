import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Tag from '@/components/common/Tag/Tag'
import styles from './PortfolioCard.module.css'

const categoryLabels = {
  'dfc-sdgs': 'DFC-SDGs',
  'dfc-sel': 'DFC-SEL',
}

export default function PortfolioCard({ portfolio }) {
  return (
    <Link
      to={`/portfolio/${portfolio.id}`}
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img
          src={portfolio.coverImage}
          alt={portfolio.title}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.category}>
          {categoryLabels[portfolio.category] || portfolio.category}
        </span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{portfolio.title}</h3>
        <p className={styles.summary}>{portfolio.summary}</p>
        <div className={styles.footer}>
          <div className={styles.tags}>
            {portfolio.tags?.slice(0, 3).map((tag) => (
              <Tag key={tag} size="sm">{tag}</Tag>
            ))}
          </div>
          <span className={styles.readMore}>
            查看詳情 <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </div>
      </div>
    </Link>
  )
}
