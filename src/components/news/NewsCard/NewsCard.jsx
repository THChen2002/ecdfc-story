import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faThumbtack,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '@/utils/formatDate'
import {
  DoodleStars,
  DoodleFlower,
  DoodleLeaf,
  PlantDoodle,
  DoodleHeart,
} from '@/components/common/Decorations/Decorations'
import styles from './NewsCard.module.css'

// 依 id 字串雜湊穩定挑選 placeholder 樣式，確保同一筆新聞每次顯示一致
function pickPlaceholder(id = '') {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return hash % 4
}

const placeholderThemes = [
  {
    bg: 'linear-gradient(135deg, #FFE4CC 0%, #FFD0A8 100%)',
    main: <DoodleFlower size={90} color="#E8742A" />,
    accents: [
      { Comp: DoodleLeaf, size: 40, top: '12%', left: '10%' },
      { Comp: DoodleStars, size: 60, top: '8%', right: '8%' },
    ],
  },
  {
    bg: 'linear-gradient(135deg, #DDF0E2 0%, #B8E0C4 100%)',
    main: <PlantDoodle size={100} />,
    accents: [
      { Comp: DoodleFlower, size: 38, color: '#E88B8B', top: '12%', right: '12%' },
      { Comp: DoodleHeart, size: 28, color: '#7BC5A0', top: '20%', left: '14%' },
    ],
  },
  {
    bg: 'linear-gradient(135deg, #FBDFDF 0%, #F5BFBF 100%)',
    main: <DoodleHeart size={80} color="#E88B8B" />,
    accents: [
      { Comp: DoodleStars, size: 60, top: '10%', left: '8%' },
      { Comp: DoodleFlower, size: 36, color: '#F2C94C', bottom: '14%', right: '10%' },
    ],
  },
  {
    bg: 'linear-gradient(135deg, #FAEAB8 0%, #F5D77F 100%)',
    main: <DoodleStars size={110} />,
    accents: [
      { Comp: DoodleLeaf, size: 36, top: '14%', right: '10%' },
      { Comp: DoodleFlower, size: 36, color: '#E88B8B', bottom: '12%', left: '12%' },
    ],
  },
]

export default function NewsCard({ news }) {
  const theme = placeholderThemes[pickPlaceholder(news.id)]

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
          <div
            className={styles.placeholder}
            style={{ background: theme.bg }}
            aria-hidden="true"
          >
            {theme.accents.map((a, i) => {
              const A = a.Comp
              return (
                <span
                  key={i}
                  className={styles.placeholderAccent}
                  style={{
                    top: a.top,
                    bottom: a.bottom,
                    left: a.left,
                    right: a.right,
                  }}
                >
                  <A size={a.size} color={a.color} />
                </span>
              )
            })}
            <div className={styles.placeholderMain}>{theme.main}</div>
          </div>
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
