import getCampaign, { Campaign } from '@/queries/campaigns/getCampaign'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function useCampaign() {
	const router = useRouter()
	const { brandId, campaignId } = router.query

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['campaign', campaignId],
		queryFn: async () =>
			await getCampaign({
				brandId: brandId as string,
				campaignId: campaignId as string,
			}),
		enabled: !!campaignId && !!brandId,
	})

	return { campaign: data as Campaign, isLoading, isError, error }
}
