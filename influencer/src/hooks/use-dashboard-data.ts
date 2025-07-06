import { useState, useEffect } from 'react'
import fetchInfluencerData from '../queries/influencer/fetchInfluencerData'

interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

const useDashboardData = (influencerId: string) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadData = async () => {
			try {
				const data = await fetchInfluencerData(influencerId)

				const topGender = Object.entries(data.audienceGender).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(data.audienceGender)[0]
				)[0]

				const topAge = Object.entries(data.audienceAge).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(data.audienceAge)[0]
				)[0]

				const topCountry = data.audienceCountry[0]?.country ?? 'Unknown'

				const format = (str: string) =>
					str.charAt(0).toUpperCase() +
					str.slice(1).toLowerCase() +
					str.slice(1).toLowerCase()

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
						value: `${topAge}, ${format(topGender)}, ${topCountry}`,
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

	return { cards, loading, error }
}

export default useDashboardData
