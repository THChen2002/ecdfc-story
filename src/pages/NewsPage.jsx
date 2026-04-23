import { useState, useMemo } from 'react'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Filter from '@/components/common/Filter/Filter'
import NewsCard from '@/components/news/NewsCard/NewsCard'
import Loading from '@/components/common/Loading/Loading'
import PageHero from '@/components/common/PageHero/PageHero'
import { useNews } from '@/hooks/useNews'
import { NEWS_CATEGORIES } from '@/constants/categories'
import styles from './NewsPage.module.css'

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
      <PageHero
        icon={faNewspaper}
        lead="ECDFC NEWS"
        title="最新消息"
        desc="掌握計畫最新動態與活動資訊"
        waveColor="var(--color-bg)"
        fruit="watermelon"
      />
      <section className={styles.newsSection}>
        <div className={styles.newsContainer}>
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
