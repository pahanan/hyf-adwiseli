import Layout from '@/components/layout'
import ConversationHeader from '@/components/organisms/Messaging/ConversationHeader'
import { ConversationInput } from '@/components/organisms/Messaging/ConversationInput'
import MessageCard from '@/components/organisms/Messaging/MessageCard'
import MessagingLayout from '@/components/organisms/Messaging/MessagingLayout'
import Loading from '@/components/ui/Loading'
import { toastError } from '@/helpers/toasty'
import { cn } from '@/helpers/utils'
import useBrand from '@/hooks/use-brand'
import useConversations from '@/hooks/use-conversations'
import getMessages, { Message } from '@/queries/conversations/getMessages'
import http, { getError } from '@/queries/http'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'

export default function Inbox({
	conversationId,
	offerId,
}: {
	conversationId?: string
	offerId?: string
}) {
	const { brand } = useBrand()
	const { conversations } = useConversations(offerId)
	const [currentConversationId, setCurrentConversationId] = useState<
		string | undefined
	>(conversationId)

	useEffect(() => {
		if (conversationId) {
			setCurrentConversationId(conversationId)
		}
	}, [conversationId])

	const conversationItem = conversations?.find(
		(item) => item.id === currentConversationId
	)

	// Track pending messages (optimistic UI)
	const [pendingMessages, setPendingMessages] = useState<Message[]>([])

	// Add state to track and merge messages manually
	const [allMessages, setAllMessages] = useState<Message[]>([])

	const {
		data: messagesData,
		fetchNextPage,
		isFetchingNextPage,
		refetch: refetchMessages,
	} = useInfiniteQuery<Message[], Error, InfiniteData<Message[]>>({
		queryKey: ['messages', conversationItem?.id],
		queryFn: async ({ pageParam }) =>
			await getMessages({
				page: pageParam as number,
				brandId: brand?.id as string,
				conversationId: conversationItem?.id as string,
			}),
		getNextPageParam: (
			lastPage: Array<Message>,
			allPages: Array<Array<Message>>
		) => {
			return lastPage.length === 20 ? allPages.length + 1 : undefined
		},
		initialPageParam: 1,
		enabled: !!conversationItem,
		refetchOnWindowFocus: false, // Disable automatic refetching on window focus
		refetchOnMount: true,
		refetchOnReconnect: false, // Disable automatic refetching on reconnect
		refetchInterval: 1000 * 2.5,
		structuralSharing: false,
	})

	// Merge messages manually when messagesData changes
	useEffect(() => {
		if (!messagesData) return

		// Create a map of existing messages by ID for quick lookup
		const existingMessages = new Map<string, Message>()
		allMessages.forEach((msg) => {
			// Skip temporary messages (they will be replaced by server messages)
			if (!msg.id.startsWith('temp-')) {
				existingMessages.set(msg.id, msg)
			}
		})

		// Collect new messages from messagesData
		const mergedMessages: Message[] = []
		const newMessageIds = new Set<string>()

		// First add all temp messages (optimistic updates)
		const tempMessages = allMessages.filter((msg) =>
			msg.id.startsWith('temp-')
		)
		mergedMessages.push(...tempMessages)

		// Then add all server messages that aren't duplicates
		messagesData.pages.forEach((page) => {
			page.forEach((msg) => {
				if (!existingMessages.has(msg.id)) {
					mergedMessages.push(msg)
					newMessageIds.add(msg.id)
				} else {
					// If we already have this message, use it (preserves existing references)
					mergedMessages.push(existingMessages.get(msg.id)!)
				}
			})
		})

		// Always update the state to ensure consistency
		// Sort messages by creation date to maintain order
		mergedMessages.sort((a, b) => {
			// Convert dates to timestamps for comparison
			const aTime =
				a.createdAt instanceof Date
					? a.createdAt.getTime()
					: new Date(a.createdAt).getTime()
			const bTime =
				b.createdAt instanceof Date
					? b.createdAt.getTime()
					: new Date(b.createdAt).getTime()
			// Sort in descending order (newest first)
			return bTime - aTime
		})

		// Deduplicate messages (in case we have the same message with different references)
		const uniqueMessages: Message[] = []
		const seenIds = new Set<string>()

		for (const msg of mergedMessages) {
			if (!seenIds.has(msg.id)) {
				uniqueMessages.push(msg)
				seenIds.add(msg.id)
			}
		}

		setAllMessages(uniqueMessages)
	}, [messagesData])

	async function sendMessage(
		text: string,
		callback: (result: Boolean) => void
	) {
		// Create an optimistic message with a temporary ID
		const tempId = `temp-${Date.now()}`
		const optimisticMessage: Message = {
			id: tempId,
			message: text,
			createdAt: new Date(),
			sender: 'BRAND',
			type: 'TEXT',
			read: false,
		}

		// Add the optimistic message to both pending messages (for UI) and our merged messages
		setPendingMessages((prev) => [...prev, optimisticMessage])
		setAllMessages((prev) => [optimisticMessage, ...prev])

		// Send the actual request
		await http
			.post(`/${brand?.id}/conversations/${conversationItem?.id}`, {
				message: text,
			})
			.then(({ data }) => {
				// On success, remove the optimistic message with temporary ID
				setPendingMessages((prev) =>
					prev.filter((msg) => msg.id !== tempId)
				)

				// Replace the temporary message with the real one in the merged messages
				setAllMessages((prev) => {
					const updatedMessages = prev.filter(
						(msg) => msg.id !== tempId
					)
					return [data, ...updatedMessages]
				})

				// Also refetch to get any other messages we might have missed
				refetchMessages()

				callback(true)
			})
			.catch((error) => {
				// On error, remove the optimistic message from both states
				setPendingMessages((prev) =>
					prev.filter((msg) => msg.id !== tempId)
				)
				setAllMessages((prev) =>
					prev.filter((msg) => msg.id !== tempId)
				)

				toastError(getError(error))
				callback(false)
			})
	}

	const topObserverRef = useRef(null)
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage()
				}
			},
			{
				root: null,
				rootMargin: '100px',
				threshold: 0.1,
			}
		)

		const cleanupRef = topObserverRef

		if (topObserverRef.current) {
			observer.observe(topObserverRef.current)
		}

		return () => {
			if (cleanupRef.current) {
				observer.unobserve(cleanupRef.current)
			}
		}
	}, [fetchNextPage, topObserverRef.current])

	if (!conversationItem) return null
	return (
		<MessagingLayout
			conversations={conversations}
			setCurrentConversationId={setCurrentConversationId}
			currentConversationId={currentConversationId}
			offerId={offerId}
		>
			<div className={cn('flex-1 relative w-full h-full flex flex-col')}>
				<div className="bg-neutral-50 relative h-full flex-1 flex flex-col">
					<ConversationHeader
						influencer={conversationItem.influencer}
					/>
					<div className="h-[calc(100vh-135px)] overflow-scroll no-scrollbar overflow-x-hidden w-full relative bg-neutral-50 p-5 flex gap-1 flex-1 flex-grow flex-shrink flex-col-reverse">
						{allMessages.map((message: Message) => (
							<MessageCard
								key={message.id}
								message={message}
								optimistic={message.id.startsWith('temp-')}
								influencer={{
									name: conversationItem?.influencer
										.fullName as string,
									avatarURL:
										conversationItem.influencer
											?.profilePictureURL,
								}}
							/>
						))}
						{isFetchingNextPage ? (
							<div className="flex justify-center items-center h-12">
								<Loading size="xs" />
							</div>
						) : (
							<div ref={topObserverRef} className="h-64" />
						)}
					</div>

					<div>
						<ConversationInput sendMessage={sendMessage} />
					</div>
				</div>
			</div>
		</MessagingLayout>
	)
}
