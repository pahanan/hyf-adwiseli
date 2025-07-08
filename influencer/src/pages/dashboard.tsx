import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import DashboardContainer from '@/components/organisms/Dashboard/DashboardContainer'

function InfluencerDashboard() {
	const router = useRouter()
	const { brandId } = router.query

	return (
		<Layout>
			<DashboardContainer />
		</Layout>
	)
}
export default InfluencerDashboard
