import useUser from '@/hooks/use-user'
import useDashboardData from '@/hooks/use-dashboard-data'
function DashboardContainer() {
	const { user, isLoading: userLoading, isError: userError } = useUser()
	const influencerId = user?.id || ''
	const { cards, loading, error } = useDashboardData(influencerId)
	if (userLoading) return <div>Loading user data...</div>
	if (userError) return <div>Error loading user data</div>
	if (loading)
		return <div className="text-gray-500">Loading dashboard data...</div>
	if (error)
		return (
			<div className="text-red-600">
				Error: {error || 'Something went wrong'}
			</div>
		)
	return (
		<div className="flex min-h-screen bg-gray-100">
			<main className="flex-1 p-8">
				<div className="bg-white rounded-xl p-8 shadow">
					<div className="flex justify-between items-center mb-8">
						<h1 className="text-xl font-bold">
							Statistics Overview
						</h1>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{cards?.map((card, index) => (
							<div
								key={index}
								className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
							>
								<p className="text-gray-500 text-sm">
									{card.label}
								</p>
								<p className="text-2xl font-bold text-gray-900">
									{card.value}
								</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
export default DashboardContainer
