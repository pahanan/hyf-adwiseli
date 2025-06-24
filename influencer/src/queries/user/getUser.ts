import http, { getError } from '../http'

export type User = {
	id: string
	onboarded: boolean
	fullName: string | null
	email: string
	country: string | null
	ttAccount: SocialAccountItem | null
}

type SocialAccountItem = {
	id: string
	active: boolean
	fullName: string | null
	type: 'TIKTOK'
	socialId: string
	username: string
	profilePictureURL: string | null
	followers: number | null
}

export default function getUser(): Promise<User> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/user`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
