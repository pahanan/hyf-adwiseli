import type { Request, Response } from 'express'
import { createRouter } from '@/utils/route'
import * as z from 'zod'
import { validateData } from '@/middlewares/validation'
import { ensureUser } from '@/middlewares/brand'
import db from '@/controllers/DatabaseController'
import { BrandRole } from '@prisma/client'
import SUPPORTED_COUNTRIES from '@/constants/countries'

export default createRouter((router) => {
	router.get('/', async (req: Request, res: Response) => {
		res.json({ message: 'System is active.' })
	})

	router.get('/countries', async (req, res) => {
		return res.json(SUPPORTED_COUNTRIES)
	})

	router.get('/interests', async (req, res) => {
		const interests = await db.interest.findMany()
		return res.json(interests)
	})

	const createBrandSchema = z.object({
		brandName: z.string(),
		iconId: z.string(),
	})

	router.post(
		'/create-brand',
		validateData(createBrandSchema),
		ensureUser(),
		async (req, res) => {
			const data = req.body as z.infer<typeof createBrandSchema>

			const ownedBrands = await db.brandUser.findMany({
				where: {
					userId: req.userId,
					role: BrandRole.OWNER,
				},
			})
			if (ownedBrands.length > 0) {
				return res
					.status(400)
					.json({ message: 'You already own a brand' })
			}

			const brand = await db.brand.create({
				data: {
					name: data.brandName,
					iconId: data.iconId,
					iconProvider: 'R2',
					brandUsers: {
						create: {
							userId: req.userId,
							role: BrandRole.OWNER,
						},
					},
				},
			})

			const file = await db.storageFile.findUnique({
				where: {
					id: data.iconId,
				},
			})
			if (file) {
				await db.storageFile.update({
					where: {
						id: data.iconId,
					},
					data: {
						brandId: brand.id,
					},
				})
			}

			return res.json(brand)
		}
	)
})
