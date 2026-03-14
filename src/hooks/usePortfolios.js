import { useState, useEffect, useCallback } from 'react'
import { getPortfolios, getPortfolioById } from '@/services/portfolioService'

export const usePortfolios = (filters = {}) => {
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchPortfolios = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getPortfolios(filters)
      setPortfolios(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => {
    fetchPortfolios()
  }, [fetchPortfolios])

  return { portfolios, loading, error, refetch: fetchPortfolios }
}

export const usePortfolioDetail = (id) => {
  const [portfolio, setPortfolio] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetchDetail = async () => {
      setLoading(true)
      try {
        const data = await getPortfolioById(id)
        setPortfolio(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [id])

  return { portfolio, loading, error }
}
