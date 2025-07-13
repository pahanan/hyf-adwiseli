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
		const loadData = async () => {
			// Guard to skip fetch until brandId is available
			if (!brandId) {
				setLoading(true)
				return
			}

			try {
				setLoading(true)
				setIsError(false)
				setError(null)

				const data = await fetchBrandData(brandId)

				const campaign = data.campaigns?.[0]

				const gender = campaign.audienceGenderDistribution || {}
				const age = campaign.audienceAgeDistribution || {}
				const countries = campaign.audienceCountries || []
				const engagementRate = campaign.engagementRate || '0.0'

				const topGender = Object.entries(
					gender as Record<string, number>
				).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					['unknown', 0]
				)[0]

				const topAge = Object.entries(
					age as Record<string, number>
				).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					['unknown', 0]
				)[0]

				const topCountry = countries[0] ?? 'Unknown'

				const engagement =
					(data.metrics.likes ?? 0) +
					(data.metrics.comments ?? 0) +
					(data.metrics.shares ?? 0)

				const videoWatch = '18 seconds avg.'
				const profileClicks = 1150

				// Format the fetched data into a card-friendly array
				setCards([
					{
						label: 'Reach',
						value: data.metrics.views,
						extraInfo: 'Up $10% since the last campaign',
					},
					{
						label: 'Engagement (Likes, comments, shares)',
						value: engagement,
						extraInfo: 'Up 15% since the last campaign',
					},
					{
						label: 'Engagement rate',
						value: `${engagementRate}%`,
						extraInfo: 'Up 7.5% since the last campaign',
					},
					{
						label: 'Impressions',
						value: data.metrics.views,
						extraInfo: 'Up 22% since the last campaign',
					},
					{
						label: 'Video watch time',
						value: videoWatch,
						extraInfo: `Up 2.5% since the last campaign`,
					},
					{
						label: 'Profile & links clicks',
						value: profileClicks,
						extraInfo: `Up 13% since the last campaign`,
					},
					{
						label: 'Audience Age',
						value: topAge,
					},
					{
						label: 'Audience Gender',
						value: `${Math.round(
							(gender[topGender] || 0) * 100
						)}% ${formatString(topGender)}`,
					},
					{
						label: 'Audience Country (highest percentile)',
						value: `46% ${topCountry}`,
					},
				])
			} catch (err) {
				setIsError(true)
				setError('Failed to load brand data')
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [brandId])

	return { cards, loading, error, isError }
}

export default useDashboardData
