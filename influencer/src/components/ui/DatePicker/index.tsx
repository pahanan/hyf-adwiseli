'use client'

import * as React from 'react'
import { BaseInput } from '../Input'

type DatePickerProps = {
	date?: Date
	onSelect: (date: Date | undefined) => void
}

export function DatePicker({ onSelect }: DatePickerProps) {
	const [month, setMonth] = React.useState('')
	const [day, setDay] = React.useState('')
	const [year, setYear] = React.useState('')

	// Update the hidden date input when any field changes
	React.useEffect(() => {
		if (month && day && year && year.length === 4) {
			// Ensure values are padded with leading zeros if needed
			const paddedMonth = month.padStart(2, '0')
			const paddedDay = day.padStart(2, '0')

			const newDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)
			if (isNaN(newDate.getTime())) {
				onSelect(undefined)
				return
			}
			// Format as YYYY-MM-DD for the date input
			onSelect(newDate)
		} else {
			onSelect(undefined)
		}
	}, [month, day, year])

	// Handle input changes
	const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 2)
		if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 12)) {
			setMonth(value)
		}
	}

	const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 2)
		if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 31)) {
			setDay(value)
		}
	}

	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '').slice(0, 4)
		setYear(value)
	}

	return (
		<div className="flex items-center">
			<BaseInput
				placeholder="DD"
				value={day}
				onChange={handleDayChange}
				className="w-16 text-center"
				maxLength={2}
			/>
			<span className="mx-2">/</span>
			<BaseInput
				placeholder="MM"
				value={month}
				onChange={handleMonthChange}
				className="w-16 text-center"
				maxLength={2}
			/>
			<span className="mx-2">/</span>
			<BaseInput
				placeholder="YYYY"
				value={year}
				onChange={handleYearChange}
				className="w-20 text-center"
				maxLength={4}
			/>
		</div>
	)
}
