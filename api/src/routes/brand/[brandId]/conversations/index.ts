import db from '@/controllers/DatabaseController'
import { ensureUser, includeBrand } from '@/middlewares/brand'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.post(
		'/start-chat/:influencerId',
		ensureUser(),
		includeBrand(),
		async (req, res) => {
			const { influencerId } = req.params
			const influencer = await db.influencer.findFirst({
				where: {
					id: influencerId,
				},
			})
			if (!influencer)
				return res.status(404).json({ error: 'Influencer not found' })

			let conversation = await db.conversation.findFirst({
				where: {
					brandId: req.brand.id,
					influencerId,
				},
			})
			if (!conversation) {
				conversation = await db.conversation.create({
					data: {
						brandId: req.brand.id,
						influencerId,
					},
				})

				await db.notification.create({
					data: {
						influencerId: influencerId,
						url: `/conversations/${conversation.id}`,
						iconId: req.brand.iconId,
						iconProvider: req.brand.iconProvider,
						message: `${req.brand.name} has started a conversation with you.`,
					},
				})
			}

			return res.json(conversation)
		}
	)

	router.get('/', ensureUser(), includeBrand(), async (req, res) => {
		const { offerId } = req.query

		const conversations = await db.conversation.findMany({
			where: {
				brandId: req.brand.id,
				...(offerId
					? { offerId: offerId as string }
					: {
							offerId: null,
						}),
			},
			include: {
				messages: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
				influencer: {
					include: {
						socialAccounts: true,
					},
				},
			},
		})

		const data = conversations
			.map((conversation) => {
				const lastMessage = conversation.messages[0]
				const socialAccount = conversation.influencer.socialAccounts[0]
				if (!socialAccount) return null

				return {
					id: conversation.id,
					influencer: {
						id: conversation.influencer.id,
						fullName: conversation.influencer.fullName,
						// profilePictureURL: getURL(
						// 	socialAccount.profilePictureId,
						// 	socialAccount.profilePictureProvider
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
				if (!a?.lastMessage) return 1
				if (!b?.lastMessage) return -1
				return (
					b.lastMessage.createdAt.getTime() -
					a.lastMessage.createdAt.getTime()
				)
			})

		return res.json(data)
	})
})
