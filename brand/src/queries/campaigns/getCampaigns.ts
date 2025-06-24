import http, { getError } from '@/queries/http'

export type Campaign = {
	id: number
	name: string
	brandId: number
	status: 'GENERATING' | 'PENDING' | 'ACTIVE'
	goal: 'AWARENESS' | 'PROMOTION' | 'SALES' | 'TRAFFIC'
	contentType: 'INFLUENCER' | 'UGC'
	creatorAmount: number
	createdAt: string
}

export default function getCampaigns({
	brandId,
}: {
	brandId: string
}): Promise<Campaign[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/${brandId}/campaigns`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
