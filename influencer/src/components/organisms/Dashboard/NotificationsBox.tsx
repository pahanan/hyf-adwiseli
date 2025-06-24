import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Loading from '@/components/ui/Loading'
import { smartDate } from '@/helpers/date'
import { cn } from '@/helpers/utils'
import getNotifications, { Notification } from '@/queries/user/getNotifications'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const DashboardNotifications = ({
	notifications,
}: {
	notifications: Notification[]
}) => {
	return (
		<div className="flex flex-col w-full gap-2">
			{notifications.map((notification, index) => (
				<Link
					href={notification.url || ''}
					key={index}
					className={cn(
						'rounded-lg border p-4 shadow-gray-400/10 bg-white hover:bg-neutral-50 transition-all'
					)}
				>
					<div className="flex items-center gap-3">
						<Avatar className="size-[35px]">
							<AvatarImage src={notification.iconURL || ''} />
							<AvatarFallback />
						</Avatar>
						<div className="flex flex-col gap-0.5">
							<p className="font-medium text-sm">
								{notification.message}
							</p>
							<p className="text-xs text-gray-500">
								{smartDate(notification.createdAt)}
							</p>
						</div>
					</div>
				</Link>
			))}
			{notifications.length === 0 ? (
				<div className="flex items-center justify-center w-full h-64">
					<p className="text-gray-500">No notifications</p>
				</div>
			) : null}
		</div>
	)
}

export default function NotificationsBox() {
	const { data, isLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => await getNotifications(),
	})

	return (
		<div className="flex max-w-[400px] flex-col gap-4">
			{isLoading || !data ? (
				<div className="flex items-center justify-center w-full h-64">
					<Loading />
				</div>
			) : (
				<DashboardNotifications notifications={data} />
			)}
		</div>
	)
}
