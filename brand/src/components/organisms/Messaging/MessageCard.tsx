import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import { cn } from '@/helpers/utils'
import { Message } from '@/queries/conversations/getMessages'
import { format } from 'date-fns'
import React from 'react'

function getDateText(date: Date) {
	const today = new Date()
	const isToday =
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	const isThisYear = date.getFullYear() === today.getFullYear()

	if (isToday) return format(date, 'HH:mm')
	if (isThisYear) return format(date, 'dd/MM, HH:mm')
	return format(date, 'dd/MM/yyyy, HH:mm')
}

type MessageCardProps = {
	message: Message
	influencer: {
		name: string
		avatarURL?: string
	}
	optimistic?: boolean
}

const MessageCard = ({ message, influencer, optimistic }: MessageCardProps) => {
	const isBrandSender = message.sender === 'BRAND'
	const isInfluencerSender = message.sender === 'INFLUENCER'

	return (
		<div className="flex flex-col relative z-30 w-full">
			<div className="flex flex-row gap-2 w-full">
				{isInfluencerSender && (
					<div className="flex-shrink-0">
						<Avatar className="w-6 h-6 rounded-full mt-1.5">
							<AvatarImage src={influencer.avatarURL} />
							<AvatarFallback />
						</Avatar>
					</div>
				)}
				<div
					className={cn(
						'flex w-full flex-col',
						isBrandSender ? 'items-end' : 'items-start'
					)}
				>
					<Tooltip
						content={getDateText(new Date(message.createdAt))}
						triggerClassName="cursor-default max-w-full"
					>
						<div
							className={cn(
								'px-2 py-1 max-w-[70%] border border-primary rounded-lg shadow-sm shadow-neutral-100 select-text',
								isBrandSender
									? 'bg-gradient-to-t bg-primary text-white'
									: 'bg-white text-secondary border-gray shadow',
								optimistic ? 'animate-pulse' : ''
							)}
							style={{
								wordBreak: 'break-word',
								overflowWrap: 'break-word',
								hyphens: 'auto',
								minWidth: '0',
								maxWidth: '70%',
							}}
						>
							<p
								className="text-base font-medium"
								style={{
									wordBreak: 'break-word',
									overflowWrap: 'break-word',
									whiteSpace: 'pre-wrap',
									hyphens: 'auto',
								}}
							>
								{message.message}
							</p>
						</div>
					</Tooltip>
					{optimistic ? (
						<p className="text-xs text-gray-700">Sending...</p>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default MessageCard
