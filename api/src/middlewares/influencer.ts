import { NextFunction, Request, Response } from 'express'

export function includeInfluencer() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// mocking session management
		req.influencerId = 'inf-001'
		next()
	}
}

export function ensureInfluencer() {
	return async (req: Request, res: Response, next: NextFunction) => {
		// mocking authentication and session management
		req.sessionId = '1'
		req.influencerId = 'inf-001'
		return next()
	}
}
