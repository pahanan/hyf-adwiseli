import db from '@/controllers/DatabaseController'
import { ensureInfluencer } from '@/middlewares/influencer'
import { createRouter } from '@/utils/route'
import { Request } from 'express'

export default createRouter((router) => {
	router.get(
		'/:influencerId',
		ensureInfluencer(),
		async (req: Request<{ influencerId: string }>, res) => {
			const { influencerId } = req.params

			try {
				const influencerData = await Promise.all([
					db.influencerVideo.aggregate({
						where: { socialAccount: { influencerId } },
						_sum: { video_views: true },
					}),
					db.influencerVideo.aggregate({
						where: { socialAccount: { influencerId } },
						_sum: { likes: true },
					}),
					db.influencerVideo.aggregate({
						where: { socialAccount: { influencerId } },
						_sum: { comments: true },
					}),
					db.influencerVideo.aggregate({
						where: { socialAccount: { influencerId } },
						_sum: { shares: true },
					}),
				])

				const socialAccount = await db.socialAccount.findFirst({
					where: { influencerId },
					select: {
						followers: true,
						engagementRate: true,
						audienceMalePercentage: true,
						audienceFemalePercentage: true,
						audienceOtherPercentage: true,
						audienceCountry1: true,
						audienceCountry1Percentage: true,
						audienceCountry2: true,
						audienceCountry2Percentage: true,
						audienceCountry3: true,
						audienceCountry3Percentage: true,
						audienceCountryOtherPercentage: true,
						audience18Percentage: true,
						audience25Percentage: true,
						audience35Percentage: true,
						audience45Percentage: true,
						audience55Percentage: true,
					},
				})
				if (!socialAccount) {
					return res
						.status(404)
						.json({ error: 'Influencer not found' })
				}

				const topBrandResult =
					await db.campaignCreatorMatchmakingResult.findFirst({
						where: { influencerId },
						orderBy: { overallScore: 'desc' },
						select: {
							campaign: {
								select: {
									brand: {
										select: {
											name: true,
										},
									},
								},
							},
						},
					})

				const topBrandName =
					topBrandResult?.campaign?.brand?.name ?? null

				return res.json({
					views: influencerData[0]._sum.video_views,
					likes: influencerData[1]._sum.likes,
					comments: influencerData[2]._sum.comments,
					shares: influencerData[3]._sum.shares,
					followers: socialAccount.followers,
					engagementRate: socialAccount.engagementRate,
					audienceGender: {
						male: socialAccount.audienceMalePercentage,
						female: socialAccount.audienceFemalePercentage,
						other: socialAccount.audienceOtherPercentage,
					},
					audienceAge: {
						'18-24': socialAccount.audience18Percentage,
						'25-34': socialAccount.audience25Percentage,
						'35-44': socialAccount.audience35Percentage,
						'45-54': socialAccount.audience45Percentage,
						'55+': socialAccount.audience55Percentage,
					},
					audienceCountry: [
						{
							country: socialAccount.audienceCountry1,
							percentage:
								socialAccount.audienceCountry1Percentage,
						},
						{
							country: socialAccount.audienceCountry2,
							percentage:
								socialAccount.audienceCountry2Percentage,
						},
						{
							country: socialAccount.audienceCountry3,
							percentage:
								socialAccount.audienceCountry3Percentage,
						},
						{
							country: 'Other',
							percentage:
								socialAccount.audienceCountryOtherPercentage,
						},
					],
					topPerformingBrand: topBrandName,
				})
			} catch (error) {
				console.error(
					'Error fetching influencer dashboard data:',
					error
				)
				res.status(500).json({ error: 'Internal Server Error' })
			}
		}
	)
})
