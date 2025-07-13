import { useState, useEffect } from 'react'
import fetchBrandData from '../queries/brand/fetchBrandData'

// Defines the shape of a dashboard card
export interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

// Format function to make the first letter Uppercase
function formatString(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

// Custom hook to load and structure dashboard data for brand users
const useDashboardData = (brandId: string) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
    const loadMockData = async () => {
      try {
        // имитация задержки загрузки
        await new Promise(resolve => setTimeout(resolve, 500))

        setCards([
          {
            label: 'Reach',
            value: '87.000',
            extraInfo: 'Up 10% since the last campaign',
          },
          {
            label: 'Engagement',
            value: '89.456',
            extraInfo: 'Up 15% since the last campaign',
          },
          {
            label: 'Engagement rate',
            value: '3.5%',
            extraInfo: 'Up 7.5% since the last campaign',
          },
          {
            label: 'Impressions',
            value: '120.000',
            extraInfo: 'Up 22% since the last campaign',
          },
          {
            label: 'Watch time',
            value: '18 seconds avg.',
            extraInfo: 'Up 2.5% since the last campaign',
          },
          {
            label: 'Profile clicks',
            value: '1.150',
            extraInfo: 'Up 13% since the last campaign',
          },
          {
            label: 'Audience Age',
            value: '25–34',
          },
          {
            label: 'Audience Gender',
            value: '68% Female',
          },
          {
            label: 'Top Country',
            value: '46% Swedish',
          },
        ])
      } catch (err) {
        setError('Failed to load mock data')
      } finally {
        setLoading(false)
      }
    }

    loadMockData()
  }, [])

	return { cards, loading, error, isError }
}

export default useDashboardData
