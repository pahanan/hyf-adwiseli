import http, { getError } from '@/queries/http'

export type Influencer = {
	id: string
	createdAt: string
	fullName: string | null
	country: string | null
	gender: string | null
	interests: number[]
	tiktokAccount?: {
		id: string
		username: string
		profilePictureURL: string
		followers: number
		engagementRate: number
		averageViews: number
		medianViews: number

		audience18Percentage: number // 0.0 - 1.0
		audience25Percentage: number // 0.0 - 1.0
		audience35Percentage: number // 0.0 - 1.0
		audience45Percentage: number // 0.0 - 1.0
		audience55Percentage: number // 0.0 - 1.0

		audienceCountry1?: string
		audienceCountry2?: string
		audienceCountry3?: string
		audienceCountry1Percentage?: number // 0.0 - 1.0
		audienceCountry2Percentage?: number // 0.0 - 1.0
		audienceCountry3Percentage?: number // 0.0 - 1.0
		audienceCountryOtherPercentage?: number // 0.0 - 1.0

		audienceFemalePercentage: number // 0.0 - 1.0
		audienceMalePercentage: number // 0.0 - 1.0
		audienceOtherPercentage: number // 0.0 - 1.0
	}
}

export default function getInfluencer({
	influencerId,
}: {
	influencerId: string
}): Promise<Influencer> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/influencers/${influencerId}`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
