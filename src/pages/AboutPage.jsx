import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import GoalSection from '@/components/about/GoalSection/GoalSection'
import TeamMemberCard from '@/components/about/TeamMemberCard/TeamMemberCard'
import Loading from '@/components/common/Loading/Loading'
import PageHero from '@/components/common/PageHero/PageHero'
import {
  WatercolorSpot,
  GrowingLeaves,
  DoodleCloud,
  FlatRabbit,
  FlatDeer,
} from '@/components/common/Decorations/Decorations'
import { useTeamMembers } from '@/hooks/useTeamMembers'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  const { members, loading } = useTeamMembers({ visible: true })

  return (
    <>
      <PageHero
        icon={faInfoCircle}
        lead="ABOUT US"
        title="計畫介紹"
        desc="本計畫以「培育未來幼兒的教育人才」為核心，透過 DFC 設計思考方法論，結合 SDGs 永續發展目標與 SEL 社會情緒學習，全面提升幼兒教育師資的專業素養。"
        waveColor="var(--color-bg-alt)"
        fruit="tomato"
      />

      <GoalSection />

      <section className={styles.teamSection}>
        {/* 少量大型裝飾 */}
        <WatercolorSpot color="#7BC5A0" size={260} className={styles.teamSpot1} />
        <WatercolorSpot color="#F2C94C" size={220} className={styles.teamSpot2} />
        <GrowingLeaves
          size={300}
          mainColor="#7BC5A0"
          lineColor="#4A8A6A"
          className={styles.teamLeaves1}
        />
        <GrowingLeaves
          size={240}
          mainColor="#E8742A"
          lineColor="#C85D1A"
          className={styles.teamLeaves2}
          flip
        />
        <DoodleCloud size={180} className={styles.teamCloud} />
        <FlatRabbit size={95} className={styles.teamRabbit} />
        <FlatDeer size={120} className={styles.teamDeer} />

        <div className={styles.teamContainer}>
          <h2 className={styles.teamTitle}>
            團隊成員
            <span className={styles.teamTitleBar} />
          </h2>
          {loading ? (
            <Loading text="載入團隊成員中..." />
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
