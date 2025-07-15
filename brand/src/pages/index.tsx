import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'

import useUser from '@/hooks/use-user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useBrands from '@/hooks/use-brands'
import SetupBrand from '@/components/organisms/SetupBrand'

function Home() {
	const { isLoading, brands } = useBrands()
	const router = useRouter()
	const { user } = useUser()

	useEffect(() => {
		if (router.isReady) {
			if (!isLoading && brands && (brands?.length || 0 > 0)) {
				let lastCompanyId = window.localStorage.getItem('lastBrandId')
				if (
					lastCompanyId &&
					brands.find((c) => c.id === lastCompanyId)
				) {
					router.push(`/${lastCompanyId}`)
				} else {
					router.push(`/${brands[0].id}`)
				}
			}
		}
	}, [router, isLoading, brands])

	if (!user || isLoading)
	return <FullscreenLoading />

	if ((brands?.length || 0) === 0)
	return <SetupBrand />

	return <SetupBrand />
}

export default Home
