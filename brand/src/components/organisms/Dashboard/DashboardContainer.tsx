import useUser from "@/hooks/use-user";
import useDashboardData from "@/hooks/use-dashboard-data";
import Loading from "@/components/ui/Loading";
import DashboardCard from "@/components/organisms/Dashboard/DashboardCard";

function DashboardContainer() {
  const { user } = useUser();

  const { cards, loading, error } = useDashboardData(user?.id || '');

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-white min-h-[200px]">
        <Loading color="#FF5500" size="xs" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error || 'Something went wrong'}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold">Statistics Overview</h1>
          </div>

          {cards && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <DashboardCard
                  key={index}
                  label={card.label}
                  value={card.value}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default DashboardContainer;
