import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './TeamMemberCard.module.css'

// 由 key 產生穩定雜湊
function hashKey(key = '') {
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return hash
}

// 依雜湊種子產生「穩定亂數」不規則圓角，每位成員形狀各異但不會每次變動
function seededRadius(seed) {
  let h = seed >>> 0
  const rnd = () => {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0
    return h / 4294967296
  }
  const v = () => Math.round(22 + rnd() * 36) // 22–58px，有變化但不會歪成畸形
  return `${v()}px ${v()}px ${v()}px ${v()}px / ${v()}px ${v()}px ${v()}px ${v()}px`
}

// 與整體網頁同色調 — 藍色、土黃交錯，深淺變化維持每張卡片的差異
const themes = [
  { fill: '#f4e5cb', border: '#d8ab74', accent: '#a4713a', ph: '#d3aa72' }, // 土黃
  { fill: '#dde8f2', border: '#9ab8d5', accent: '#5b7d9e', ph: '#9ab8d5' }, // 藍
  { fill: '#efe0c3', border: '#c9a267', accent: '#96682f', ph: '#c9a267' }, // 深土黃
  { fill: '#e6eef7', border: '#aac4dc', accent: '#68859f', ph: '#aac4dc' }, // 淺藍
  { fill: '#f6ead2', border: '#dbb783', accent: '#a4713a', ph: '#dbb783' }, // 奶茶
]

export default function TeamMemberCard({ member }) {
  const seed = hashKey(member.id || member.name)
  const t = themes[seed % 5]
  const radius = seededRadius(seed)

  return (
    <div
      className={styles.card}
      style={{ '--fill': t.fill, '--border': t.border, '--accent': t.accent, '--radius': radius }}
    >
      <div className={styles.inner}>
        <div className={styles.avatarWrap}>
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className={styles.avatar}
              loading="lazy"
            />
          ) : (
            <div
              className={styles.avatarPlaceholder}
              style={{ background: t.ph }}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faUser} className={styles.phIcon} />
            </div>
          )}
        </div>
        <h3 className={styles.name}>{member.name}</h3>
        {member.title && <span className={styles.memberTitle}>{member.title}</span>}
        {member.role && <span className={styles.role}>{member.role}</span>}
        {member.bio && <p className={styles.bio}>{member.bio}</p>}
      </div>
    </div>
  )
}
