import ConversationCard from './ConversationCard'
import { Conversation } from '@/queries/conversations/getConversations'
import { useRouter } from 'next/router'

type LayoutProps = {
	children: React.ReactNode
	conversations: Conversation[] | undefined
}

export default function MessagingLayout({
	children,
	conversations,
}: LayoutProps) {
	const router = useRouter()
	const { conversationId } = router.query

	return (
		<div className="overflow-x-hidden lg:overflow-y-hidden lg:h-full flex flex-col lg:flex-row">
			{(conversations?.length || 0) > 0 ? (
				<div className="w-fit lg:w-[300px] overflow-x-scroll lg:overflow-y-scroll no-scrollbar flex-shrink-0 h-full bg-white border-r flex flex-col">
					{conversations?.map((item) => (
						<ConversationCard
							key={item.id}
							conversation={item}
							active={item.id === conversationId}
						/>
					))}
				</div>
			) : null}
			<div className="h-[calc(100vh-60px)] border-t lg:border-t-0 flex-1 flex-shrink-0">
				{children}
			</div>
		</div>
	)
}
