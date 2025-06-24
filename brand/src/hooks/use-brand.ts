import { useRouter } from 'next/router'
import useBrands from './use-brands'

export default function useBrand() {
	const router = useRouter()

	const { brandId } = router.query
	const { brands, isLoading, isError, error } = useBrands()

	return {
		isLoading,
		isError,
		brand: brands?.find((brand) => brand.id === brandId),
		error,
	}
}
