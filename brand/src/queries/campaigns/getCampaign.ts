import client, { getError } from '@/queries/http'

export type Campaign = {
	id: string
	name: string
	brandId: string
	status: 'GENERATING' | 'PENDING' | 'ACTIVE'
	createdAt: string
}

export default function getCampaign({
	brandId,
	campaignId,
}: {
	brandId: string
	campaignId: string
}): Promise<Campaign> {
	return new Promise(async (resolve, reject) => {
		await client
			.get(`/${brandId}/campaigns/${campaignId}`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
