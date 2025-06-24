import { useQuery } from '@tanstack/react-query'
import useBrand from './use-brand'
import getConversations from '@/queries/conversations/getConversations'

export default function useConversations(offerId?: string) {
	const { brand } = useBrand()

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['conversations', offerId ? offerId : 'all'],
		queryFn: async () =>
			await getConversations({
				brandId: brand?.id as string,
				offerId: offerId,
			}),
		enabled: !!brand,
		refetchInterval: 1000 * 2.5,
	})

	return {
		conversations: data,
		isLoading,
		refetch,
	}
}
