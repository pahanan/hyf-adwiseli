import http, { getError } from '../http'

export type Notification = {
	id: string
	url: string
	iconURL: string
	message: string
	createdAt: string
}

export default function getNotifications(): Promise<Notification[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/user/notifications`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
