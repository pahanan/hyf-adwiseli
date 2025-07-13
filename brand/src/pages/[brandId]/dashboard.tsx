import Layout from '@/components/layout'
import { useRouter } from 'next/router'
import DashboardContainer from '@/components/organisms/Dashboard/DashboardContainer'

function DashboardBrandPage() {
	const router = useRouter()
	const { brandId } = router.query

	return (
		<Layout active="dashboard" title="Dashboard">
			<DashboardContainer/>
		</Layout>
	)
}

export default DashboardBrandPage
