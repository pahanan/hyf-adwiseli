import { Request, Response, NextFunction } from 'express'

type CorsOptions = {
	restrictedOrigin?: boolean
	origin?: string
}

export default function cors(options?: CorsOptions) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (options?.restrictedOrigin) {
			if (process.env.NODE_ENV == 'development') {
				res.header(
					'Access-Control-Allow-Origin',
					'http://localhost:3000'
				)
			} else {
				res.header('Access-Control-Allow-Origin', `${options.origin}`)
			}
			res.header('Access-Control-Allow-Credentials', 'true')
		} else {
			res.header('Access-Control-Allow-Origin', '*')
		}

		res.header(
			'Access-Control-Allow-Methods',
			'GET,PUT,POST,DELETE,OPTIONS'
		)
		res.header(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials'
		)
		if (req.method === 'OPTIONS') res.sendStatus(200)
		else next()
	}
}
