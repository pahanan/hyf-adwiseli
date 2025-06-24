import { useEffect } from 'react'
import useUser from '@/hooks/use-user'
import { useRouter } from 'next/router'
import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'
import useCampaign from '@/hooks/use-campaign'

export default function withCampaign(Component: React.ComponentType) {
	const Authentication = () => {
		const router = useRouter()

		const { user, isLoading: isUserLoading } = useUser()

		const { campaign, isLoading, isError } = useCampaign()

		useEffect(() => {
			if (isError) {
				router.push('/auth/login')
			}
			if (!isLoading && !campaign && !isUserLoading) {
				router.push('/')
			}
		}, [router, user, isError, isLoading, campaign, isUserLoading])

		if (isError || !user) return <FullscreenLoading />
		if (isLoading) return <FullscreenLoading />
		if (!campaign) return <FullscreenLoading />
		if (!user) return <FullscreenLoading />

		return <Component />
	}
	return Authentication
}
