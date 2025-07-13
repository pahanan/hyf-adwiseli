import { useState, useEffect } from 'react'
import fetchInfluencerData from '../queries/influencer/fetchInfluencerData'

//Defines the shape of a dashboard card
export interface DashboardCardData {
	label: string
	value: number | string | URL
	extraInfo?: string
}

// Format function to make the first letter Uppercase
function formatString(str: string) {
	str.charAt(0).toUpperCase() + str.slice(1)
}

// Custom hook to load and structure dashboard data for influencer users
const useDashboardData = (influencerId: string) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		// Wait until influencerId is available before calling the fetch to avoid calling the API with an invalid ID
		if (!influencerId) {
			setLoading(true)
			return
		}

		const loadData = async () => {
			try {
				const data = await fetchInfluencerData(influencerId)

				// Format the fetched data into a card-friendly array
				const topGender = Object.entries(data.audienceGender).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(data.audienceGender)[0]
				)[0]

				const topAge = Object.entries(data.audienceAge).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(data.audienceAge)[0]
				)[0]

				const topCountry = data.audienceCountry[0]?.country ?? 'Unknown'

				setCards([
					{
						label: 'Views',
						value: data.views,
						extraInfo: 'Up 10% since the last campaign',
					},
					{
						label: 'Likes',
						value: data.likes,
						extraInfo: 'Up 15% since the last campaign',
					},
					{
						label: 'Comments',
						value: data.comments,
						extraInfo: 'Up 7.5% since the last campaign',
					},
					{
						label: 'Shares',
						value: data.shares,
						extraInfo: 'Up 22% since the last campaign',
					},
					{
						label: 'Engagement rate',
						value: `${data.engagementRate}%`,
						extraInfo: 'Up 2.5% since last month',
					},
					{
						label: 'Audience (age, gender, country)',
						value: `${topAge}, ${formatString(
							topGender
						)}, ${topCountry}`,
					},
					{
						label: 'Top performing campaign',
						value: data.topPerformingBrand || 'N/A',
					},
					{
						label: 'Total earnings (DKK)',
						value: '1545',
					},
					{
						label: 'Performance graph',
						value: '/images/dashboard/performance_graph.png',
					},
				])
			} catch (err) {
				setIsError(true)
				setError('Failed to load influencer data')
			} finally {
				setLoading(false)
			}
		}
		loadData()
	}, [influencerId])

	// Return card data, loading state and error
	return { cards, loading, error }
}

export default useDashboardData
