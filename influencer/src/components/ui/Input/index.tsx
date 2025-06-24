import * as React from 'react'
import { cn } from '@/helpers/utils'
import { Label } from '@/components/ui/Label'
import { useFormField } from '@/components/ui/Form'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	description?: string
	error?: string
	required?: boolean
	internalLabel?: string
	labelClassName?: string
	descriptionClassName?: string
	inputClassName?: string
	groupClassName?: string
}

const BaseInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const {
			label,
			description,
			internalLabel,
			error,
			groupClassName,
			inputClassName,
			...domProps
		} = props

		return (
			<div className={cn('group flex flex-col gap-1.5', className)}>
				{label && (
					<>
						<Label
							className={cn(
								props.labelClassName ||
									'font-semibold text-sm text-gray-800'
							)}
						>
							{label}
						</Label>
					</>
				)}
				{description && (
					<p
						ref={ref}
						className={cn(
							'text-sm text-gray-500 mb-2 font-normal',
							props.descriptionClassName
						)}
					>
						{props.description}
					</p>
				)}
				<div className="flex  items-center">
					{internalLabel && (
						<div className="px-2 text-sm bg-neutral-50 text-paragraph flex items-center justify-center w-[40px] h-[42px] shadow-sm border-t border-l border-b border-gray-600/10 rounded-tl-md rounded-bl-md">
							{internalLabel}
						</div>
					)}
					<input
						type={type}
						className={cn(
							'text-neutral-700 font-normal text-sm bg-white flex py-5 px-4 rounded-md h-10 w-full border border-gray-200 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 ring-primary',
							error && 'ring-rose-500',
							inputClassName,
							internalLabel && ' rounded-l-none border-l-none'
						)}
						ref={ref}
						{...domProps}
					/>
				</div>
				{error && (
					<p
						ref={ref}
						className={cn('text-sm font-medium text-rose-500')}
					>
						{error}
					</p>
				)}
			</div>
		)
	}
)
BaseInput.displayName = 'BaseInput'

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const { error } = useFormField()

		return (
			<BaseInput
				type={type}
				className={className}
				ref={ref}
				{...props}
				error={error?.message || undefined}
			/>
		)
	}
)

FormInput.displayName = 'FormInput'

export { BaseInput, FormInput }
