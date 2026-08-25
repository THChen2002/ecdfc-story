import { useState, useMemo } from 'react'
import Filter from '@/components/common/Filter/Filter'
import NewsCard from '@/components/news/NewsCard/NewsCard'
import Loading from '@/components/common/Loading/Loading'
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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
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

      <section className={styles.newsSection}>
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
          onChange={setActiveCategory}
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
          <div className={styles.newsGrid}>
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  )
}
