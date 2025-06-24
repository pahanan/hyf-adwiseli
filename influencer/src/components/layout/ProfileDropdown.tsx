import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/Popover'
import { cn } from '@/helpers/utils'
import useUser from '@/hooks/use-user'
import { PopoverClose } from '@radix-ui/react-popover'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'

export function ProfileDropdownPopover({
	children,
}: {
	children?: React.ReactNode
}) {
	const { user } = useUser()

	return (
		<Popover>
			<PopoverTrigger>{children}</PopoverTrigger>
			<PopoverContent
				className={cn('p-0 mb-2 shadow-2xl shadow-neutral-300 border ')}
				style={{
					width: '225px',
				}}
			>
				<div className="flex flex-col">
					<div className="p-3">
						<h3 className="text-sm font-medium">
							{user?.fullName}
						</h3>
						<p className="text-xs text-neutral-700">
							{user?.email}
						</p>
					</div>
					<PopoverClose asChild>
						<button
							className={cn(
								'rounded-b-md cursor-pointer font-semibold transition-all group p-3 border-t flex items-center focus:outline-none'
							)}
							onClick={() => {}}
						>
							<div className="flex items-center gap-2 text-neutral-700">
								<LogOut
									strokeWidth={2}
									size={14}
									className="text-neutral-700m group-hover:text-error transition-all"
								/>
								<p
									className={cn(
										'text-xs text-neutral-700 group-hover:text-error transition-all line-clamp-1'
									)}
								>
									Sign out
								</p>
							</div>
						</button>
					</PopoverClose>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default function ProfileDropdown() {
	const { user } = useUser()
	return (
		<ProfileDropdownPopover>
			<div className="px-4 py-4 gap-3 lg:gap-[72px] hover:bg-neutral-50 flex-shrink-0 flex items-center border-neutral-200 group  w-fit lg:w-full justify-between transition-colors delay-50 group cursor-pointer">
				<div className="flex flex-shrink gap-3 items-center">
					<Avatar className="w-[23px] h-[23px] rounded-md group-hover:opacity-70 transition-all object-cover border-white">
						<AvatarImage
							className="rounded-md"
							src={user?.ttAccount?.profilePictureURL || ''}
						/>
						<AvatarFallback className="rounded-md" />
					</Avatar>
					<div className="truncate">
						<p
							className={cn(
								'text-[15px] text-neutral-900 font-semibold text-start truncate group-hover:text-neutral-700 transition-all'
							)}
						>
							{user?.fullName}
						</p>
					</div>
				</div>
				<div className="flex flex-1 items-center justify-end">
					<ChevronsUpDown
						size={14}
						strokeWidth={2.2}
						className="text-neutral-700 group-hover:text-neutral-500 transition-all"
					/>
				</div>
			</div>
		</ProfileDropdownPopover>
	)
}
