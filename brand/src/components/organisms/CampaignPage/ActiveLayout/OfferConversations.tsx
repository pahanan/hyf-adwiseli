import useConversations from '@/hooks/use-conversations'
import Inbox from '../../Inbox'
import Loading from '@/components/ui/Loading'

export default function OfferConversations({ offerId }: { offerId: string }) {
	const { conversations, isLoading } = useConversations(offerId)

	if (isLoading) {
		return (
			<div className="flex-1 h-64 flex items-center justify-center text-sm text-neutral-500">
				<Loading />
			</div>
		)
	}

	if (!conversations || conversations.length === 0) {
		return (
			<div className="flex-1 flex items-center justify-center text-sm text-neutral-500">
				No conversations found.
			</div>
		)
	}

	return <Inbox conversationId={conversations[0]?.id} offerId={offerId} />
}
