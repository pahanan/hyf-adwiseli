import { Request, Response, NextFunction } from 'express'
type CorsOptions = {
  restrictedOrigin?: boolean
  origin?: string
}
export default function cors(options?: CorsOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (options?.restrictedOrigin) {
      const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://hyf-adwiseli-brand.vercel.app/', 'https://hyf-adwiseli-influencer.vercel.app/']
      const origin = req.headers.origin
      if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
      } else {
        res.header('Access-Control-Allow-Origin', 'null')
        // return res.status(403).send('CORS policy: Origin not allowed')
      }
      res.header('Access-Control-Allow-Credentials', 'true')
    } else {
      res.header('Access-Control-Allow-Origin', '*')
    }
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Content-Length, X-Requested-Width, Accept, Access-Control-Allow-Credentials'
    )
    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else {
      next()
    }
  }
}
