require('dotenv').config({ path: './.env', override: true })
import express from 'express'
import type { Request, Response } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import { getFiles, getRouteName } from '@/utils/files'
import { getPrioritizedRoutePaths } from '@/utils/route'
import db from '@/controllers/DatabaseController'
import cors from '@/middlewares/cors'
import * as Sentry from '@sentry/node'
const app = express()
const httpServer = http.createServer(app)
app.set('timeout', 300000)
app.set('headersTimeout', 300000)
httpServer.setTimeout(300000)
httpServer.headersTimeout = 300000
app.use(
  bodyParser.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      if (req.originalUrl.startsWith('/qstash')) {
        // @ts-ignore
        req.rawBody = buf.toString()
      }
    },
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cookie-parser')())
app.use(require('express-device').capture())
async function start() {
  try {
    console.log('\x1b[32mstart\x1b[0m Express Server')
    console.log('\x1b[32mstart\x1b[0m Prisma Client')
    await db.$connect()
    Sentry.setupExpressErrorHandler(app)
    const routePaths = getPrioritizedRoutePaths(
      getFiles({
        dirPath: `${__dirname}/routes`,
        extension: ['.ts', '.js'],
        excludeIfStartsWith: '_',
      })
    )
    for (const routePath of routePaths) {
      const route = await import(routePath)
      const routeName = getRouteName(routePath.replace(`${__dirname}/routes`, ''))
      if (routeName === '/') {
        app.use(route.default)
      } else if (
        routeName.startsWith('/brand') ||
        routeName.startsWith('/influencer')
      ) {
        app.use(
          routeName,
          cors({
            restrictedOrigin: true,
            origin: routeName.startsWith('/brand')
              ? process.env.BRAND_URL
              : process.env.INFLUENCER_URL,
          }),
          route.default
        )
      } else {
        app.use(routeName, cors(), route.default)
      }
    }
    const tasks = getFiles({
      dirPath: `${__dirname}/tasks`,
      extension: ['.ts', '.js'],
      excludeIfStartsWith: '_',
    })
    for (const taskPath of tasks) {
      await import(taskPath)
    }
    const portEnv = process.env.PORT
    const port = portEnv ? Number(portEnv) : 8080
    if (isNaN(port) || port <= 0 || port >= 65536) {
      console.error(`:x: Invalid PORT value in environment variables: ${portEnv}`)
      process.exit(1)
    }
    httpServer.listen(port, '0.0.0.0', () => {
      const nodeEnv = process.env.NODE_ENV || 'development'
      console.log()
      console.log(
        `\x1b[32m√ Express server is running on \x1b[36mhttp://localhost:${port}\x1b[0m (${nodeEnv})`
      )
    })
  } catch (err) {
    console.error('Error during server start:', err)
    process.exit(1)
  }
}
process.on('uncaughtException', function (err) {
  console.error(err)
  console.log('Node NOT Exiting...')
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(err)
  }
})
start()