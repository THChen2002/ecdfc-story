import { useState, useMemo } from 'react'
import PortfolioCard from '@/components/portfolio/PortfolioCard/PortfolioCard'
import Loading from '@/components/common/Loading/Loading'
import { usePortfolios } from '@/hooks/usePortfolios'
import { usePortfolioCategories } from '@/hooks/usePortfolioCategories'
import styles from './PortfolioListPage.module.css'
import titleBlank from '@/assets/title-blank.png'
import illustPinecone from '@/assets/illust-pinecone.png'
import illustHorse from '@/assets/illust-2.png'
import dotsBlue from '@/assets/dots-blue.png'
import dotsYellow from '@/assets/dots-yellow.png'
import pageHeroPhoto from '@/assets/其他頁照片.jpg'

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
      {/* 上方照片 hero（其他頁照片，泡泡雲朵下緣） */}
      <div className={styles.hero}>
        <img
          src={pageHeroPhoto}
          alt="ECDFC Story"
          className={styles.heroImg}
        />
      </div>

      <section className={styles.contentSection}>
        {/* 背景點點圓 */}
        <img src={dotsYellow} alt="" aria-hidden="true" className={styles.dotYellow} />
        <img src={dotsBlue} alt="" aria-hidden="true" className={styles.dotBlue} />

        {/* 四周散布手繪插圖 */}
        <img src={illustHorse} alt="" aria-hidden="true" className={styles.illHorse} />
        <img src={illustPinecone} alt="" aria-hidden="true" className={styles.illPinecone} />

        <div className={styles.container}>
          {/* 手繪標題框（可填字） */}
          <div className={styles.titleBox}>
            <img src={titleBlank} alt="成果展示" className={styles.titleImg} />
            <span className={styles.titleText}>成果展示</span>
          </div>

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
