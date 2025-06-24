import http, { getError } from '../http'

export type Conversation = {
	id: string
	influencer: {
		id: string
		fullName: string | null
		profilePictureURL: string | undefined
	}
	lastMessage: {
		id: string
		content: string | null
		createdAt: Date
		sender: 'BRAND' | 'INFLUENCER'
	} | null
}

export default function getConversations({
	brandId,
	offerId,
}: {
	brandId: string
	offerId?: string
}): Promise<Conversation[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/${brandId}/conversations`, {
				params: {
					offerId: offerId,
				},
			})
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
