import db from '@/controllers/DatabaseController'
import { ensureUser, includeBrand } from '@/middlewares/brand'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/', ensureUser(), includeBrand(), async (req, res) => {
		const campaigns = await db.campaign.findMany({
			where: {
				brandId: req.brand.id,
			},
		})

		return res.json(
			campaigns.map((campaign) => ({
				id: campaign.id,
				name: campaign.name,
				brandId: campaign.brandId,
				status: campaign.status,
				goal: campaign.goal,
				contentType: campaign.contentType,
				creatorAmount: campaign.creatorAmount,
				createdAt: campaign.createdAt,
			}))
		)
	})
})
