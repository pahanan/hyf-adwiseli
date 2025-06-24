import { cn } from '@/helpers/utils'

type RadioSelectProps = {
	headline: string
	description: string
	selected?: boolean
	onSelect?: () => void
	large?: boolean
	className?: string
}

export default function RadioSelect(props: RadioSelectProps) {
	return props.large ? (
		<button
			type="button"
			className={cn(
				'cursor-pointer shadow-sm text-left flex rounded-2xl border border-gray-600/10 gap-10 p-4 hover:bg-neutral-50 transition-all',
				props.selected &&
					'border-primary bg-primary/10 hover:bg-primary/10',
				props.className
			)}
			onClick={props.onSelect}
		>
			{props.selected ? (
				<div className="h-5 w-5 mt-1 rounded-full flex items-center justify-center relative bg-primary border">
					<div className="w-2 h-2 bg-white rounded-full absolute"></div>
				</div>
			) : (
				<div className="h-5 w-5 mt-1 rounded-full bg-white border"></div>
			)}
			<div className="flex flex-col gap-1 flex-1">
				<h2 className="font-semibold text-secondary text-sm">
					{props.headline}
				</h2>
				<p className="text-paragraph text-sm">{props.description}</p>
			</div>
		</button>
	) : (
		<button
			className={cn('flex gap-2 items-center', props.className)}
			onClick={props.onSelect}
		>
			{props.selected ? (
				<div className="h-5 w-5 rounded-full flex items-center justify-center relative bg-primary border">
					<div className="w-2 h-2 bg-white rounded-full absolute"></div>
				</div>
			) : (
				<div className="h-5 w-5 rounded-full bg-white border"></div>
			)}
			<h2 className="font-semibold text-secondary text-sm">
				{props.headline}
			</h2>
		</button>
	)
}
