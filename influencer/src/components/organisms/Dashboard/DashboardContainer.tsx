import useUser from "@/hooks/use-user";
import useDashboardData from "@/hooks/use-dashboard-data";
import Loading from "@/components/ui/Loading";
import DashboardCard from "@/components/organisms/Dashboard/DashboardCard";

function DashboardContainer() {
    const { user } = useUser();
    const { cards, loading, error } = useDashboardData(user?.id ||'');

    const visibleCards = cards?.slice(0, 9);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-6">
        <div className="bg-[#E9E9E9] rounded-[20px] p-6 sm:p-8 mx-auto max-h-[80vh] overflow-y-auto">
             <h1 className="text-lg sm:text-xl font-semibold mb-6">Statistics Overview</h1>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-center max-w-6xl mx-auto">
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
