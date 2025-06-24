import { cn } from '@/helpers/utils'
import {
	TooltipProvider,
	Tooltip as RadixTooltip,
	TooltipTrigger,
	TooltipContent,
} from './provider'

export default function Tooltip({
	content,
	jsx,
	children,
	className,
	triggerClassName,
	style,
	align = 'center',
}: {
	content?: string
	jsx?: React.ReactNode
	children: React.ReactNode
	className?: string
	triggerClassName?: string
	style?: React.CSSProperties
	align?: 'center' | 'start' | 'end'
}) {
	if (!content && !jsx) return <>{children}</>
	return (
		<TooltipProvider>
			<RadixTooltip delayDuration={100}>
				<TooltipTrigger className={triggerClassName} asChild>
					{children}
				</TooltipTrigger>
				<TooltipContent
					className={cn(className)}
					style={style}
					align={align}
				>
					{content && (
						<p
							className={cn(
								className,
								'font-medium max-w-[300px]'
							)}
						>
							{content}
						</p>
					)}
					{jsx && jsx}
				</TooltipContent>
			</RadixTooltip>
		</TooltipProvider>
	)
}
