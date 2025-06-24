import Layout from '@/components/layout'
import Inbox from '@/components/organisms/Inbox'
import withBrand from '@/hoc/with-brand'
import { useRouter } from 'next/router'

function Conversation() {
	const router = useRouter()
	return (
		<Layout active="messaging" title="Messaging">
			<Inbox conversationId={router.query.conversationId as string} />
		</Layout>
	)
}

export default withBrand(Conversation)
