import { BaseInput } from '@/components/ui/Input'
import { SearchFilters } from '@/queries/influencers/searchInfluencers'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type SearchFiltersProps = {
	filters: SearchFilters
	setFilters: (filters: SearchFilters) => void
}

export default function FilteringBar({
	filters,
	setFilters,
}: SearchFiltersProps) {
	const [search, setSearch] = useState<string>('')
	const debouncedSearch = useDebouncedCallback((value: string) => {
		if (!value) {
			setFilters({ ...filters, search: null })
		} else {
			setFilters({ ...filters, search: value })
		}
	}, 300)

	return (
		<div className="bg-white sticky top-0 h-[75px] items-center px-4 border-b flex flex-col lg:flex-row w-full gap-2 z-10">
			<div className="w-full">
				<BaseInput
					placeholder="Search for influencers"
					inputClassName="rounded-lg text-[14px] max-w-none w-full px-3 py-5"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value)
						debouncedSearch(e.target.value)
					}}
				/>
			</div>
		</div>
	)
}
