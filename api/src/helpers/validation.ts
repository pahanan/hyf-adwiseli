import { Request, Response } from 'express'
import * as z from 'zod'

export function bodyValidate(
	res: Response,
	req: Request,
	schema: z.ZodObject<any, any> | z.ZodEffects<any, any>
) {
	try {
		const data = schema.parse(req.body)
		req.body = data
		return true
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map((issue: any) => ({
				message: `${issue.path.join('.')} is ${issue.message}`,
			}))
			console.log(errorMessages)
			res.status(400).json({
				error: 'Invalid data',
				errorDescription: 'The data you sent is invalid',
				details: errorMessages,
			})
		} else {
			res.status(500).json({
				error: 'Internal Server Error',
				errorDescription: 'An error occurred while validating the data',
			})
		}
		return false
	}
}
