import axios from 'axios'

type TikTokAPIResponse<T> = {
	code: number | 0 // 0 is no error
	message: string
	data: T
	request_id: string
}

export type TikTokAccountInsights = {
	profile_image: string
	username: string
	display_name: string
	bio_description: string
	following_count: number
	followers_count: number
	audience_ages: {
		age: '18-24' | '25-34' | '35-44' | '45-54' | '55+'
		percentage: number
	}[]
	audience_genders: {
		gender: 'Female' | 'Male' | 'Other'
		percentage: number
	}[]
	audience_countries: {
		country: string
		percentage: number
	}[]
}

export type TikTokTokenResponse = {
	access_token: string
	scope: string
	expires_in: number
	refresh_token: string
	refresh_token_expires_in: number
	open_id: string
}

export type TikTokVideoItem = {
	caption?: string
	shares?: number
	share_url?: string
	audience_countries: {
		country: string
		percentage: number
	}[]
	impression_sources: {
		impression_source: string
		percentage: number
	}[]
	full_video_watched_rate?: number
	total_time_watched?: number
	item_id: string
	embed_url?: string
	reach?: number
	video_duration?: number
	thumbnail_url?: string
	likes?: number
	create_time: string
	average_time_watched?: number
	video_views: number
	comments: number
	favorites?: number
}

class TikTokController {
	clientId = process.env.TIKTOK_CLIENT_ID
	clientSecret = process.env.TIKTOK_CLIENT_SECRET

	async makeRequest(
		endpoint: string,
		method: string,
		data?: Record<string, any>,
		params?: Record<string, any>,
		headers?: Record<string, string>,
		accessToken?: string
	) {
		return await axios({
			method: method,
			url: `https://business-api.tiktok.com/open_api/v1.3${endpoint}`,
			data: data,
			params: params,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
				...(accessToken ? { 'Access-Token': `${accessToken}` } : {}),
				...(headers || {}),
			},
		})
	}

	async refreshToken(refreshToken: string) {
		const response = await this.makeRequest(
			'/tt_user/oauth2/refresh_token/',
			'POST',
			{
				client_id: this.clientId,
				client_secret: this.clientSecret,
				refresh_token: refreshToken,
				grant_type: 'refresh_token',
			}
		)
		return response.data as TikTokAPIResponse<TikTokTokenResponse>
	}

	async convertOAuthCodeToAccessToken(code: string, redirectUri: string) {
		const response = await this.makeRequest(
			'/tt_user/oauth2/token/',
			'POST',
			{
				client_id: this.clientId,
				client_secret: this.clientSecret,
				grant_type: 'authorization_code',
				auth_code: decodeURI(code),
				redirect_uri: redirectUri,
			}
		)
		return response.data as TikTokAPIResponse<TikTokTokenResponse>
	}

	async getProfileData(accessToken: string, openId: string) {
		const response = await this.makeRequest(
			'/business/get/',
			'GET',
			{},
			{
				business_id: openId,
				fields: `["profile_image","username","display_name","bio_description","following_count","followers_count","audience_countries","audience_genders","audience_ages"]`,
			},
			{},
			accessToken
		)
		return response.data as TikTokAPIResponse<TikTokAccountInsights>
	}

	async getVideosList(
		accessToken: string,
		openId: string,
		videosIds: string[],
		cursor?: string | undefined
	) {
		const response = await this.makeRequest(
			`/business/video/list/`,
			'GET',
			{},
			{
				business_id: openId,
				max_count: 20,
				cursor: cursor,
				fields: `["item_id","create_time","thumbnail_url","share_url","embed_url","caption","video_views","favorites","profile_views","likes","comments","shares","reach","video_duration","full_video_watched_rate","total_time_watched","average_time_watched","audience_countries", "impression_sources"]`,
				...(videosIds.length > 0
					? {
							filters: JSON.stringify({
								video_ids: videosIds,
							}),
						}
					: {}),
			},
			{},
			accessToken
		)
		return response.data as TikTokAPIResponse<{
			videos: TikTokVideoItem[]
			cursor: string
			has_more: boolean
		}>
	}

	async getDownloadableVideoURL(postId: string) {
		const response = await axios.get(
			`https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=https://www.tiktok.com/@tiktok/video/${postId}&hd=0`,
			{
				headers: {
					'x-rapidapi-host':
						'tiktok-download-without-watermark.p.rapidapi.com',
					'x-rapidapi-key': process.env.RAPID_API_KEY,
				},
			}
		)
		return response.data as {
			code: number
			msg: string
			data: {
				size: number
				play: string // Video URL
			}
		}
	}
}

export default new TikTokController()
