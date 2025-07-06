import http, { getError } from '@/queries/http'

export interface InfluencerData {
	views: number
	likes: number
	comments: number
	shares: number
	followers: number
	engagementRate: number
	audienceGender: {
		male: number
		female: number
		other: number
	}
	audienceAge: {
		'18-24': number
		'25-34': number
		'35-44': number
		'45-54': number
		'55+': number
	}
	audienceCountry: {
		country: string
		percentage: number
	}[]
	topPerformingBrand: string | null
}

export default async function fetchInfluencerData(
	influencerId: string
): Promise<InfluencerData> {
	try {
		const res = await http.get(`/dashboard/${influencerId}`)
		const data = res.data

		return {
			views: data.views ?? 0,
			likes: data.likes ?? 0,
			comments: data.comments ?? 0,
			shares: data.shares ?? 0,
			followers: data.followers ?? 0,
			engagementRate: data.engagementRate ?? 0,
			audienceGender: data.audienceGender ?? {
				male: 0,
				female: 0,
				other: 0,
			},
			audienceAge: data.audienceAge ?? {
				'18-24': 0,
				'25-34': 0,
				'35-44': 0,
				'45-54': 0,
				'55+': 0,
			},
			audienceCountry: data.audienceCountry ?? [],
			topPerformingBrand: data.topPerformingBrand ?? null,
		}
	} catch (err) {
		throw getError(err)
	}
}
