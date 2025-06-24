import db from '@/controllers/DatabaseController'
import { ensureUser, includeBrand, includeCampaign } from '@/middlewares/brand'
import { validateData } from '@/middlewares/validation'
import { createRouter } from '@/utils/route'
import * as z from 'zod'

export default createRouter((router) => {
	const schema = z.object({
		selectedOffers: z.array(z.string()),
	})

	router.post(
		'/confirm',
		validateData(schema),
		ensureUser(),
		includeBrand(),
		includeCampaign(),
		async (req, res) => {
			const { selectedOffers } = req.body as z.infer<typeof schema>

			if (req.campaign.status !== 'PENDING') {
				return res.status(400).json({
					error: 'Campaign is not in pending status',
					errorDescription:
						'You can only confirm a campaign that is in pending status',
				})
			}

			if (selectedOffers.length === 0) {
				await db.campaign.update({
					where: {
						id: req.campaign.id,
					},
					data: {
						status: 'CANCELLED',
					},
				})
				await db.campaignOffer.updateMany({
					where: {
						campaignId: req.campaign.id,
					},
					data: {
						status: 'REJECTED',
					},
				})
				return res.status(200).json({
					message: 'Campaign cancelled',
				})
			}

			const offers = await db.campaignOffer.findMany({
				where: {
					id: {
						in: selectedOffers,
					},
				},
				include: {
					creatorResults: true,
				},
			})
			if (offers.length !== selectedOffers.length) {
				return res.status(400).json({
					error: 'No offers found',
					errorDescription: 'No offers found for the selected ids',
				})
			}

			await db.campaign.update({
				where: {
					id: req.campaign.id,
				},
				data: {
					status: 'ACTIVE',
				},
			})

			await db.campaignOffer.updateMany({
				where: {
					id: {
						in: selectedOffers,
					},
				},
				data: {
					status: 'ACCEPTED',
				},
			})
			await db.campaignOffer.updateMany({
				where: {
					id: {
						notIn: selectedOffers,
					},
					campaignId: req.campaign.id,
				},
				data: {
					status: 'REJECTED',
				},
			})

			for (const offer of offers) {
				for (let creator of offer.creatorResults) {
					const conversation = await db.conversation.create({
						data: {
							campaignId: req.campaign.id,
							offerId: offer.id,
							influencerId: creator.influencerId,
							brandId: req.brand.id,
						},
					})
					await db.notification.create({
						data: {
							influencerId: creator.influencerId,
							url: `/conversations/${conversation.id}`,
							iconId: req.brand.iconId,
							iconProvider: req.brand.iconProvider,
							message: `${req.brand.name} has started a conversation with you.`,
						},
					})
				}
			}

			return res.status(200).json({
				message: 'Campaign confirmed',
			})
		}
	)
})
