import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { prettyDate, relativeTimeAgo, smartDate } from '@/helpers/date'
import { cn } from '@/helpers/utils'
import useBrand from '@/hooks/use-brand'
import { Conversation } from '@/queries/conversations/getConversations'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ConversationCard({
	conversation,
	active,
	offerId,
	setCurrentConversationId,
}: {
	conversation: Conversation
	active: boolean
	setCurrentConversationId: (id: string) => void
	offerId?: string
}) {
	const { brand } = useBrand()

	const Component = offerId ? 'button' : Link

	return (
		<Component
			href={`/${brand?.id}/conversations/${conversation.id}`}
			className={cn(
				'text-left flex-shrink-0 p-3 py-2.5 flex w-full gap-3 items-center hover:bg-neutral-100 transition-all',
				active && 'bg-neutral-100 hover:bg-neutral-50'
			)}
			onClick={() => {
				setCurrentConversationId(conversation.id)
			}}
		>
			<div className="relative">
				<div className="rounded-full border border-gray-600/10 shadow-sm">
					<Avatar className={cn('size-9 border-2 border-white')}>
						<AvatarImage
							src={conversation.influencer.profilePictureURL}
						/>
						<AvatarFallback />
					</Avatar>
				</div>
				<img
					src={`https://hatscripts.github.io/circle-flags/flags/dk.svg`}
					className="w-[14px] h-[14px] absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
				/>
			</div>
			<div className="flex flex-col gap-0.5 w-full">
				<div className="flex items-center justify-between gap-4">
					<p
						className={cn(
							'font-medium text-sm line-clamp-1 flex-1'
						)}
					>
						{conversation.influencer.fullName}
					</p>
					<div className="flex items-center gap-0.5">
						{conversation.lastMessage ? (
							<p
								className={cn(
									'text-neutral-400 text-xs font-base',
									active && 'text-neutral-700'
								)}
							>
								{smartDate(conversation.lastMessage.createdAt)}
							</p>
						) : null}
						<ChevronRight
							size={13}
							className={cn('text-neutral-400')}
						/>
					</div>
				</div>
				<div className="flex w-full items-center gap-2">
					{conversation.lastMessage ? (
						<p className="text-neutral-700 text-xs font-base line-clamp-1 truncate">
							{conversation.lastMessage.sender == 'BRAND'
								? '(You)'
								: ''}{' '}
							{conversation.lastMessage?.content?.slice(0, 20)}
							{conversation.lastMessage?.content?.length !=
								undefined &&
								conversation.lastMessage?.content?.length >
									20 &&
								'...'}
						</p>
					) : (
						<p
							className={cn(
								'text-neutral-500 text-xs font-base',
								active && 'text-neutral-700'
							)}
						>
							No message sent yet
						</p>
					)}
				</div>
			</div>
		</Component>
	)
}
