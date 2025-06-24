import { cn } from '@/helpers/utils'
import useBrand from '@/hooks/use-brand'
import { ChevronsUpDown } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'

export default function BrandDropdown() {
	const { brand } = useBrand()
	return (
		<div className="px-4 py-4 hover:bg-neutral-50 flex-shrink-0 flex items-center border-neutral-200 group  w-full justify-between transition-colors delay-50 group cursor-pointer">
			<div className="flex flex-shrink gap-3 items-center">
				<Avatar className="w-[23px] h-[23px] rounded-md group-hover:opacity-70 transition-all object-cover border-white">
					<AvatarImage className="rounded-md" src={brand?.iconURL} />
					<AvatarFallback className="rounded-md" />
				</Avatar>
				<div className="truncate">
					<p
						className={cn(
							'text-[15px] text-neutral-900 font-semibold text-start truncate group-hover:text-neutral-700 transition-all'
						)}
					>
						{brand?.name}
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
	)
}
