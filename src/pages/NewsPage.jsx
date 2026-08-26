import { useState, useMemo, useRef } from 'react'
import Filter from '@/components/common/Filter/Filter'
import NewsCard from '@/components/news/NewsCard/NewsCard'
import Loading from '@/components/common/Loading/Loading'
import Pagination from '@/components/common/Pagination/Pagination'
import { useNews } from '@/hooks/useNews'
import { NEWS_CATEGORIES } from '@/constants/categories'
import styles from './NewsPage.module.css'
import titleBox from '@/assets/news-title-box.png'
import illustWatering from '@/assets/illust-watering.png'
import illustPinecone from '@/assets/illust-pinecone.png'
import illustBlocks from '@/assets/illust-4.png'
import decoTwigs from '@/assets/deco-twigs.png'
import dotsBlue from '@/assets/dots-blue.png'
import dotsOrange from '@/assets/dots-orange.png'
import pageHeroPhoto from '@/assets/其他頁照片.jpg'

const PAGE_SIZE = 12

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const sectionRef = useRef(null)
  const { news, loading, error } = useNews({ published: true })

  const filteredNews = useMemo(() => {
    let result = [...news]
    if (activeCategory !== 'all') {
      result = result.filter((n) => n.category === activeCategory)
    }
    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })
    return result
  }, [activeCategory, news])

  const totalPages = Math.max(1, Math.ceil(filteredNews.length / PAGE_SIZE))
  const pagedNews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredNews.slice(start, start + PAGE_SIZE)
  }, [filteredNews, currentPage])

  // 篩選變更時回到第 1 頁
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* 上方照片 hero（其他頁照片，雲朵下緣） */}
      <div className={styles.hero}>
        <img
          src={pageHeroPhoto}
          alt="ECDFC Story"
          className={styles.heroImg}
        />
      </div>

      <section className={styles.newsSection} ref={sectionRef}>
      {/* 背景點點圓 */}
      <img src={dotsBlue} alt="" aria-hidden="true" className={styles.dotBlue} />
      <img src={dotsOrange} alt="" aria-hidden="true" className={styles.dotOrange} />

      {/* 四周散布插圖 */}
      <img src={illustWatering} alt="" aria-hidden="true" className={styles.illWatering} />
      <img src={illustPinecone} alt="" aria-hidden="true" className={styles.illPinecone} />
      <img src={decoTwigs} alt="" aria-hidden="true" className={styles.illTwigs} />
      <img src={illustBlocks} alt="" aria-hidden="true" className={styles.illBlocks} />

      <div className={styles.newsContainer}>
        {/* 大標題圖 */}
        <img src={titleBox} alt="最新消息 ECDFC NEWS" className={styles.titleImg} />

        <Filter
          categories={NEWS_CATEGORIES}
          activeCategory={activeCategory}
          onChange={handleCategoryChange}
        />

        {loading ? (
          <Loading text="載入消息中..." />
        ) : error ? (
          <div className="page-error">
            <p>載入失敗，請重新整理頁面</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="page-empty">
            <p style={{ fontSize: 'var(--font-size-lg)' }}>目前沒有相關消息</p>
          </div>
        ) : (
          <>
            <div className={styles.newsGrid}>
              {pagedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      </section>
    </>
  )
}
