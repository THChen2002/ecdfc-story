import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { LeafSprig, WaterDrop } from '@/components/common/Decorations/Decorations'
import styles from './TeamMemberCard.module.css'

// 依 id（或姓名）穩定挑選 placeholder 配色，確保每次顯示一致
function pickPlaceholder(key = '') {
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return hash % 5
}

const placeholderThemes = [
  { bg: 'linear-gradient(135deg, #FFE4CC 0%, #FFD0A8 100%)', color: '#C85D1A' },
  { bg: 'linear-gradient(135deg, #DDF0E2 0%, #B8E0C4 100%)', color: '#4A8A6A' },
  { bg: 'linear-gradient(135deg, #FBDFDF 0%, #F5BFBF 100%)', color: '#B85A5A' },
  { bg: 'linear-gradient(135deg, #FAEAB8 0%, #F5D77F 100%)', color: '#A88020' },
  { bg: 'linear-gradient(135deg, #E0EEF5 0%, #C5DDE8 100%)', color: '#4A7896' },
]

export default function TeamMemberCard({ member }) {
  const theme = placeholderThemes[pickPlaceholder(member.id || member.name)]

  return (
    <div className={styles.card}>
      <div className={styles.avatarBlock}>
        <LeafSprig size={36} className={styles.sprig} />
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
              style={{ background: theme.bg, color: theme.color }}
              aria-hidden="true"
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
        </div>
        <WaterDrop size={16} color="#7BC5A0" className={styles.drop} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{member.name}</h3>
        <span className={styles.memberTitle}>{member.title}</span>
        <span className={styles.role}>{member.role}</span>
        {member.bio && <p className={styles.bio}>{member.bio}</p>}
      </div>
    </div>
  )
}
