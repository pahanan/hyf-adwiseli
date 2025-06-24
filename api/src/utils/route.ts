import { Router } from 'express'

type createRouterOptions = {
	router: (router: Router) => void
	rateLimit?: {
		windowMs: number
		max: number
	}
}

export function createRouter(
	props: createRouterOptions | ((router: Router) => void)
): Router {
	const router = Router({ mergeParams: true })
	if (typeof props === 'function') {
		props(router)
	} else {
		/*if (props.rateLimit) {
			router.use(
				rateLimit({
					windowMs: props.rateLimit.windowMs,
					max: props.rateLimit.max,
				})
			)
		}*/

		props.router(router)
	}
	return router
}

export function getPrioritizedRoutePaths(routePaths: string[]) {
	return routePaths.sort((a, b) => {
		let aSplit = a.split('/')
		let bSplit = b.split('/')
		let aLength = aSplit.length
		let bLength = bSplit.length
		let minLength = Math.min(aLength, bLength)
		for (let i = 0; i < minLength; i++) {
			if (aSplit[i].startsWith(':') && !bSplit[i].startsWith(':'))
				return 1
			if (!aSplit[i].startsWith(':') && bSplit[i].startsWith(':'))
				return -1
		}
		return aLength - bLength
	})
}
