import db from '@/controllers/DatabaseController'
import { ensureInfluencer } from '@/middlewares/influencer'
import { validateData } from '@/middlewares/validation'
import { createRouter } from '@/utils/route'
import * as z from 'zod'

export default createRouter((router) => {
	const onboardingSchema = z.object({
		fullName: z.string().min(1),
		birthday: z.string().datetime(),
		country: z.string().min(1),
		gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
		interests: z.array(z.number()).nonempty().max(5).min(1),
	})

	router.post(
		'/',
		validateData(onboardingSchema),
		ensureInfluencer(),
		async (req, res) => {
			const data = req.body as z.infer<typeof onboardingSchema>

			const influencer = await db.influencer.findFirst({
				where: {
					id: req.influencerId,
				},
			})
			if (influencer == null) {
				return res.status(404).json({ error: 'Influencer not found' })
			}

			if (influencer.onboarded) {
				return res.json({ message: 'Already onboarded' })
			}

			const interests = await db.interest.findMany({
				where: {
					id: {
						in: data.interests,
					},
				},
			})
			if (data.interests.length !== interests.length) {
				return res
					.status(400)
					.json({ error: 'Invalid interests provided' })
			}

			await db.influencer.update({
				where: {
					id: req.influencerId,
				},
				data: {
					fullName: data.fullName,
					birthday: data.birthday,
					country: data.country,
					onboarded: true,
					gender: data.gender,
					interests: interests.map((interest) => interest.id),
				},
			})

			return res.json(data)
		}
	)
})
