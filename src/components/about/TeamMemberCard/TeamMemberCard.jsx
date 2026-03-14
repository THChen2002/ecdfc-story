import styles from './TeamMemberCard.module.css'

export default function TeamMemberCard({ member }) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>
        <img
          src={member.avatar}
          alt={member.name}
          className={styles.avatar}
          loading="lazy"
        />
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
