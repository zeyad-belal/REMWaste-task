import { useState, useEffect } from 'react'
import { skipService } from '../services/api'

export const useSkips = (postcode = 'NR32', area = 'Lowestoft') => {
  const [skips, setSkips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSkips = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await skipService.getSkipsByLocation(postcode, area)
      setSkips(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkips()
  }, [postcode, area])

  return {
    skips,
    loading,
    error,
    refetch: fetchSkips
  }
}
