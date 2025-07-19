import axios, { AxiosInstance } from 'axios'

console.log('BaseURL', process.env.NEXT_PUBLIC_API_BASE_URL) 

const http: AxiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`,
	withCredentials: true,
	timeout: 20000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

export type GetErrorResponse = {
	error: string
	errorDescription: string
}
export function getError(error: any): GetErrorResponse {
	console.log(error)
	if (error?.response?.status == 429) {
		return {
			error: 'Too many requests',
			errorDescription:
				'Too many requests. Please try again later or contact support.',
		}
	}

	const title =
		error?.response?.data?.error ||
		error?.message ||
		error?.error ||
		error ||
		'An unknown error occurred.'

	const description =
		error?.response?.data?.errorDescription ||
		error?.errorDescription ||
		'Something on our end went wrong. Please try again later.'

	return {
		error: title,
		errorDescription: description,
	}
}
export default http
