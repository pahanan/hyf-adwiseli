require('dotenv').config({ path: `./.env.local`, overwrite: true })
require('dotenv').config()

import express from 'express'
import type { Request, Response } from 'express'
import http from 'http'

const app = express()
const httpServer = http.createServer(app)

import bodyParser from 'body-parser'

app.set('timeout', 300000) // 5 minutes
app.set('headersTimeout', 300000) // 5 minutes
httpServer.setTimeout(300000) // 5 minutes
httpServer.headersTimeout = 300000 // 5 minutes

app.use(
	bodyParser.json({
		verify: (
			req: Request,
			res: Response,
			buf: Buffer,
			encoding: string
		) => {
			var url = req.originalUrl
			if (url.startsWith('/qstash')) {
				// @ts-ignore
				req.rawBody = buf.toString()
			}
		},
	})
)
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('cookie-parser')())
app.use(require('express-device').capture())

import { getFiles, getRouteName } from '@/utils/files'
import { getPrioritizedRoutePaths } from '@/utils/route'
import db from '@/controllers/DatabaseController'
import cors from '@/middlewares/cors'

import * as Sentry from '@sentry/node'

async function start() {
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

	for (let i = 0; i < routePaths.length; i++) {
		const routePath = routePaths[i]
		const route = await import(routePath)
		const routeName = getRouteName(
			routePath.replace(`${__dirname}/routes`, '')
		)
		if (routeName === '/') app.use(route.default)
		else if (
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

	for (let i = 0; i < tasks.length; i++) {
		await import(tasks[i])
	}

	httpServer.listen(parseInt(process.env.PORT as string), '0.0.0.0', () => {
		console.log()
		console.log(
			`\x1b[32m√ Express server is running on \x1b[36mhttp://localhost:${process.env.PORT}\x1b[0m (${process.env.NODE_ENV})`
		)
	})
}

process.on('uncaughtException', function (err) {
	console.error(err)
	console.log('Node NOT Exiting...')
	if (process.env.NODE_ENV === 'production') {
		Sentry.captureException(err)
	}
})

start()
