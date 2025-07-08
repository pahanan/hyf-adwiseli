import { useState, useEffect } from 'react'
import fetchBrandData from '../queries/brand/fetchBrandData'

interface DashboardCardData {
	label: string
	value: number | string
	extraInfo?: string
}

const useDashboardData = (brandId: string) => {
	const [cards, setCards] = useState<DashboardCardData[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		setError('')
		const loadData = async () => {
			try {
				const data = await fetchBrandData(brandId)
				const campaign = data.campaigns[0]

				const topAge = Object.entries(
					campaign.audienceAgeDistribution
				).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(campaign.audienceAgeDistribution)[0]
				)[0]

				const [topGenderKey, topGenderValue] = Object.entries(
					campaign.audienceGenderDistribution
				).reduce(
					(prev, curr) => (curr[1] > prev[1] ? curr : prev),
					Object.entries(campaign.audienceGenderDistribution)[0]
				)[0]

				const topCountry = campaign.audienceCountries[0] ?? 'Unknown'

				setCards([
					{
						label: 'Reach',
						value: campaign.reach ?? 0,
						extraInfo: 'Up 10% since the last campaign',
					},
					{
						label: 'Engagement (Likes, comments, shares)',
						value: campaign.engagement ?? 0,
						extraInfo: 'Up 15% since the last campaign',
					},
					{
						label: 'Engagement rate',
						value: `${campaign.engagementRate ?? 0}%`,
						extraInfo: 'Up 7.5% since the last campaign',
					},
					{
						label: 'Impressions',
						value: campaign.impressions ?? 0,
						extraInfo: 'Up 22% since the last campaign',
					},
					{
						label: 'Video watch time',
						value: `${campaign.watchTime ?? 0} seconds avg.`,
						extraInfo: 'Up 2.5% since the last campaign',
					},
					{
						label: 'Profile & links clicks',
						value: campaign.clicks ?? 0,
						extraInfo: 'Up 13% since the last campaign',
					},
					{ label: 'Audience Age', value: topAge },
					{
						label: 'Audience Gender',
						value: `${topGenderValue}% ${topGenderKey}`,
					},
					{
						label: 'Audience Country (highest percentile)',
						value: topCountry,
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
