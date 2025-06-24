import http, { getError } from '@/queries/http'

export type Message = {
	id: string
	sender: 'INFLUENCER' | 'BRAND'
	type: 'TEXT' | 'FILE'
	message?: string
	attachmentURL?: string
	attachmentSize?: number
	attachmentMimeType?: string
	attachmentType?: 'FILE' | 'IMAGE' | 'VIDEO'
	read: boolean
	readAt?: Date
	createdAt: Date
}

export default function getMessages({
	page,
	brandId,
	conversationId,
}: {
	page: number | string
	brandId: string
	conversationId: string
}): Promise<Message[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/${brandId}/conversations/${conversationId}/${page}`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
