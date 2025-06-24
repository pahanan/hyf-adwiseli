import db from '@/controllers/DatabaseController'
import { ensureUser } from '@/middlewares/brand'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/', ensureUser(), async (req, res) => {
		const { influencerId } = req.params
		const influencer = await db.influencer.findFirst({
			where: {
				id: influencerId,
			},
			select: {
				id: true,
				fullName: true,
				interests: true,
				country: true,
				gender: true,
				createdAt: true,
				socialAccounts: true,
			},
		})
		if (!influencer) {
			return res.status(404).json({
				error: 'Influencer not found',
			})
		}

		const tiktokAccount = influencer?.socialAccounts.find(
			(account) => account.type === 'TIKTOK'
		)

		return res.json({
			id: influencer?.id,
			fullName: influencer?.fullName,
			interests: influencer?.interests,
			country: influencer?.country,
			gender: influencer?.gender,
			createdAt: influencer?.createdAt,
			tiktokAccount: tiktokAccount
				? {
						...tiktokAccount,
						// profilePictureURL: getURL(
						// 	tiktokAccount.profilePictureId,
						// 	tiktokAccount.profilePictureProvider
						// ),
						accessToken: undefined,
						refreshToken: undefined,
					}
				: undefined,
		})
	})
})
