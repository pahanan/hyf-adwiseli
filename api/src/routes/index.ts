import { createRouter } from '@/utils/route'

export default createRouter((router) => {
	router.get('/', (req, res) => {
		res.send('Hello World')
	})
})
