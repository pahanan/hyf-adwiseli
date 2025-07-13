import { useState, useEffect } from 'react'

// Тип данных для карточки
export interface DashboardCardData {
  label: string
  value: number | string | URL
  extraInfo?: string
}

// Хук для загрузки мок-данных
const useDashboardData = (influencerId: string) => {
  const [cards, setCards] = useState<DashboardCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMockData = async () => {
      try {
        // Задержка как будто идёт загрузка с API
        await new Promise(resolve => setTimeout(resolve, 500))

        setCards([
          {
            label: 'Views',
            value: '123.452',
            extraInfo: 'Up 10% since the last campaign',
          },
          {
            label: 'Likes',
            value: '21.569',
            extraInfo: 'Up 15% since the last campaign',
          },
          {
            label: 'Comments',
            value: '1412',
            extraInfo: 'Up 7.5% since the last campaign',
          },
          {
            label: 'Shares',
            value: '578',
            extraInfo: 'Up 22% since the last campaign',
          },
          {
            label: 'Engagement rate',
            value: '4,97 %',
            extraInfo: 'Up 2.5% since the last campaign',
          },
          {
            label: 'Audience (age, gender, country)',
            value: '14–15, Female, Swedish',
          },
          {
            label: 'Top performing campaign',
            value: 'Jack & Jones',
          },
          {
            label: 'Total earnings (DKK)',
            value: '1545',
          },
          {
            label: 'Performance Graph',
            value: '/images/dashboard/performance_graph.png',
          },
        ])
      } catch (err) {
        setError('Failed to load mock data')
      } finally {
        setLoading(false)
      }
    }

    loadMockData()
  }, [influencerId])

  return { cards, loading, error }
}

export default useDashboardData
