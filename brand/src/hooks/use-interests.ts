import getInterests from '@/queries/other/getInterests'
import { useQuery } from '@tanstack/react-query'

export default function useInterests() {
	const { data, isLoading } = useQuery({
		queryKey: ['interests'],
		queryFn: async () => await getInterests(),
	})

	return {
		interests: data,
		isLoading,
	}
}
