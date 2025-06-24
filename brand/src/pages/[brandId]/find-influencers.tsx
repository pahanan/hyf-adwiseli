import Layout from '@/components/layout'
import FilteringBar from '@/components/organisms/FindInfluencers/FilteringBar'
import InfluencerInfoModal from '@/components/organisms/Modals/InfluencerInfoModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import toCamelCase from '@/helpers/toPascalCase'
import withBrand from '@/hoc/with-brand'
import searchInfluencers, {
	SearchFilters,
} from '@/queries/influencers/searchInfluencers'
import NiceModal from '@ebay/nice-modal-react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState } from 'react'

function FindInfluencers() {
	const [filters, setFilters] = useState<SearchFilters>({
		gender: null,
		search: null,
		interests: [],
	})

	const { data, error, isError, fetchNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ['creators', filters],
			queryFn: async ({ pageParam }) =>
				await searchInfluencers({
					page: pageParam,
					filters: filters,
				}),
			getNextPageParam(lastPage, allPages) {
				return lastPage.length === 25 ? allPages.length + 1 : undefined
			},
			initialPageParam: 1,
		})
	const observer = useRef<IntersectionObserver>()
	const lastElementRef = useRef<HTMLDivElement>(null)
	const observerCallback = useCallback(
		(entries: any) => {
			const [entry] = entries
			if (entry.isIntersecting) {
				if (!data?.pages) return
				if (isFetchingNextPage) return
				if (data.pages[data.pages.length - 1].length < 15) return
				fetchNextPage()
			}
		},
		[data, fetchNextPage, isFetchingNextPage]
	)

	useEffect(() => {
		if (observer.current) observer.current.disconnect()

		observer.current = new IntersectionObserver(observerCallback)
		if (lastElementRef.current)
			observer.current.observe(lastElementRef.current)

		return () => {
			if (observer.current) observer.current.disconnect()
		}
	}, [observerCallback])

	return (
		<Layout active="find-influencers" title="Find influencers">
			<FilteringBar filters={filters} setFilters={setFilters} />
			<div className="flex flex-col gap-3.5">
				{isError ? (
					<div className="text-red-500">Error: {error.message}</div>
				) : status === 'pending' ? (
					<div className="h-64 flex items-center justify-center">
						<Loading size="xs" />
					</div>
				) : data?.pages.length === 0 || data?.pages[0].length === 0 ? (
					<div>
						<div className="flex flex-col items-center justify-center h-64">
							<h2 className="text-secondary font-medium">
								No creators found from these filters
							</h2>
							<p className="text-paragraph text-sm">
								Please try different filters
							</p>
						</div>
					</div>
				) : (
					<div className="overflow-x-auto overflow-y-auto no-scrollbar h-[calc(100vh-136px)] w-full">
						<table className="w-full border-collapse">
							<thead>
								<tr className="bg-white">
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Name
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Gender
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Country
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Followers
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Engagement Rate
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Avg. Views
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{data.pages.map((page, i) =>
									page.map((creator) => (
										<tr
											key={creator.id}
											onClick={() =>
												NiceModal.show(
													InfluencerInfoModal,
													{ influencerId: creator.id }
												)
											}
											className="hover:bg-neutral-50 cursor-pointer"
										>
											<td className="px-4 w-[24%] text-sm py-3.5 border-y">
												<div className="flex items-center gap-2">
													<div className="relative">
														<div className="rounded-full border shadow-sm">
															<Avatar className="size-9 border-2 border-white">
																<AvatarImage
																	src={
																		creator
																			.ttAccount
																			.profilePictureURL
																	}
																/>
																<AvatarFallback />
															</Avatar>
														</div>
														{creator.country ? (
															<img
																src={`https://hatscripts.github.io/circle-flags/flags/${creator?.country?.toLowerCase()}.svg`}
																className="w-4 h-4 absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
															/>
														) : null}
													</div>
													<div className="flex flex-col">
														<p className="font-medium line-clamp-1">
															{creator.fullName}
														</p>
														<p className="text-neutral-700 font-base line-clamp-1">
															@
															{creator.ttAccount
																.username ||
																'-'}
														</p>
													</div>
												</div>
											</td>
											<td className="px-4 py-4 border-y">
												<Badge
													size={'sm'}
													stroke={true}
													color={
														creator.gender ===
														'FEMALE'
															? 'pink'
															: 'blue'
													}
												>
													{toCamelCase(
														creator.gender
													)}
												</Badge>
											</td>
											<td className="px-4 py-4 border-y">
												<Badge
													leadingContent={
														<img
															src={`https://hatscripts.github.io/circle-flags/flags/${creator.country.toLowerCase()}.svg`}
															className="w-2.5 h-2.5 rounded-full object-cover"
														/>
													}
													size={'sm'}
													stroke={true}
												>
													{creator.country}
												</Badge>
											</td>
											<td className="px-4 text-sm font-medium py-4 border-y">
												{creator.ttAccount.followers?.toLocaleString() ||
													'-'}
											</td>
											<td className="px-4 text-sm font-medium py-4 border-y">
												{creator.ttAccount
													.engagementRate
													? `${creator.ttAccount.engagementRate.toFixed(
															2
														)}%`
													: '-'}
											</td>
											<td className="px-4 text-sm font-medium py-4 border-y">
												{creator.ttAccount.averageViews?.toLocaleString() ||
													'-'}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>

						{isFetchingNextPage && (
							<div className="flex flex-col items-center justify-center h-24 gap-2">
								<p className="text-sm font-medium text-secondary">
									Loading more creators...
								</p>
								<Loading size="xs" />
							</div>
						)}
						{!isFetchingNextPage &&
							(data?.pages[data.pages.length - 1]?.length || 0) <
								25 && (
								<div className="flex items-center justify-center h-24">
									<p className="text-secondary text-sm">
										{`${data?.pageParams}` == '1' &&
										(data?.pages[0]?.length || 0) <= 0
											? 'No creators found from these filters'
											: 'No more creators to show'}
									</p>
								</div>
							)}
						<div ref={lastElementRef} style={{ height: '1px' }} />
					</div>
				)}
			</div>
		</Layout>
	)
}

export default withBrand(FindInfluencers)
