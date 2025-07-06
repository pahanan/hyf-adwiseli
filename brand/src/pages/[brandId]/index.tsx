import Layout from '@/components/layout'
import CampaignsTable from '@/components/organisms/Dashboard/CampaignsTable'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Loading from '@/components/ui/Loading'
import { prettyDate } from '@/helpers/date'
import toPascalCase from '@/helpers/toPascalCase'
import withBrand from '@/hoc/with-brand'
import useBrand from '@/hooks/use-brand'
import getCampaigns from '@/queries/campaigns/getCampaigns'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Dashboard() {
	const { brand } = useBrand()
	const router = useRouter()

	const { data, isLoading } = useQuery({
		queryKey: ['campaigns', brand?.id],
		queryFn: async () =>
			await getCampaigns({ brandId: brand?.id as string }),
	})
	return (
		<Layout active="сampaigns" title="My campaigns">
			<div className="flex flex-col gap-3.5">
				<div className="w-full">
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
						<table className="w-full border-collapse bg-white overflow-hidden">
							<thead>
								<tr className="bg-white">
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Name
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Status
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Goal
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Type
									</th>
									<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
										Created
									</th>
								</tr>
							</thead>

							<tbody>
								{data.map((row) => (
									<tr
										onClick={() => {
											router.push(
												`/${brand?.id}/campaigns/${row.id}`
											)
										}}
										key={row.id}
										className="border-y cursor-pointer border-gray-200 hover:bg-neutral-50"
									>
										<td className="px-4 tracking-[-0.012em] text-sm w-[25%] py-2.5 font-medium text-gray-800">
											{row.name}
										</td>
										<td className="px-4 py-2.5">
											<Badge
												size={'sm'}
												stroke={true}
												color={
													row.status == 'ACTIVE'
														? 'green'
														: row.status ===
															  'PENDING'
															? 'yellow'
															: 'red'
												}
											>
												{toPascalCase(row.status)}
											</Badge>
										</td>
										<td className="px-4 py-2.5">
											<Badge
												size={'sm'}
												stroke={true}
												color="white"
											>
												{row.goal === 'AWARENESS'
													? '👀'
													: row.goal === 'SALES'
														? '💰'
														: row.goal ===
															  'PROMOTION'
															? '⚡️'
															: '🚀'}{' '}
												{toPascalCase(row.goal)}
											</Badge>
										</td>
										<td className="px-4 py-2.5">
											<Badge
												size={'sm'}
												stroke={true}
												color="white"
											>
												{row.contentType ===
												'INFLUENCER'
													? '📲'
													: '🎥'}{' '}
												{toPascalCase(row.contentType)}
											</Badge>
										</td>
										<td className="px-4 py-2.5 text-sm font-medium text-neutral-700 text-left">
											{prettyDate(row.createdAt)}
										</td>
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
			</div>
		</Layout>
	)
}

export default withBrand(Dashboard)
