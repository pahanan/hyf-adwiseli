import Layout from '@/components/layout'
import ConnectTikTokBox from '@/components/organisms/ConnectTikTok/ConnectTikTokBox'
import NotificationsBox from '@/components/organisms/Dashboard/NotificationsBox'
import useUser from '@/hooks/use-user'

function Dashboard() {
	const user = useUser()

	return (
		<Layout
			active="dashboard"
			title={
				user.user?.ttAccount ? 'Notifications' : 'Connect your TikTok'
			}
		>
			<div className="p-4">
				{user.user?.ttAccount ? (
					<NotificationsBox />
				) : (
					<ConnectTikTokBox />
				)}
			</div>
		</Layout>
	)
}

export default Dashboard
