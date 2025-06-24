import SUPPORTED_COUNTRIES from '@/constants/countries'
import db from '@/controllers/DatabaseController'
import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/countries', async (req, res) => {
		return res.json(SUPPORTED_COUNTRIES)
	})

	router.get('/interests', async (req, res) => {
		const interests = await db.interest.findMany()
		return res.json(interests)
	})
})
