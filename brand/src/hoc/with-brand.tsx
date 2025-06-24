import { useEffect } from 'react'
import useUser from '@/hooks/use-user'
import { useRouter } from 'next/router'
import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'

export default function withBrand(Component: React.ComponentType) {
	const Authentication = () => {
		const router = useRouter()

		const { user, isLoading, isError } = useUser()
		const { brandId } = router.query

		const brand = user?.brands.find((brand) => brand.id === brandId)

		useEffect(() => {
			if (isError) {
				router.push('/auth/login')
			}
			if (!isLoading && !brandId) {
				router.push('/')
			}
		}, [router, user, isError, brand, isLoading, brandId])

		if (isError || !user) return <FullscreenLoading />
		if (isLoading) return <FullscreenLoading />
		if (!brand) return <FullscreenLoading />

		return <Component />
	}
	return Authentication
}
