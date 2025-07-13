import useUser from "@/hooks/use-user";
import useDashboardData from "@/hooks/use-dashboard-data";
import Loading from "@/components/ui/Loading";
import DashboardCard from "@/components/organisms/Dashboard/DashboardCard";
import { useRouter } from 'next/router'
function DashboardContainer() {
    const router = useRouter()
    const { brandId } = router.query
    const { cards, loading, error } = useDashboardData(brandId as string)
    const visibleCards = cards?.slice(0, 9);
  return (
  <div className="flex min-h-screen bg-white">
    <main className="flex-1 px-4 sm:px-6 md:px-8 py-6">
      <div className="bg-[#E9E9E9] rounded-2xl p-6 sm:p-8 shadow-md">
        <h1 className="text-base sm:text-lg font-semibold mb-6">
          Statistics Overview
        </h1>

        {/* ✅ Loading */}
        {loading && (
          <div className="flex items-center justify-center bg-white min-h-[200px] rounded-xl">
            <Loading color="#FF5500" size="xs" />
          </div>
        )}

        {/* ✅ Error */}
        {!!error && (
          <div className="text-red-600 text-center p-4">
            {error || 'Something went wrong'}
          </div>
        )}

        {/* ✅ Cards */}
        {visibleCards && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {visibleCards.map((card, index) => (
              <DashboardCard key={index} card={card} />
            ))}
          </div>
        )}
      </div>
    </main>
  </div>
);
}
export default DashboardContainer;






