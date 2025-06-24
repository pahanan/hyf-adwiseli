import Layout from '@/components/layout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import FullscreenLoading from '@/components/ui/Loading/FullscreenLoading'
import { toastError } from '@/helpers/toasty'
import useUser from '@/hooks/use-user'
import http, { getError } from '@/queries/http'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { toast } from 'sonner'

function TikTokConnectPage() {
	const router = useRouter()
	const { user } = useUser()
	const { code, success } = router.query

	useEffect(() => {
		async function connectTikTokAccount(code: string) {
			await http
				.post(`/connect/tiktok/code`, {
					code: code,
				})
				.then((response) => {
					window.location.href = '/connect/tiktok?success=true'
				})
				.catch((error) => {
					toastError(getError(error))
					router.replace('/connect/tiktok', undefined, {
						shallow: true,
					})
				})
		}

		if (code && typeof code === 'string') {
			connectTikTokAccount(code)
		}
	}, [code, router])

	function connectTikTok() {
		const url = new URL('https://www.tiktok.com/v2/auth/authorize')
		url.searchParams.append(
			'redirect_uri',
			'https://influencer.adwiseli.com/connect/tiktok'
		)
		url.searchParams.append(
			`client_key`,
			`${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_ID}`
		)
		url.searchParams.append(
			'scope',
			[
				'user.info.basic',
				'user.info.username',
				'user.info.stats',
				'user.info.profile',
				'user.account.type',
				'user.insights',
				'video.list',
				'video.insights',
			].join(',')
		)
		url.searchParams.append('response_type', 'code')
		window.location.href = url.toString()
	}

	useEffect(() => {
		if (success) {
			toast.success('TikTok account connected successfully')
			router.replace('/connect/tiktok', undefined, {
				shallow: true,
			})
		}
	}, [router, success])

	if (code || success) {
		return <FullscreenLoading />
	}

	return (
		<Layout active="tiktok-connect" title="Manage TikTok account">
			<div className="p-4">
				<div className="flex">
					{user?.ttAccount ? (
						<div className="bg-neutral-100 px-4 py-2 rounded-lg flex items-center gap-4">
							<Avatar>
								<AvatarImage
									src={
										user?.ttAccount.profilePictureURL || ''
									}
								/>
								<AvatarFallback />
							</Avatar>
							<div>
								<p className="font-medium">
									{user?.ttAccount.fullName}
								</p>
								<p className="text-gray-500 text-sm">
									@{user?.ttAccount.username} -{' '}
									{user?.ttAccount.followers} followers
								</p>
							</div>
							<div className="h-full w-[1px] bg-gray-300" />
							<div>
								<button
									onClick={connectTikTok}
									className="text-primary text-sm hover:text-primary/80"
								>
									Change Account
								</button>
							</div>
						</div>
					) : (
						<div>
							<Button
								variant={'primary'}
								size={'sm'}
								onClick={connectTikTok}
							>
								Connect TikTok Account
							</Button>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default TikTokConnectPage
