import db from '@/controllers/DatabaseController'
import { ensureUser, includeBrand, includeCampaign } from '@/middlewares/brand'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get(
		'/',
		ensureUser(),
		includeBrand(),
		includeCampaign(),
		async (req, res) => {
			return res.json({
				id: req.campaign.id,
				name: req.campaign.name,
				brandId: req.campaign.brandId,
				status: req.campaign.status,
				createdAt: req.campaign.createdAt,
			})
		}
	)

	router.get(
		'/offers',
		ensureUser(),
		includeBrand(),
		includeCampaign(),
		async (req, res) => {
			const offers = await db.campaignOffer.findMany({
				where: {
					campaignId: req.campaign.id,
				},
				include: {
					creatorResults: {
						include: {
							influencer: {
								include: {
									socialAccounts: true,
								},
							},
						},
						orderBy: {
							overallScore: 'desc',
						},
					},
				},
				orderBy: {
					id: 'asc',
				},
			})

			const formattedData = offers.map((offer) => ({
				id: offer.id,
				status: offer.status,
				creators: offer.creatorResults
					.map((creator) => {
						if (
							creator.influencer === null ||
							creator.influencer.socialAccounts.length === 0
						) {
							return null
						}

						const socialAccount =
							creator.influencer.socialAccounts[0]
						return {
							influencerId: creator.influencer.id,
							influencerName: creator.influencer.fullName,
							username: socialAccount.username,
							influencerCountry: creator.influencer.country,
							// profilePictureURL: getURL(
							// 	socialAccount.profilePictureId,
							// 	socialAccount.profilePictureProvider
							// ),

							engagementRate: socialAccount.engagementRate,
							followers: socialAccount.followers,
							medianViews: socialAccount.medianViews,

							overallScore: creator.overallScore,
							interestScore: creator.interestScore,
							influencerAgeScore: creator.influencerAgeScore,
							audienceAgeScore: creator.audienceAgeScore,
							audienceCountriesScore:
								creator.audienceCountriesScore,
							audienceGenderScore: creator.audienceGenderScore,
							performanceMetricsScore:
								creator.performanceMetricsScore,
						}
					})
					.filter((creator) => creator !== null),
			}))

			return res.json(formattedData)
		}
	)
})
