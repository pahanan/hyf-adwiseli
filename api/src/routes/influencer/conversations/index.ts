import db from '@/controllers/DatabaseController'
import { ensureInfluencer } from '@/middlewares/influencer'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/', ensureInfluencer(), async (req, res) => {
		const conversations = await db.conversation.findMany({
			where: {
				influencerId: req.influencerId,
			},
			include: {
				messages: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
				brand: true,
			},
		})

		const data = conversations
			.map((conversation) => {
				const lastMessage = conversation.messages[0]

				return {
					id: conversation.id,
					brand: {
						id: conversation.brand.id,
						name: conversation.brand.name,
						// iconURL: getURL(
						// 	conversation.brand.iconId,
						// 	conversation.brand.iconProvider
						// ),
					},
					lastMessage: lastMessage
						? {
								id: lastMessage.id,
								content: lastMessage.message,
								createdAt: lastMessage.createdAt,
								sender: lastMessage.sender,
							}
						: null,
				}
			})
			.filter(Boolean)
			.sort((a, b) => {
				if (!a?.lastMessage) return -1
				if (!b?.lastMessage) return 1
				return (
					b.lastMessage.createdAt.getTime() -
					a.lastMessage.createdAt.getTime()
				)
			})

		return res.json(data)
	})
})
