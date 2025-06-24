import type { Request, Response } from 'express'
import { createRouter } from '@/utils/route'
import { ensureInfluencer } from '@/middlewares/influencer'
import db from '@/controllers/DatabaseController'

export default createRouter((router) => {
	router.get('/', ensureInfluencer(), async (req: Request, res: Response) => {
		const influencer = await db.influencer.findFirst({
			where: {
				id: req.influencerId,
			},
			include: {
				socialAccounts: {
					select: {
						id: true,
						type: true,
						socialId: true,
						active: true,
						fullName: true,
						username: true,
						profilePictureId: true,
						profilePictureProvider: true,
						followers: true,
					},
				},
			},
		})
		if (!influencer) {
			return res.status(404).json({
				error: 'Influencer not found',
				errorDescription:
					'The influencer with the specified ID could not be found.',
			})
		}

		const ttAccount = influencer.socialAccounts.find(
			(account) => account.type === 'TIKTOK'
		)

		const data = {
			...influencer,
			ttAccount: ttAccount
				? {
						...ttAccount,
						// profilePictureURL: getURL(
						// 	ttAccount.profilePictureId,
						// 	ttAccount.profilePictureProvider
						// ),
					}
				: null,
			socialAccounts: undefined,
			password: undefined,
		}

		return res.json(data)
	})

	router.get(
		'/notifications',
		ensureInfluencer(),
		async (req: Request, res: Response) => {
			const notifications = await db.notification.findMany({
				where: {
					influencerId: req.influencerId,
				},
				orderBy: {
					createdAt: 'desc',
				},
			})

			return res.json(
				notifications.map((notification) => ({
					id: notification.id,
					url: notification.url,
					// iconURL: getURL(
					// 	notification.iconId,
					// 	notification.iconProvider
					// ),
					message: notification.message,
					createdAt: notification.createdAt,
				}))
			)
		}
	)
})
