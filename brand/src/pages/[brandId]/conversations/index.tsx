import Layout from '@/components/layout'
import MessagingLayout from '@/components/organisms/Messaging/MessagingLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import withBrand from '@/hoc/with-brand'
import useBrand from '@/hooks/use-brand'
import useConversations from '@/hooks/use-conversations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Conversations() {
	const router = useRouter()
	const { brand } = useBrand()
	const { conversations } = useConversations()

	useEffect(() => {
		if (conversations && conversations.length > 0) {
			router.push(
				`/${router.query.brandId}/conversations/${conversations[0].id}`
			)
		}
	}, [conversations, router])

	return (
		<Layout active="messaging" title="Messaging">
			<MessagingLayout conversations={conversations}>
				<div className="flex flex-col gap-7 p-8 py-20 text-center items-center justify-center flex-1">
					<div className="flex flex-col gap-2">
						<h2 className="font-semibold text-xl">
							No conversations
						</h2>
						<p className="text-gray-700 max-w-xs mx-auto">
							Find influencers in our Creator Library to start
							chatting with them
						</p>
					</div>

					<Link href={`/${brand?.id}/find-influencers`}>
						<Button size={'sm'}>Find influencers</Button>
					</Link>
				</div>
			</MessagingLayout>
		</Layout>
	)
}

export default withBrand(Conversations)
