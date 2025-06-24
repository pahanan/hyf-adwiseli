import http, { getError } from '../http'

export type User = {
	id: string
	email: string
	firstName: string
	lastName: string
}

export type BrandItem = {
	id: string
	name: string
	iconURL?: string
	role: 'OWNER' | 'ADMIN'
	createdAt: string
}

type GetUserResponse = {
	user: User
	brands: BrandItem[]
}

export default function getUser(): Promise<GetUserResponse> {
	return new Promise(async (resolve, reject) => {
		await http
			.get(`/user`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
