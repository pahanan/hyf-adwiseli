import { useRouter } from "next/router";
import Layout from "@/components/layout";

function InfluencerDashboard(){
const router= useRouter()
const { brandId}= router.query

return(
  <Layout active="dashboard" title="Dashboard">
    <h1 style={{ textAlign: 'center', marginTop: '100px' }}>
				Welcome to Influencer Dashboard{brandId}
			</h1>
  </Layout>
  
)
}
export default InfluencerDashboard
