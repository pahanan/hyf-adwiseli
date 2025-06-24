import getCountries from '@/queries/other/getCountries'
import { useQuery } from '@tanstack/react-query'

export default function useCountries() {
	const { data, isLoading } = useQuery({
		queryKey: ['countries'],
		queryFn: async () => await getCountries(),
	})

	return {
		countries: data,
		isLoading,
	}
}
