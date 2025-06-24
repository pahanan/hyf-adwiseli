import { SocialAccount } from '@prisma/client'
import { Client, Receiver } from '@upstash/qstash'
import type { Request } from 'express'

export type QueueData = {
	'tiktok-insights-sync': {
		account: SocialAccount
		type: 'initial' | 'weekly'
	}
	'tiktok-oauth-refresh': {
		account: SocialAccount
	}
	'tiktok-video-download': {
		postId: string
		thumbnailUrl: string
	}
	'social-account-image-uploader': {
		socialAccountId: string
		url: string
	}
	'campaign-matchmaking': {
		campaignId: string
	}
}

class QueueController {
	client = new Client({
		token: process.env.QSTASH_TOKEN,
	})
	receiver = new Receiver({
		currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY as string,
		nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY as string,
	})

	async isValid(req: Request) {
		const signature = req.headers['upstash-signature']

		try {
			await this.receiver.verify({
				signature: signature as string,
				// @ts-ignore
				body: req.rawBody,
			})

			return true
		} catch (error) {
			console.error(error)
			return false
		}
	}

	async publish<T extends keyof QueueData>(queue: T, data: QueueData[T]) {
		const queueObj = this.client.queue({
			queueName: queue,
		})

		return await queueObj.enqueueJSON({
			url: 'https://api.adwiseli.com/qstash',
			body: {
				type: queue,
				data: data,
			},
		})
	}

	processQueue<T extends keyof QueueData>(
		handler: (data: QueueData[T]) => Promise<void>
	) {
		return async (data: QueueData[T]) => await handler(data)
	}
}

export default new QueueController()
