import { useState, useMemo } from 'react'
import { faImages } from '@fortawesome/free-solid-svg-icons'
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
  const [activeYear, setActiveYear] = useState('all')
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

  const yearOptions = useMemo(() => {
    const set = new Set()
    portfolios.forEach((p) => {
      if (p.year !== undefined && p.year !== null && p.year !== '') set.add(p.year)
    })
    const opts = [{ value: 'all', label: '全部' }]
    ;[...set]
      .sort((a, b) => b - a)
      .forEach((y) => opts.push({ value: String(y), label: `${y} 學年度` }))
    return opts
  }, [portfolios])

  const filteredPortfolios = useMemo(() => {
    return portfolios.filter((p) => {
      const categoryMatch =
        activeCategory === 'all'
          ? true
          : activeCategory === '__uncategorized__'
          ? !p.category
          : p.category === activeCategory
      const yearMatch = activeYear === 'all' ? true : String(p.year) === activeYear
      return categoryMatch && yearMatch
    })
  }, [activeCategory, activeYear, portfolios])

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
          <div className={styles.filterBar}>
            <div className={styles.filterField}>
              <label className={styles.filterLabel} htmlFor="portfolio-category-filter">
                分類
              </label>
              <select
                id="portfolio-category-filter"
                className={styles.select}
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {yearOptions.length > 1 && (
              <div className={styles.filterField}>
                <label className={styles.filterLabel} htmlFor="portfolio-year-filter">
                  學年度
                </label>
                <select
                  id="portfolio-year-filter"
                  className={styles.select}
                  value={activeYear}
                  onChange={(e) => setActiveYear(e.target.value)}
                >
                  {yearOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
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
