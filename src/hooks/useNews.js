import { useState, useEffect, useCallback } from 'react'
import { getNewsList, getNewsById } from '@/services/newsService'

export const useNews = (filters = {}) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getNewsList(filters)
      setNews(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  return { news, loading, error, refetch: fetchNews }
}

export const useNewsDetail = (id) => {
  const [newsItem, setNewsItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const data = await getNewsById(id)
        setNewsItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  return { newsItem, loading, error }
}
