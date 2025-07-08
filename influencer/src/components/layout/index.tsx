import Link from 'next/link'
import { cn } from '@/helpers/utils'
import useConversations from '@/hooks/use-conversations'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { useRouter } from 'next/router'
import useUser from '@/hooks/use-user'
import ProfileDropdown from './ProfileDropdown'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import getNotifications from '@/queries/user/getNotifications'

type SidebarSubLink = {
	label: string
	id: string
	icon: string
	clickedIcon: string
	link: string
	numberIndicator?: number
	newPage?: boolean
}

type SidebarCategory = {
	title: string
	icon?: React.ReactNode
	subLinks: SidebarSubLink[]
}

function getSidebarCategories(user: any) {
	const categories = [
		{
			title: 'General',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.1"
					stroke="#737373"
					className="size-3.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
					/>
				</svg>
			),
			subLinks: [
				{
					id: 'dashboard',
					label: 'Dashboard',
					icon: '/images/icons/campaign.svg',
					clickedIcon: '/images/icons/clicked/campaign.svg',
					link: '/dashboard',
				},
			],
		},
		{
			title: 'Messaging',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.1"
					stroke="#737373"
					className="size-3.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
					/>
				</svg>
			),
			subLinks: [
				{
					id: 'messaging',
					label: 'Inbox',
					icon: '/images/icons/messages.svg',
					clickedIcon: '/images/icons/clicked/messages.svg',
					link: '/conversations',
				},
			],
		},
		{
			title: 'Support',
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.1"
					stroke="#737373"
					className="size-3.5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
					/>
				</svg>
			),
			subLinks: [
				{
					id: '',
					label: 'Ask a question',
					icon: '/images/icons/campaign.svg',
					clickedIcon: '/images/icons/clicked/campaign.svg',
					link: 'https://adwiseli.com/kontakt.html',
				},
				{
					id: '',
					label: 'More about us',
					icon: '/images/icons/users.svg',
					clickedIcon: '/images/icons/clicked/users.svg',
					link: 'https://adwiseli.com/service.html',
				},
				{
					id: '',
					label: 'Report an issue',
					icon: '/images/icons/messages.svg',
					clickedIcon: '/images/icons/clicked/messages.svg',
					link: 'https://adwiseli.com/kontakt.html',
				},
			],
		},
	]

	if (user?.ttAccount) {
		categories[0].subLinks.push({
			id: 'tiktok-connect',
			label: 'My TikTok account',
			icon: '/images/icons/users.svg',
			clickedIcon: '/images/icons/clicked/users.svg',
			link: '/connect/tiktok',
		})
	}

	return categories
}
type LayoutProps = {
	children: React.ReactNode
	active?: string
	title?: string
}

export default function Layout({ children, active, title }: LayoutProps) {
	const { user } = useUser()
	const router = useRouter()
	const { conversations } = useConversations()
	const sidebarCategories = getSidebarCategories(user)
	const [mobileMenuOpened, setMobileMenuOpened] = useState(false)
	const { data, isLoading } = useQuery({
		queryKey: ['notifications'],
		queryFn: async () => await getNotifications(),
	})

	return (
		<div className="overflow-x-hidden bg-neutral-50 lg:overflow-y-hidden h-screen flex flex-col lg:flex-row">
			<div className="lg:w-[250px] flex-shrink-0 lg:h-full bg-neutral-50 border-neutral-200 flex flex-col gap-2">
				<div className="hidden lg:block">
					<ProfileDropdown />
				</div>
				<div className="w-full flex items-center pr-4 justify-between lg:hidden bg-white border-b">
					<ProfileDropdown />
					<div
						onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
						className="cursor-pointer"
					>
						{mobileMenuOpened ? (
							<X size={20} strokeWidth={1.5} />
						) : (
							<Menu size={20} strokeWidth={1.5} />
						)}
					</div>
				</div>
				<div className="hidden lg:flex flex-col h-full gap-6">
					{sidebarCategories.map((category) => (
						<div key={category.title} className="px-4">
							<div className="flex items-center gap-1.5 mb-2">
								{category.icon}
								<p className="text-xs font-medium text-neutral-500 uppercase">
									{category.title}
								</p>
							</div>
							<div className="flex ml-1.5 border-l pl-2 flex-col gap-1">
								{category.subLinks.map((subLink) => (
									<Link
										key={subLink.label}
										href={subLink.link}
										className={cn(
											'py-1.5 hover:bg-neutral-100 rounded-md flex items-center justify-between gap-2 px-2 transition-all',
											active == subLink.id &&
												'bg-neutral-400/15 hover:bg-neutral-400/15'
										)}
									>
										<p
											className={cn(
												'font-medium text-[14px] text-neutral-700'
											)}
										>
											{subLink.label}
										</p>
										{subLink.label === 'Dashboard' && (
											<div className="bg-neutral-200 size-5 rounded-sm flex items-center justify-center">
												<p className="text-[10px] font-medium">
													{data?.length}
												</p>
											</div>
										)}
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
			{mobileMenuOpened && (
				<div className="absolute lg:hidden z-[800] right-0 left-0 bottom-0 top-[56px] p-4 flex flex-col gap-6 bg-white">
					{sidebarCategories.map((category) => (
						<div key={category.title}>
							<div className="flex items-center gap-1.5 mb-2">
								{category.icon}
								<p className="text-xs font-medium text-neutral-500 uppercase">
									{category.title}
								</p>
							</div>
							<div className="flex ml-1.5 border-l pl-2 flex-col gap-1">
								{category.subLinks.map((subLink) => (
									<Link
										onClick={() =>
											setMobileMenuOpened(false)
										}
										key={subLink.label}
										href={subLink.link}
										className={cn(
											'py-1.5 hover:bg-neutral-100 rounded-md flex items-center justify-between gap-2 px-2 transition-all',
											active == subLink.id &&
												'bg-neutral-400/15 hover:bg-neutral-400/15'
										)}
									>
										<p
											className={cn(
												'font-medium text-[14px] text-neutral-700'
											)}
										>
											{subLink.label}
										</p>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			)}
			<div className="flex-1 border-l shadow-naviga shadow-neutral-400/10 lg:border-t lg:rounded-tl-lg lg:mt-2.5 w-full h-full flex flex-col">
				{title && (
					<div className="w-full min-h-[50px] h-[50px] flex items-center justify-between bg-white lg:rounded-tl-lg border-b px-4">
						<p className="text-[15px] font-medium">{title}</p>
					</div>
				)}
				<div
					className={cn(
						'bg-white flex-1 lg:h-full',
						!title && 'lg:rounded-tl-lg'
					)}
				>
					{children}
				</div>
			</div>
		</div>
	)
}
