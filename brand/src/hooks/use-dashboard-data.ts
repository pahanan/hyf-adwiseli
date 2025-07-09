import { useState, useEffect } from 'react'
import { fetchBrandData } from '../queries/brand/fetchBrandData'

// Defines the shape of a dashboard card
interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

// Format function to make the first letter Uppercase
function formatString(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

// Custom hook to load and structure dashboard data for brand users
const useDashboardData = () => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadData = async () => {
			// Guard to skip fetch until brandId is available
			if (!brandId) {
				setLoading(false)
				return
			}

			try {
				const data = await fetchBrandData(brandId)

				//audience data
				const topGender = Object.entries(data.audienceGender).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(data.audienceGender)[0]
				)[0]

				const topCountry = data.audienceCountry?.[0] ?? {
					country: 'Unknown',
					percentage: 0,
				}

				const engagement = data.engagementCount

				const videoWatch = `${data.videoWatchTime} seconds avg.`

				// Format the fetched data into a card-friendly array
				setCards([
					{
						label: 'Reach',
						value: data.reach,
						extraInfo: `Up ${data.deltas.reach}% since to last campaign`,
					},
					{
						label: 'Engagement (Likes, comments, shares)',
						value: engagement,
						extraInfo: `Up ${data.deltas.engagement}% since the last campaign`,
					},
					{
						label: 'Engagement rate',
						value: `${data.engagementRate}%`,
						extraInfo: `Up ${data.deltas.engagementRate}% since the last campaign`,
					},
					{
						label: 'Impressions',
						value: data.impressions,
						extraInfo: `Up ${data.deltas.impressions}% since the last campaign`,
					},
					{
						label: 'Video watch time',
						value: videoWatch,
						extraInfo: `Up ${data.deltas.videoWatchTime}% since the last campaign`,
					},
					{
						label: 'Profile & links clicks',
						value: data.profileClicks,
						extraInfo: `Up ${data.deltas.profileClicks}% since the last campaign`,
					},
					{
						label: 'Audience Age',
						value: data.audienceAge,
					},
					{
						label: 'Audience Gender',
						value: `${
							data.audienceGender[
								topGender as keyof typeof data.audienceGender
							]
						}% ${formatString(topGender)}}`,
					},
					{
						label: 'Audience Country (highest percentile)',
						value: `${topCountry.percentage}% ${topCountry.country}`,
					},
				])
			} catch (err) {
				setError('Failed to load brand data')
			} finally {
				setLoading(false)
			}
		}

		loadData()
	}, [brandId])

	return { cards, loading, error }
}

export default useDashboardData
