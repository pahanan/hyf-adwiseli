import { useState, useEffect } from 'react'
import fetchInfluencerData from '../queries/influencer/fetchInfluencerData'

//Defines the shape of a dashboard card
interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

// Format function to make the first letter Uppercase
function formatString(str: string) {
	str.charAt(0).toUpperCase() + str.slice(1)
}

// Custom hook to load and structure dashboard data for influencer users
const useDashboardData = (influencerId: string) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		// Wait until influencerId is available before calling the fetch to avoid calling the API with an invalid ID
		if (!influencerId) {
			setLoading(false)
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
					{ label: 'Views', value: data.views },
					{ label: 'Likes', value: data.likes },
					{ label: 'Comments', value: data.comments },
					{ label: 'Shares', value: data.shares },
					{ label: 'Followers', value: data.followers },
					{
						label: 'Engagement rate',
						value: `${data.engagementRate}%`,
						extraInfo: 'Up 7.5% since last month',
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
				])
			} catch (err) {
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
