import { createRouter } from '@/utils/route'
import db from '@/controllers/DatabaseController'
import type { Request } from 'express'

export default createRouter((router) => {
	router.get('/', async (req: Request<{ brandId: string }>, res) => {
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

			res.json({
				id: brand.id,
				name: brand.name,
				campaigns: brand.campaigns,
			})
		} catch (err) {
			console.error(err)
			res.status(500).json({ error: 'Something went wrong' })
		}
	})
})
