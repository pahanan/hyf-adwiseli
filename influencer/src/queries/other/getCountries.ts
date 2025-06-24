import client, { getError } from '@/queries/http'

export type Country = {
	code: string
	name: string
}

export default function getCountries(): Promise<Country[]> {
	return new Promise(async (resolve, reject) => {
		await client
			.get(`/countries`)
			.then((response) => resolve(response.data))
			.catch((error) => reject(getError(error)))
	})
}
