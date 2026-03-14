import { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import NewsFilter from '@/components/news/NewsFilter/NewsFilter'
import NewsCard from '@/components/news/NewsCard/NewsCard'
import Loading from '@/components/common/Loading/Loading'
import { useNews } from '@/hooks/useNews'
import { NEWS_CATEGORIES } from '@/constants/categories'

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
      <section style={{
        background: 'linear-gradient(180deg, #7ec8e3 0%, #d4eef7 100%)',
        color: 'var(--color-text)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}>
        <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--color-secondary)' }} />
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>最新消息</h1>
        <p style={{ opacity: 0.8 }}>掌握計畫最新動態與活動資訊</p>
      </section>
      <section style={{ padding: '3rem 0', minHeight: '60vh' }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem' }}>
          <NewsFilter
            categories={NEWS_CATEGORIES}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
          {loading ? (
            <Loading text="載入消息中..." />
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#e74c3c' }}>
              <p>載入失敗，請重新整理頁面</p>
            </div>
          ) : filteredNews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-lighter)' }}>
              <p style={{ fontSize: 'var(--font-size-lg)' }}>目前沒有相關消息</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
