import { useQuery } from '@tanstack/react-query'
import getConversations from '@/queries/conversations/getConversations'

export default function useConversations() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['conversations'],
		queryFn: async () => await getConversations(),
		refetchInterval: 1000 * 2.5,
	})

	return {
		conversations: data,
		isLoading,
		refetch,
	}
}
