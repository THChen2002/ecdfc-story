import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages, faNewspaper, faEye } from '@fortawesome/free-solid-svg-icons'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthContext } from '@/contexts/AuthContext'

export default function AdminDashboardPage() {
  const { user } = useAuthContext()
  const [stats, setStats] = useState({ portfolios: 0, news: 0, published: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pSnap, nSnap] = await Promise.all([
          getDocs(collection(db, 'portfolios')),
          getDocs(collection(db, 'news')),
        ])
        const pDocs = pSnap.docs.map((d) => d.data())
        const nDocs = nSnap.docs.map((d) => d.data())
        setStats({
          portfolios: pDocs.length,
          news: nDocs.length,
          published: pDocs.filter((d) => d.published).length + nDocs.filter((d) => d.published).length,
        })
      } catch (err) {
        console.error('Stats error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { label: '成果數量', value: stats.portfolios, icon: faImages, color: '#E8742A', bg: '#FFF5ED' },
    { label: '公告數量', value: stats.news, icon: faNewspaper, color: '#f2994a', bg: '#fef3e0' },
    { label: '已發布', value: stats.published, icon: faEye, color: '#6bc5a0', bg: '#e8f8f0' },
  ]

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>管理總覽</h1>
        {user && (
          <p style={{ fontSize: '0.875rem', color: '#888' }}>
            歡迎，{user.displayName || user.email}
          </p>
        )}
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1.5rem', marginBottom: '2rem',
      }}>
        {statCards.map((stat, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: '16px', padding: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 2px 8px rgba(91,184,212,0.08)',
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: stat.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <FontAwesomeIcon icon={stat.icon} style={{ color: stat.color, fontSize: '1.25rem' }} />
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: 1 }}>
                {loading ? '—' : stat.value}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#555', marginTop: '0.25rem' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white', borderRadius: '16px', padding: '2rem',
        boxShadow: '0 2px 8px rgba(91,184,212,0.08)', textAlign: 'center', color: '#888',
      }}>
        <p>請從左側選單選擇要管理的項目。</p>
      </div>
    </div>
  )
}
