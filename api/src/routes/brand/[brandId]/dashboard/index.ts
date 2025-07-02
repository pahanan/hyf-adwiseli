import { Router } from 'express'
import db from '@/controllers/DatabaseController'

const router = Router()

router.get('/brand/:brandId/dashboard', async (req, res) => {
	const { brandId } = req.params

	try {
		const brand = await db.brand.findUnique({
			where: { id: brandId },
			include: {
				campaigns: true,
			},
		})

		if (!brand) {
			return res.status(404).json({ error: 'Brand not found' })
		}

		const campaignStats = await db.campaign.findMany({
			where: { brandId },
			include: {
				offers: true,
				creatorResults: true,
			},
		})

		const data = {
			id: brand.id,
			name: brand.name,
			campaigns: campaignStats.map((camp) => ({
				id: camp.id,
				name: camp.name,
				creatorAmount: camp.creatorAmount,
				audienceAgeDistribution: camp.audienceAgeDistribution,
				audienceGenderDistribution: camp.audienceGenderDistribution,
				audienceCountries: camp.audienceCountries,
				engagementRate: camp.creatorResults?.length
					? (
							camp.creatorResults.reduce(
								(acc, cur) => acc + cur.performanceMetricsScore,
								0
							) / camp.creatorResults.length
						).toFixed(2)
					: 0,
			})),
		}

		res.json(data)
	} catch (err) {
		console.error('Error fetching brand dashboard:', err)
		res.status(500).json({ error: 'Internal server error' })
	}
})

export default router
