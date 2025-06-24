import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Conversation } from '@/queries/conversations/getConversations'
import NiceModal from '@ebay/nice-modal-react'
import InfluencerInfoModal from '../Modals/InfluencerInfoModal'

export default function ConversationHeader({
	influencer,
}: {
	influencer: Conversation['influencer']
}) {
	return (
		<div className="h-[65px] relative z-[30] px-4 bg-white border-b flex items-center gap-2.5">
			<div className="relative">
				<div className="rounded-full border border-gray-600/10 shadow-sm">
					<Avatar className="size-9 border-2 border-white">
						<AvatarImage src={influencer.profilePictureURL} />
						<AvatarFallback />
					</Avatar>
				</div>
				<img
					src={`https://hatscripts.github.io/circle-flags/flags/dk.svg`}
					className="w-4 h-4 absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
				/>{' '}
			</div>
			<div className="flex flex-col">
				<p
					onClick={() =>
						NiceModal.show(InfluencerInfoModal, {
							influencerId: influencer.id,
						})
					}
					className="font-medium hover:text-primary transition-all cursor-pointer"
				>
					{influencer.fullName}
				</p>
			</div>
		</div>
	)
}
