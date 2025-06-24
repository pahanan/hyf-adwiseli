import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import useBrand from '@/hooks/use-brand'
import getCampaigns from '@/queries/campaigns/getCampaigns'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'

export default function CampaignsTable() {
	const { brand } = useBrand()

	const { data, isLoading } = useQuery({
		queryKey: ['campaigns', brand?.id],
		queryFn: async () =>
			await getCampaigns({ brandId: brand?.id as string }),
	})

	return (
		<div className="w-full border rounded-lg">
			<div className="bg-white rounded-t-lg px-4 py-3 border-b">
				<p className="font-medium">My campaigns</p>
			</div>
			{!isLoading && data && data.length == 0 ? (
				<div className="w-full min-h-[400px] flex flex-col gap-7 items-center justify-center bg-white rounded-b-lg overflow-hidden">
					<div className="flex flex-col gap-1">
						<h3 className="font-medium text-center text-lg">
							No active campaigns
						</h3>
						<p className="font-base text-neutral-700 text-center">
							Create a new campaign to continue
						</p>
					</div>
					<Link href={`/${brand?.id}/new-campaign`}>
						<Button size="sm">Create campaign</Button>
					</Link>
				</div>
			) : data ? (
				<table className="w-full border-collapse bg-white rounded-b-lg overflow-hidden">
					<thead>
						<tr className="bg-neutral-50 text-neutral-500 text-sm">
							<th className="px-4 py-3 font-semibold text-left">
								Name
							</th>
							<th className="px-4 py-3 font-semibold text-left">
								Status
							</th>
							<th className="px-4 py-3 font-semibold text-left">
								Goal
							</th>
							<th className="px-4 py-3 font-semibold text-left">
								Type
							</th>
							<th className="px-4 py-3 font-semibold text-left">
								Created
							</th>
						</tr>
					</thead>

					<tbody>
						{data.map((row) => (
							<tr
								key={row.id}
								className="border-t border-gray-200 hover:bg-gray-50"
							>
								<Link
									href={`/${brand?.id}/campaigns/${row.id}`}
								>
									<td className="px-4 py-3 font-medium text-gray-800">
										{row.name}
									</td>
								</Link>

								<td className="px-4 py-3">
									<Badge
										className="rounded-md"
										size={'sm'}
										color="green"
									>
										{row.status}
									</Badge>
								</td>
								<td className="px-4 py-3">{row.goal}</td>
								<td className="px-4 py-3">{row.contentType}</td>
								<td className="px-4 py-3">{row.createdAt}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="h-64 bg-white flex items-center justify-center">
					<Loading />
				</div>
			)}
		</div>
	)
}
