import http, { getError } from '../http'

export type Conversation = {
	id: string
	brand: {
		id: string
		name: string | null
		iconURL: string | undefined
	}
	lastMessage: {
		id: string
		content: string | null
		createdAt: Date
		sender: 'BRAND' | 'INFLUENCER'
	} | null
}

export default function getConversations(): Promise<Conversation[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/conversations`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
