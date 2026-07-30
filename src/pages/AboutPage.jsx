import GoalSection from '@/components/about/GoalSection/GoalSection'
import TeamMemberCard from '@/components/about/TeamMemberCard/TeamMemberCard'
import Loading from '@/components/common/Loading/Loading'
import { useTeamMembers } from '@/hooks/useTeamMembers'
import styles from './AboutPage.module.css'
import titleTeam from '@/assets/title-team.png'
import illustHandhold from '@/assets/illust-handhold.png'
import illustGirl from '@/assets/illust-1.png'
import dotsBlue from '@/assets/dots-blue.png'
import dotsOrange from '@/assets/dots-orange.png'

export default function AboutPage() {
  const { members, loading } = useTeamMembers({ visible: true })

  return (
    <>
      {/* 上方照片 hero（沿用首頁照片，泡泡雲朵下緣） */}
      <div className={styles.hero}>
        <img
          src="https://truehearts.com.tw/wp-content/uploads/2025/02/399811_0-scaled.jpg"
          alt="ECDFC Story"
          className={styles.heroImg}
        />
      </div>

      <GoalSection />

      <section className={styles.teamSection}>
        {/* 背景點點圓 */}
        <img src={dotsBlue} alt="" aria-hidden="true" className={styles.dotBlue} />
        <img src={dotsOrange} alt="" aria-hidden="true" className={styles.dotOrange} />

        {/* 四周散布手繪插圖 */}
        <img src={illustHandhold} alt="" aria-hidden="true" className={styles.illHandhold} />
        <img src={illustGirl} alt="" aria-hidden="true" className={styles.illGirl} />

        <div className={styles.teamContainer}>
          {/* 手繪標題框 */}
          <img src={titleTeam} alt="團隊成員" className={styles.teamTitleImg} />

          {loading ? (
            <Loading text="載入團隊成員中..." />
          ) : members.length === 0 ? (
            <div className="page-empty">
              <p style={{ fontSize: 'var(--font-size-lg)' }}>目前尚無團隊成員資料</p>
            </div>
          ) : (
            <div className={styles.teamGrid}>
              {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
