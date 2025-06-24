import db from '@/controllers/DatabaseController'
import { ensureUser } from '@/middlewares/brand'
import { validateData } from '@/middlewares/validation'
import { createRouter } from '@/utils/route'
import { Prisma } from '@prisma/client'
import * as z from 'zod'

export default createRouter((router) => {
	const searchCreatorsSchema = z.object({
		page: z.number().default(1),
		filters: z.object({
			gender: z.enum(['FEMALE', 'MALE', 'OTHER']).nullable(),
			search: z.string().max(200).nullable(),
			interests: z.array(z.number()).nullable(),
		}),
	})

	router.post(
		`/search`,
		validateData(searchCreatorsSchema),
		ensureUser(),
		async (req, res) => {
			const PAGE_SIZE = 25
			const data = req.body as z.infer<typeof searchCreatorsSchema>

			const interestsArray =
				data.filters.interests && data.filters.interests.length > 0
					? data.filters.interests
					: []

			const creators = await db.influencer.findMany({
				where: {
					...(data.filters.search
						? {
								OR: [
									{
										fullName: {
											contains: data.filters.search,
											mode: 'insensitive',
										},
									},
									{
										socialAccounts: {
											some: {
												username: {
													contains:
														data.filters.search,
													mode: 'insensitive',
												},
											},
										},
									},
								],
							}
						: {}),
					...(data.filters.gender
						? {
								gender: data.filters.gender,
							}
						: {}),
					...(interestsArray.length > 0
						? {
								interests: {
									hasSome: interestsArray,
								},
							}
						: {}),
					socialAccounts: {
						some: {
							type: 'TIKTOK',
							followers: { not: null },
						},
					},
				},
				select: {
					id: true,
					country: true,
					fullName: true,
					gender: true,
					interests: true,
					socialAccounts: {
						where: {
							type: 'TIKTOK',
							followers: { not: null },
						},
						select: {
							engagementRate: true,
							followers: true,
							username: true,
							averageViews: true,
							medianViews: true,
							profilePictureId: true,
							profilePictureProvider: true,
						},
						orderBy: {
							averageViews: 'desc',
						},
					},
				},
				take: PAGE_SIZE,
				skip: (data.page - 1) * PAGE_SIZE,
			})

			const mappedData = creators.map((creator) => {
				const ttAccount = creator.socialAccounts[0]
				return {
					...creator,
					ttAccount: {
						...ttAccount,
						// profilePictureURL: getURL(
						// 	ttAccount.profilePictureId,
						// 	ttAccount.profilePictureProvider
						// ),
					},
					socialAccounts: undefined,
				}
			})

			return res.json(mappedData)
		}
	)
})
