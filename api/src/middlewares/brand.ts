import { NextFunction, Request, Response } from 'express'

import db from '@/controllers/DatabaseController'
import { Brand, BrandRole } from '@prisma/client'

export function includeUser() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// mocking authentication
		req.userId = 'user-001'
		next()
	}
}

export function ensureUser() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// mocking session management
		req.userId = 'user-001'
		next()
	}
}

export function includeBrand(role?: BrandRole) {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.userId) {
			throw new Error(
				'includeBrand middleware requires user to be set on the request object'
			)
		}
		let brandId = (req.params.brandId || req.query.brandID) as string
		if (!brandId) {
			return res.status(400).json({ error: 'Missing Brand ID' })
		}
		let [brand] = await db.$queryRaw<
			(Brand & {
				role: BrandRole
			})[]
		>`
			SELECT 
				b.id as id,
				b.name as name,
				b."createdAt" as createdAt,
				b."iconId" as iconId,
				b."iconProvider",
				bu.role
			FROM "Brand" b 
			INNER JOIN "BrandUser" bu on bu."userId" = ${req.userId} AND bu."brandId" = b.id
			WHERE b.id = ${brandId}
		`

		if (!brand) return res.status(404).json({ error: 'Brand not found' })

		if (role) {
			if (role == 'OWNER') {
				if (brand.role != 'OWNER')
					return res.status(401).json({
						error: 'You are not the owner of this Brand',
					})
			}
			if (role == 'ADMIN') {
				if (brand.role != 'OWNER' && brand.role != 'ADMIN')
					return res.status(401).json({
						error: 'You are not the owner or an admin of this Brand',
					})
			}
		}

		req.brand = brand

		return next()
	}
}

export function includeCampaign() {
	return async (req: Request, res: Response, next: NextFunction) => {
		if (!req.brand) {
			throw new Error(
				'includeCampaign middleware requires brand to be set on the request object'
			)
		}
		let { campaignId } = req.params as { campaignId: string }
		if (!campaignId) {
			return res.status(400).json({ error: 'Missing Campaign ID' })
		}

		const campaign = await db.campaign.findFirst({
			where: {
				id: campaignId,
				brandId: req.brand.id,
			},
		})
		if (!campaign) {
			return res.status(404).json({ error: 'Campaign not found' })
		}

		req.campaign = campaign

		return next()
	}
}
