import useUser from "@/hooks/use-user";
import useDashboardData from "@/hooks/use-dashboard-data";
import Loading from "@/components/ui/Loading";
import DashboardCard from "@/components/organisms/Dashboard/DashboardCard";

function DashboardContainer() {
  const { user } = useUser();
  const { cards, loading, error } = useDashboardData(user?.id || '');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 mt-[12px] ml-[146px] mr-0 mb-0">
        <div className="bg-[#E9E9E9] rounded-xl shadow pt-[37px] pl-[34px] pr-[35px] pb-[36px] mx-2 sm:mx-4 md:mx-[30px]">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h1 className="text-xl font-bold">Statistics Overview</h1>
          </div>

      

              {/* ✅ Loading */}
              {loading && (
                 <div className="flex items-center justify-center min-h-[200px] col-span-full">
                  <Loading color="#FF5500" size="xs" />
                </div>
              )}

              {/* ✅ Error */}
              {!!error && (
                <div className="text-red-600 text-center p-4 col-span-full">
                  {error || 'Something went wrong'}
                </div>
              )}

               {/* ✅ Cards */}

              {cards &&
                cards.map((card, index) => (
                   <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-[200px] aspect-[16/10]"
                  >
                    <DashboardCard card={card} />
                  </div>
                ))
              }
        </div>
      </main>
    </div>
  );
}

export default DashboardContainer;
