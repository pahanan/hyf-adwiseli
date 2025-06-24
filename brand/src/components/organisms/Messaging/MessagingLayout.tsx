import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import ConversationCard from './ConversationCard'
import { Conversation } from '@/queries/conversations/getConversations'
import { useRouter } from 'next/router'

type LayoutProps = {
	children: React.ReactNode
	conversations: Conversation[] | undefined
	currentConversationId?: string
	setCurrentConversationId?: (id: string) => void
	offerId?: string
}

export default function MessagingLayout({
	children,
	conversations,
	currentConversationId,
	setCurrentConversationId,
	offerId,
}: LayoutProps) {
	return (
		<div className="overflow-x-hidden overflow-y-hidden h-full flex">
			{(conversations?.length || 0) > 0 ? (
				<div className="pb-3 w-[300px] overflow-y-scroll no-scrollbar flex-shrink-0 h-full bg-white border-r flex flex-col">
					{conversations?.map((item) => (
						<ConversationCard
							key={item.id}
							conversation={item}
							active={item.id === currentConversationId}
							offerId={offerId}
							setCurrentConversationId={
								setCurrentConversationId
									? setCurrentConversationId
									: () => {}
							}
						/>
					))}
				</div>
			) : null}
			<div className={'flex-1 flex-shrink-0'}>{children}</div>
		</div>
	)
}
//
