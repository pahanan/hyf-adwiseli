import Layout from '@/components/layout'
import { useRouter } from 'next/router'

function DashboardBrandPage() {
	const router = useRouter()
	const { brandId } = router.query

	return (
		<Layout active="dashboard" title="Dashboard">
			<h1 style={{ textAlign: 'center', marginTop: '100px' }}>
				Welcome top the Dashboard page: your brand Id is :{brandId}
			</h1>
		</Layout>
	)
}

export default DashboardBrandPage
