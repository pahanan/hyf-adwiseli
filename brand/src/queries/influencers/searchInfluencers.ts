import http, { getError } from '@/queries/http'

export type SearchFilters = {
	gender: 'FEMALE' | 'MALE' | 'OTHER' | null
	search: string | null
	interests: number[] | null
}

export type InfluencerListItem = {
	id: string
	country: 'DK'
	gender: 'MALE' | 'FEMALE' | 'OTHER'
	fullName: string
	interests: number[]
	ttAccount: {
		engagementRate?: number
		followers?: number
		username?: string
		averageViews?: number
		medianViews?: number
		profilePictureURL?: string
	}
}

type SearchCreatorsProps = {
	page: number
	filters: SearchFilters
}

export default function searchInfluencers(
	props: SearchCreatorsProps
): Promise<InfluencerListItem[]> {
	return new Promise(async (resolve, reject) => {
		await http
			.post(`/influencers/search`, {
				page: props.page,
				filters: props.filters,
			})
			.then((response) => resolve(response.data))
			.catch((error: any) => reject(getError(error)))
	})
}
