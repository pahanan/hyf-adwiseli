import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import { BaseInput } from '.'

type ArrayInputProps = {
	options: string[]
	onChange: (options: string[]) => void
	placeholder?: string
}

export default function ArrayInput({
	options,
	onChange,
	placeholder,
}: ArrayInputProps) {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div ref={ref} className="flex flex-col gap-2">
			{options?.map((option, index) => (
				<div key={index} className="relative">
					<button
						type="button"
						className="group select-none cursor-pointer absolute top-2.5 right-2 flex items-center gap-2"
					>
						<X
							className="text-gray-500 group-hover:text-gray-700"
							size={18}
							onClick={() => {
								let newOptions = [...options]
								newOptions.splice(index, 1)
								onChange(newOptions)
							}}
						/>
					</button>
					<BaseInput
						value={option}
						inputClassName="rounded-xl text-sm px-5 py-5 shadow-sm"
						onChange={(e) => {
							if (e.target.value == '') {
								let newOptions = [...options]
								newOptions.splice(index, 1)
								onChange(newOptions)
								return
							}
							let newOptions = [...options]
							newOptions[index] = e.target.value
							onChange(newOptions)
						}}
					/>
				</div>
			))}
			<BaseInput
				placeholder={placeholder || 'Type here to add another option'}
				inputClassName="rounded-xl text-sm px-5 py-5 shadow-sm"
				onChange={(e) => {
					if (!ref.current) return
					if (e.currentTarget.value == '') return e.preventDefault()

					onChange([...options, e.currentTarget.value])
					e.currentTarget.value = ''
					e.preventDefault()

					// force focus on the last input of a div
					setTimeout(() => {
						if (!ref.current) return
						let inputs = ref.current.querySelectorAll('input')
						let lastInput = inputs[inputs.length - 2]
						lastInput.focus()
					}, 0)
				}}
			/>
		</div>
	)
}
