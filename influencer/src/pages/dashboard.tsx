import { useRouter } from "next/router";
import Layout from "@/components/layout";
function InfluencerDashboard(){
const router= useRouter()
const { brandId}= router.query

return(
  <Layout>
    <div>

    <p style={{textAlign:"center", marginTop:"40px"}}>Welcome to Influencer Dashboard </p>
    </div>
  </Layout>
  
)
}
export default InfluencerDashboard