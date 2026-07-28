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

// 與「計畫目標」卡片同一套暖色系（橘/綠/粉/黃 + 珊瑚），保有飽和度
const themes = [
  { fill: '#f8d3ad', border: '#e6ab74', accent: '#bf6a2c', ph: '#efa863' }, // 橘
  { fill: '#dcebbb', border: '#aecb7e', accent: '#5f8a44', ph: '#a7cc79' }, // 綠
  { fill: '#f8cccc', border: '#e89f9f', accent: '#c25a5a', ph: '#ea9a9a' }, // 粉
  { fill: '#f8dd9c', border: '#dfbc60', accent: '#a07d1e', ph: '#e8c561' }, // 黃
  { fill: '#f6cbb4', border: '#e0a082', accent: '#b45c40', ph: '#e79f80' }, // 珊瑚
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
