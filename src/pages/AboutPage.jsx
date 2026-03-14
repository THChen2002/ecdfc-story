import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import GoalSection from '@/components/about/GoalSection/GoalSection'
import TeamMemberCard from '@/components/about/TeamMemberCard/TeamMemberCard'
import Loading from '@/components/common/Loading/Loading'
import { useTeamMembers } from '@/hooks/useTeamMembers'

export default function AboutPage() {
  const { members, loading } = useTeamMembers({ visible: true })

  return (
    <>
      <section style={{
        background: 'linear-gradient(180deg, #7ec8e3 0%, #d4eef7 100%)',
        color: 'var(--color-text)',
        padding: '4rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-secondary)' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>計畫介紹</h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.85, lineHeight: 1.8 }}>
            本計畫以「培育未來幼兒的教育人才」為核心，透過 DFC 設計思考方法論，
            結合 SDGs 永續發展目標與 SEL 社會情緒學習，全面提升幼兒教育師資的專業素養。
          </p>
        </div>
      </section>
      <GoalSection />
      <section style={{ padding: '4rem 0', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{
            fontSize: 'var(--font-size-2xl)',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: 'bold',
          }}>
            團隊成員
            <span style={{
              display: 'block',
              width: '60px',
              height: '4px',
              background: 'var(--color-secondary)',
              margin: '0.75rem auto 0',
              borderRadius: '9999px',
            }} />
          </h2>
          {loading ? (
            <Loading text="載入團隊成員中..." />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}>
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
