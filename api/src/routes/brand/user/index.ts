import type { Request, Response } from 'express'
import { createRouter } from '@/utils/route'
import db from '@/controllers/DatabaseController'
import { ensureUser } from '@/middlewares/brand'
import { StorageProvider } from '@prisma/client'

export default createRouter((router) => {
	router.get('/', ensureUser(), async (req: Request, res: Response) => {
		const results = (await db.$queryRaw`
			SELECT
				u.id,
				u."firstName",
				u."lastName",
				u.email,
				b.id AS "brandId",
				b.name AS "brandName",
				b."iconProvider",
				b."iconId",
				b."createdAt",
				bu.role
				FROM "User" u
				LEFT JOIN "BrandUser" bu ON u.id = bu."userId"
				LEFT JOIN "Brand" b ON bu."brandId" = b.id
			WHERE u.id = ${req.userId}
		`) as {
			id: string
			firstName: string
			lastName: string
			email: string
			brandId: string | null
			brandName: string | null
			iconProvider: StorageProvider | null
			iconId: string | null
			createdAt: string
			role: string
		}[]
		if (results.length === 0) {
			throw new Error('No results found')
		}

		const user = {
			id: results[0].id,
			firstName: results[0].firstName,
			lastName: results[0].lastName,
			email: results[0].email,
		}

		const brands = results
			.filter((row) => row.brandId !== null)
			.map((row) => ({
				id: row.brandId,
				name: row.brandName,
				// iconURL: getURL(row.iconId, row.iconProvider),
				createdAt: new Date(row.createdAt),
				role: row.role,
			}))

		return res.json({ user, brands })
	})
})
