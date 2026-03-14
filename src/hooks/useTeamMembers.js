import { useState, useEffect } from 'react'
import { getTeamMembers } from '@/services/teamService'

export const useTeamMembers = (filters = {}) => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const data = await getTeamMembers(filters)
        setMembers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [JSON.stringify(filters)])

  return { members, loading, error }
}
