import { useParams, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PortfolioDetail from '@/components/portfolio/PortfolioDetail/PortfolioDetail'
import Loading from '@/components/common/Loading/Loading'
import { usePortfolioDetail } from '@/hooks/usePortfolios'

export default function PortfolioDetailPage() {
  const { id } = useParams()
  const { portfolio, loading, error } = usePortfolioDetail(id)

  if (loading) {
    return <Loading fullPage text="載入成果中..." />
  }

  if (error || !portfolio) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '6rem 1.5rem',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{ fontSize: 'var(--font-size-xl)', marginBottom: '1rem' }}>找不到此成果</h2>
        <Link to="/portfolio" style={{
          color: 'var(--color-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          返回成果列表
        </Link>
      </div>
    )
  }

  return (
    <section style={{ padding: '3rem 0', minHeight: '60vh' }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem' }}>
        <Link to="/portfolio" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-text-light)',
          marginBottom: '2rem',
          fontSize: 'var(--font-size-sm)',
          textDecoration: 'none',
        }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          返回成果列表
        </Link>
        <PortfolioDetail portfolio={portfolio} />
      </div>
    </section>
  )
}
