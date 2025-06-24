import { register } from 'tsconfig-paths'

register({
	baseUrl: './dist',
	paths: {
		'@/routes/*': ['routes/*'],
		'@/controllers/*': ['controllers/*'],
		'@/constants/*': ['constants/*'],
		'@/middlewares/*': ['middlewares/*'],
		'@/utils/*': ['utils/*'],
		'@/helpers/*': ['helpers/*'],
		'@/queues/*': ['queues/*'],
	},
})
