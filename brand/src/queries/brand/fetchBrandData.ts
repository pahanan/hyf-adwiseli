import http, { getError } from '@/queries/http'

type BrandCampaign = {
	id: string
	name: string
	creatorAmount: number
	audienceAgeDistribution: Record<string, number>
	audienceGenderDistribution: Record<string, number>
	audienceCountries: string[]
	engagementRate: string
}

export interface BrandDashboardData {
	id: string
	name: string
	campaigns: BrandCampaign[]
	followers: number
	roi: number
	topPerformingCampaign: string | null
	audienceGender: {
		male: number
		female: number
		other: number
	}
	audienceCountry: {
		country: string
		percentage: number
	}[]
	metrics: {
		views: number
		likes: number
		comments: number
		shares: number
	}
}

export default async function fetchBrandData(
	brandId: string
): Promise<BrandDashboardData> {
	try {
		const res = await http.get(`/${brandId}/dashboard`)
		const data = res.data

		return {
			id: data.id,
			name: data.name ?? 'Ukendt',
			campaigns: data.campaigns ?? 0,
			followers: data.followers ?? 0,
			roi: data.roi ?? 0,
			topPerformingCampaign: data.topPerformingCampaign ?? null,
			audienceGender: data.audienceGender ?? {
				male: 0,
				female: 0,
				other: 0,
			},
			audienceCountry: data.audienceCountry ?? [],
			metrics: data.metrics ?? {
				views: 0,
				likes: 0,
				comments: 0,
				shares: 0,
			},
		}
	} catch (err) {
		throw getError(err)
	}
}
