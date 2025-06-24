import http, { getError } from '@/queries/http'

interface Data {
	brandId?: string
	file?: File
}

interface Response {
	message?: string
	error?: string
	url?: string
	mediaId?: string
}

export default function upload({ brandId, file }: Data): Promise<Response> {
	let formData = new FormData()
	if (file) {
		formData.append('file', file)
	}

	const url = new URL(`${http.defaults.baseURL}/upload`)
	if (brandId) url.searchParams.append('brandId', brandId)

	return new Promise(async (resolve, reject) => {
		await fetch(url.toString(), {
			method: 'PUT',
			body: formData,
			credentials: 'include',
		})
			.then((response) => response.json())
			.then((response) => resolve(response))
			.catch((error) => reject(getError(error)))
	})
}
