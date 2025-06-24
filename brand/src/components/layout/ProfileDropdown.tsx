import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/Popover'
import { cn } from '@/helpers/utils'
import useUser from '@/hooks/use-user'
import { PopoverClose } from '@radix-ui/react-popover'
import { ChevronsUpDown, LogOut } from 'lucide-react'

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
							{user?.user.firstName} {user?.user.lastName}
						</h3>
						<p className="text-xs text-neutral-700">
							{user?.user?.email}
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
			<div className="group justify-between gap-3 hover:bg-neutral-50 cursor-pointer flex w-fit items-center transition-all delay-50 group">
				<div className="flex items-center gap-2">
					<p className="text-sm font-medium text-neutral-700">
						{user?.user?.firstName} {user?.user?.lastName}
					</p>
				</div>
				<ChevronsUpDown className="size-3 text-neutral-700" />
			</div>
		</ProfileDropdownPopover>
	)
}
