import client, { getError } from '@/queries/http'

export type Interest = {
	id: number
	name: string
}

export default function getInterests(): Promise<Interest[]> {
	return new Promise(async (resolve, reject) => {
		await client
			.get(`/interests`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
