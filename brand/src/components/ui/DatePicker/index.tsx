'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/helpers/utils'
import Button from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/Popover'

type DatePickerProps = {
	date?: Date
	onSelect?: (date: Date | undefined) => void
	toDate?: Date
	fromDate?: Date
}

export function DatePicker({
	date,
	onSelect,
	toDate,
	fromDate,
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-full justify-start text-left font-normal rounded-xl text-sm shadow-sm text-gray-600'
					)}
				>
					<div className="flex items-center gap-2">
						<CalendarIcon className="size-4" />
						{date ? (
							format(date, 'MMMM d, yyyy')
						) : (
							<span>Pick a date</span>
						)}
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					onSelect={onSelect}
					initialFocus
					toDate={toDate}
					fromDate={fromDate}
				/>
			</PopoverContent>
		</Popover>
	)
}
