'use client';

function DashboardContainer() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-gray-200 rounded-xl p-8 shadow">
          {/* Dashboard content */}
          <h1 className="text-xl font-bold mb-4">Statistics Overview</h1>
        </div>
      </main>
    </div>
  );
}

export default DashboardContainer;