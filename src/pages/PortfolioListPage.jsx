import { useState, useMemo } from 'react'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import Filter from '@/components/common/Filter/Filter'
import PortfolioCard from '@/components/portfolio/PortfolioCard/PortfolioCard'
import Loading from '@/components/common/Loading/Loading'
import PageHero from '@/components/common/PageHero/PageHero'
import {
  WatercolorSpot,
  GrowingLeaves,
  DoodleCloud,
} from '@/components/common/Decorations/Decorations'
import { usePortfolios } from '@/hooks/usePortfolios'
import { PORTFOLIO_CATEGORIES } from '@/constants/categories'
import styles from './PortfolioListPage.module.css'

export default function PortfolioListPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { portfolios, loading, error } = usePortfolios({ published: true })

  const filteredPortfolios = useMemo(() => {
    if (activeCategory === 'all') return portfolios
    return portfolios.filter((p) => p.category === activeCategory)
  }, [activeCategory, portfolios])

  return (
    <>
      <PageHero
        icon={faImages}
        lead="OUR PORTFOLIO"
        title="成果展示"
        desc="探索我們的教學成果與創新實踐"
        waveColor="var(--color-bg-alt)"
        fruit="orange"
      />
      <section className={styles.contentSection}>
        <WatercolorSpot color="#7BC5A0" size={240} className={styles.contentSpot} />
        <GrowingLeaves
          size={260}
          mainColor="#7BC5A0"
          lineColor="#4A8A6A"
          className={styles.contentLeaves}
        />
        <DoodleCloud size={170} className={styles.contentCloud} />
        <div className={styles.container}>
          <Filter
            categories={PORTFOLIO_CATEGORIES}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          {loading ? (
            <Loading text="載入成果中..." />
          ) : error ? (
            <div className="page-error">
              <p>載入失敗，請重新整理頁面</p>
            </div>
          ) : filteredPortfolios.length === 0 ? (
            <div className="page-empty">
              <p style={{ fontSize: 'var(--font-size-lg)' }}>目前沒有相關成果</p>
            </div>
          ) : (
            <div className={styles.grid}>
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
