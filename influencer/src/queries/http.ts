import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/influencer`,
	withCredentials: true,
	timeout: 20000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
})

async function refreshToken() {
	const refreshToken = localStorage.getItem('refreshToken')
	if (!refreshToken) {
		return
	}
	await http
		.post(`/auth/refresh`, {
			refreshToken,
		})
		.then((response) => {
			// Nothing happens, as the cookie are set in the server
		})
		.catch((error) => {
			console.error(error)
			localStorage.removeItem('refreshToken')
		})
}

http.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config
		if (error?.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			await refreshToken()

			return http(originalRequest)
		}
		return Promise.reject(error)
	}
)

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
