import client, { getError } from '@/queries/http'

export type CampaignOffer = {
	id: string
	status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
	creators: {
		influencerId: string
		influencerName: string | null
		influencerCountry: string | null
		username: string
		profilePictureURL: string | undefined
		engagementRate: number | null
		medianViews: number | null
		followers: number | null

		overallScore: number
		interestScore: number
		influencerAgeScore: number
		audienceAgeScore: number
		audienceCountriesScore: number
		audienceGenderScore: number
		performanceMetricsScore: number
	}[]
}

export default function getOffers({
	brandId,
	campaignId,
}: {
	brandId: string
	campaignId: string
}): Promise<CampaignOffer[]> {
	return new Promise(async (resolve, reject) => {
		await client
			.get(`/${brandId}/campaigns/${campaignId}/offers`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
