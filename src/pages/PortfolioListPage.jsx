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
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'
import styles from './PortfolioListPage.module.css'

export default function PortfolioListPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { portfolios, loading, error } = usePortfolios({ published: true })
  const { categories } = usePortfolioCategories()

  const hasUncategorized = useMemo(
    () => portfolios.some((p) => !p.category),
    [portfolios]
  )

  // 只顯示「有 published 成果」的分類，空分類不暴露給前台
  const usedCategoryIds = useMemo(() => {
    const set = new Set()
    portfolios.forEach((p) => {
      if (p.category) set.add(p.category)
    })
    return set
  }, [portfolios])

  const filterOptions = useMemo(() => {
    const opts = [{ value: 'all', label: '全部' }]
    categories
      .filter((c) => usedCategoryIds.has(c.id))
      .forEach((c) => opts.push({ value: c.id, label: c.label }))
    if (hasUncategorized) opts.push({ value: '__uncategorized__', label: '未分類' })
    return opts
  }, [categories, usedCategoryIds, hasUncategorized])

  const categoryLabelMap = useMemo(() => {
    const map = {}
    categories.forEach((c) => { map[c.id] = c.label })
    return map
  }, [categories])

  const filteredPortfolios = useMemo(() => {
    if (activeCategory === 'all') return portfolios
    if (activeCategory === '__uncategorized__') {
      return portfolios.filter((p) => !p.category)
    }
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
            categories={filterOptions}
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
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  categoryLabel={
                    portfolio.category
                      ? categoryLabelMap[portfolio.category] || portfolio.category
                      : '未分類'
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
