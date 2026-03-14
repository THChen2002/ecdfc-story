import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import CategoryFilter from '@/components/portfolio/CategoryFilter/CategoryFilter'
import PortfolioCard from '@/components/portfolio/PortfolioCard/PortfolioCard'
import Loading from '@/components/common/Loading/Loading'
import { usePortfolios } from '@/hooks/usePortfolios'
import { PORTFOLIO_CATEGORIES } from '@/constants/categories'

export default function PortfolioListPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { portfolios, loading, error } = usePortfolios({ published: true })

  const filteredPortfolios = useMemo(() => {
    if (activeCategory === 'all') return portfolios
    return portfolios.filter((p) => p.category === activeCategory)
  }, [activeCategory, portfolios])

  return (
    <>
      <section style={{
        background: 'linear-gradient(180deg, #7ec8e3 0%, #d4eef7 100%)',
        color: 'var(--color-text)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <FontAwesomeIcon icon={faImages} style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-secondary)' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>成果展示</h1>
        <p style={{ opacity: 0.8 }}>探索我們的教學成果與創新實踐</p>
      </section>
      <section style={{ padding: '3rem 0', background: 'var(--color-bg-alt)' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem' }}>
          <CategoryFilter
            categories={PORTFOLIO_CATEGORIES}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          {loading ? (
            <Loading text="載入成果中..." />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#e74c3c' }}>
              <p>載入失敗，請重新整理頁面</p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-lighter)' }}>
              <p style={{ fontSize: 'var(--font-size-lg)' }}>目前沒有相關成果</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem',
            }}>
              {filteredPortfolios.map((portfolio) => (
                <PortfolioCard key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
