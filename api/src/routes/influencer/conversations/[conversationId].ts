import db from '@/controllers/DatabaseController'
import { ensureInfluencer } from '@/middlewares/influencer'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/:page', ensureInfluencer(), async (req, res) => {
		const { page, conversationId } = req.params as {
			page: string
			conversationId: string
		}

		const parsedPage = parseInt(page) || 1

		const messages = (await db.$queryRaw`
			SELECT
				m.id,
				m.sender,
				m.type,
				m.message,
				sf.id as attachmentId,
				sf.provider as attachmentProvider,
				sf.bytes as attachmentSize,
				sf."mimeType" as attachmentMimeType,
				sf.type as attachmentType,
				m.read,
				m.read,
				m."createdAt"
			FROM "Message" m
			LEFT JOIN "StorageFile" sf ON m."attachmentId" = sf.id
			WHERE
				m."influencerId" = ${req.influencerId}
				AND m."conversationId" = ${conversationId}
				AND m.deleted = false
			ORDER BY m."createdAt" DESC
			LIMIT 20
			OFFSET ${(parsedPage - 1) * 20}
        `) as any[]

		return res.json(
			messages.map((m) => ({
				...m,
				attachmentURL:
					m.attachmentId && m.attachmentProvider
						? // getURL(m.attachmentId, m.attachmentProvider)
						  undefined
						: undefined,
			}))
		)
	})

	router.post('/', ensureInfluencer(), async (req, res) => {
		const { message } = req.body
		const { conversationId } = req.params as { conversationId: string }

		if (!message || typeof message !== 'string' || message.length < 1) {
			return res.status(400).json({
				error: 'No message provided',
				errorDescription: 'Please provide a message to send',
			})
		}
		if (message.length > 1000) {
			return res.status(400).json({
				error: 'Message too long',
				errorDescription: 'Message must be less than 1000 characters',
			})
		}

		const conversation = await db.conversation.findFirst({
			where: {
				id: conversationId,
				influencerId: req.influencerId,
			},
		})
		if (!conversation) {
			return res.status(404).json({
				error: 'Conversation not found',
				errorDescription: 'You do not have access to this conversation',
			})
		}

		await db.message.updateMany({
			where: {
				sender: 'BRAND',
				influencerId: req.influencerId,
				conversationId: conversationId,
				read: false,
			},
			data: {
				read: true,
				readAt: new Date(),
			},
		})

		const messageData = await db.message.create({
			data: {
				sender: 'INFLUENCER',
				type: 'TEXT',
				message,
				brandId: conversation.brandId,
				conversationId: conversationId,
				influencerId: conversation.influencerId,
			},
		})

		return res.json(messageData)
	})
})
