import Button from '@/components/ui/Button'
import { cn } from '@/helpers/utils'

type EmptyStateProps = {
	headline: string
	description?: string
	icon?: React.ReactNode
	action?: string
}

export default function EmptyState(props: EmptyStateProps) {
	return (
		<div className="flex-1 relative h-full w-full flex justify-center">
			<div className="w-[350px] top-36 relative z-[20] flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<h3 className="font-medium text-lg text-neutral-900">
						{props.headline}
					</h3>
					<p className="text-sm text-neutral-600">
						{props.description}
					</p>
				</div>
			</div>
			<div
				className={cn(
					'absolute inset-0',
					'[background-size:20px_20px]',
					'[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]',
					'dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]'
				)}
			/>

			<div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
		</div>
	)
}
