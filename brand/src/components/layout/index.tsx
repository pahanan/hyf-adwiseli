import BrandDropdown from './BrandDropdown'
import Link from 'next/link'
import { ProfileDropdownPopover } from './ProfileDropdown'
import useBrand from '@/hooks/use-brand'
import { cn } from '@/helpers/utils'
import useConversations from '@/hooks/use-conversations'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { useRouter } from 'next/router'

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

export const sidebarCategories: SidebarCategory[] = [
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
				id: 'сampaigns',
				label: 'Campaigns',
				icon: '/images/icons/campaign.svg',
				clickedIcon: '/images/icons/clicked/campaign.svg',
				link: '/',
			},
			{
				id: 'dashboard',
				label: 'Dashboard',
				icon: '/images/icons/campaign.svg',
				clickedIcon: '/images/icons/clicked/campaign.svg',
				link: '/dashboard',
			},
			{
				id: 'find-influencers',
				label: 'Creator Library',
				icon: '/images/icons/users.svg',
				clickedIcon: '/images/icons/clicked/users.svg',
				link: '/find-influencers',
			},
			{
				id: 'new-campaign',
				label: 'New Campaign',
				icon: '/images/icons/plus.svg',
				clickedIcon: '/images/icons/clicked/plus.svg',
				link: '/new-campaign',
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
				label: 'Direct messages',
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
				newPage: true,
			},
			{
				id: '',
				label: 'More about us',
				icon: '/images/icons/users.svg',
				clickedIcon: '/images/icons/clicked/users.svg',
				link: 'https://adwiseli.com/service.html',
				newPage: true,
			},
			{
				id: '',
				label: 'Report an issue',
				icon: '/images/icons/messages.svg',
				clickedIcon: '/images/icons/clicked/messages.svg',
				link: 'https://adwiseli.com/kontakt.html',
				newPage: true,
			},
		],
	},
]

type LayoutProps = {
	children: React.ReactNode
	active?: string
	title?: string
}

export default function Layout({ children, active, title }: LayoutProps) {
	const { brand } = useBrand()
	const router = useRouter()
	const { conversations } = useConversations()

	return (
		<div className="overflow-x-hidden bg-neutral-50 overflow-y-hidden h-screen flex">
			<div className="w-[250px] flex-shrink-0 h-full bg-neutral-50 border-neutral-200 flex flex-col gap-2">
				<ProfileDropdownPopover>
					<BrandDropdown />
				</ProfileDropdownPopover>
				<div className="flex flex-col h-full gap-6">
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
										target={
											subLink.newPage
												? '_blank'
												: undefined
										}
										href={
											subLink.newPage
												? `${subLink.link}`
												: `/${brand?.id}${subLink.link}`
										}
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
										{subLink.numberIndicator && (
											<div
												className={cn(
													'rounded-sm w-[22px] h-[20px] flex items-center justify-center bg-neutral-200',
													active == subLink.id &&
														'bg-transparent'
												)}
											>
												<p className="text-xs">
													{subLink.numberIndicator}
												</p>
											</div>
										)}
									</Link>
								))}
							</div>
						</div>
					))}

					{conversations?.length || 0 > 0 ? (
						<div key="conversations" className="px-4">
							<div className="flex items-center gap-1.5 mb-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2.1"
									stroke="#737373"
									className="size-3.5"
								>
									<path
										d="M11 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V14C3 14.93 3 15.395 3.10222 15.7765C3.37962 16.8117 4.18827 17.6204 5.22354 17.8978C5.60504 18 6.07003 18 7 18V20.3355C7 20.8684 7 21.1348 7.10923 21.2716C7.20422 21.3906 7.34827 21.4599 7.50054 21.4597C7.67563 21.4595 7.88367 21.2931 8.29976 20.9602L10.6852 19.0518C11.1725 18.662 11.4162 18.4671 11.6875 18.3285C11.9282 18.2055 12.1844 18.1156 12.4492 18.0613C12.7477 18 13.0597 18 13.6837 18H15.2C16.8802 18 17.7202 18 18.362 17.673C18.9265 17.3854 19.3854 16.9265 19.673 16.362C20 15.7202 20 14.8802 20 13.2V13M20.1213 3.87868C21.2929 5.05025 21.2929 6.94975 20.1213 8.12132C18.9497 9.29289 17.0503 9.29289 15.8787 8.12132C14.7071 6.94975 14.7071 5.05025 15.8787 3.87868C17.0503 2.70711 18.9497 2.70711 20.1213 3.87868Z"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
								<p className="text-xs font-medium text-neutral-500 uppercase">
									Quick Chats
								</p>
							</div>
							<div className="flex ml-1.5 border-l pl-2 flex-col gap-1 overflow-y-scroll no-scrollbar max-h-[300px]">
								{conversations?.map((conversation) => (
									<Link
										key={conversation.id}
										href={`/${brand?.id}/conversations/${conversation.id}`}
										className={cn(
											'py-1.5 hover:bg-neutral-100 rounded-md flex items-center w-full justify-between gap-2 px-2 transition-all',
											router.asPath ==
												`/${brand?.id}/conversations/${conversation.id}` &&
												'bg-neutral-400/15 hover:bg-neutral-400/15'
										)}
									>
										<div className="flex items-center gap-2">
											<Avatar className="size-4">
												<AvatarImage
													src={
														conversation.influencer
															.profilePictureURL
													}
												/>
												<AvatarFallback />
											</Avatar>
											<p
												className={cn(
													'font-medium text-[14px] text-neutral-700 line-clamp-1'
												)}
											>
												{
													conversation.influencer
														.fullName
												}
											</p>
										</div>
										{conversation.lastMessage &&
										conversation.lastMessage.sender ==
											'INFLUENCER' ? (
											<div className="bg-primary rounded-full size-1.5" />
										) : null}
									</Link>
								))}
							</div>
						</div>
					) : null}
				</div>
			</div>
			<div className="flex-1 bg-white border-l shadow-naviga shadow-neutral-400/10 border-t rounded-tl-lg mt-2.5 w-full h-full flex flex-col">
				{title && (
					<div className="w-full min-h-[50px] h-[50px] flex items-center justify-between bg-white rounded-tl-lg border-b px-4">
						<p className="text-[15px] font-medium">{title}</p>
					</div>
				)}
				{children}
			</div>
		</div>
	)
}
