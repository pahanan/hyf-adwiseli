import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { BarList } from '@/components/ui/Charts/BarList'
import { DonutChart } from '@/components/ui/Charts/DonutChart'
import Loading from '@/components/ui/Loading'
import { Modal } from '@/components/ui/Modal'
import Tooltip from '@/components/ui/Tooltip'
import { prettyDate } from '@/helpers/date'
import { twoDecimalFormatting } from '@/helpers/numbers'
import { toastError } from '@/helpers/toasty'
import toPascalCase from '@/helpers/toPascalCase'
import { cn } from '@/helpers/utils'
import useBrand from '@/hooks/use-brand'
import useInterests from '@/hooks/use-interests'
import http, { getError } from '@/queries/http'
import getInfluencer from '@/queries/influencers/getInfluencer'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useQuery } from '@tanstack/react-query'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type InfluencerInfoModalProps = {
	influencerId: string
}

export default NiceModal.create(
	({ influencerId }: InfluencerInfoModalProps) => {
		const modal = useModal()
		const { brand } = useBrand()
		const router = useRouter()
		const [submitting, setSubmitting] = useState(false)
		const [activeTab, setActiveTab] = useState('info')

		const { data, isLoading } = useQuery({
			queryKey: ['influencer', influencerId],
			queryFn: async () =>
				await getInfluencer({
					influencerId,
				}),
		})

		const tabs = [
			{ id: 'info', label: 'Influencer info' },
			{ id: 'performance', label: 'Audience analytics' },
		]

		async function startConversation() {
			if (submitting) return
			setSubmitting(true)

			await http
				.post(`/${brand?.id}/conversations/start-chat/${influencerId}`)
				.then(({ data }: any) => {
					if (data.id) {
						modal.remove()
						router.push(`/${brand?.id}/conversations/${data.id}`)
					} else {
						toastError({
							error: 'Error',
							errorDescription:
								'An error occurred while starting the conversation',
						})
						setSubmitting(false)
					}
				})
				.catch((error) => {
					toastError(getError(error))
					setSubmitting(false)
				})
		}

		const { interests } = useInterests()
		return (
			<Modal
				modal={modal}
				className={cn(
					'p-0 gap-0 bg-white overflow-y-auto no-scrollbar',
					activeTab === 'performance' && 'h-[600px]'
				)}
				headerClassName="p-4 bg-white border-b border-gray-600/10"
				size={'2xl'}
			>
				{isLoading ? (
					<div className="h-64 flex items-center justify-center">
						<Loading />
					</div>
				) : data ? (
					<>
						<div className="relative flex flex-col gap-8 bg-white border-b">
							<div className="flex flex-col gap-4 p-6 pb-0 w-full">
								<div className="flex items-center gap-4">
									<div className="relative rounded-full border shadow-sm">
										<Avatar className="size-16 border-4 border-white">
											<AvatarImage
												src={
													data?.tiktokAccount
														?.profilePictureURL ||
													''
												}
											/>
											<AvatarFallback />
										</Avatar>
										<Tooltip
											content={data.country || 'N/A'}
											triggerClassName="absolute bottom-0 right-0"
											align="start"
										>
											{data.country ? (
												<img
													src={`https://hatscripts.github.io/circle-flags/flags/${data?.country?.toLowerCase()}.svg`}
													className="w-6 h-6 absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
												/>
											) : null}
										</Tooltip>
									</div>
									<div className="flex flex-col">
										<h2 className="font-medium text-neutral-900 text-2xl">
											{data.fullName}
										</h2>
										<Link
											target="_blank"
											href={`https://www.tiktok.com/@${data.tiktokAccount?.username}`}
											className="text-neutral-700 hover:text-primary transition-all"
										>
											@{data.tiktokAccount?.username}
										</Link>
									</div>
								</div>
								<div className="flex items-start max-w-md justify-between w-full">
									<div className="flex flex-col gap-0.5">
										<div className="flex flex-wrap gap-1 mt-1">
											{(interests || [])
												.filter((i) =>
													data.interests.includes(
														i.id
													)
												)
												.map((interest) => (
													<p
														key={interest.id}
														className="rounded-full px-2 py-1 text-xs font-normal border shadow-sm"
													>
														{interest.name}
													</p>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className="flex px-6 items-center gap-6">
								{tabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`
											font-medium 
											text-sm 
											pb-1.5 
											transition-colors 
											duration-200 
											${
												activeTab === tab.id
													? 'border-b-2 border-neutral-900 text-neutral-900'
													: 'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700'
											}
										`}
									>
										{tab.label}
									</button>
								))}
								<button
									disabled={submitting}
									onClick={startConversation}
									className={`
											font-medium 
											text-sm 
											pb-1.5 
											transition-colors 
											duration-200 
											border-b-2 border-transparent text-neutral-500 hover:text-neutral-700
										`}
								>
									Message creator
								</button>
							</div>
						</div>
						<div className="p-6 bg-white">
							{activeTab === 'info' && (
								<div>
									<div className="grid grid-cols-3 gap-4 gap-y-8">
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Full Name
											</p>
											<p className="font-medium truncate">
												{data.fullName}
											</p>
										</div>
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Gender
											</p>
											<p className="font-medium truncate">
												{data.gender
													? toPascalCase(data.gender)
													: '-'}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Country
											</p>
											<p className="font-medium truncate">
												{data.country}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Username
											</p>
											<p className="font-medium truncate">
												@{data.tiktokAccount?.username}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Member since
											</p>
											<p className="font-medium truncate">
												{prettyDate(data.createdAt)}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Followers
											</p>
											<p className="font-medium">
												{data.tiktokAccount?.followers}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Engagement rate
											</p>
											<p className="font-medium">
												{data.tiktokAccount
													?.engagementRate
													? twoDecimalFormatting(
															data.tiktokAccount
																?.engagementRate
														).toString() + '%'
													: '-'}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Average views
											</p>
											<p className="font-medium">
												{data.tiktokAccount
													?.averageViews
													? data.tiktokAccount
															?.averageViews
													: '-'}
											</p>
										</div>{' '}
										<div className="border-l-2 px-4 flex justify-center flex-col gap-1">
											<p className="text-neutral-600 text-sm">
												Median views
											</p>
											<p className="font-medium">
												{data.tiktokAccount?.medianViews
													? data.tiktokAccount
															?.medianViews
													: '-'}
											</p>
										</div>{' '}
									</div>
								</div>
							)}

							{activeTab === 'performance' && (
								<div className="flex flex-col gap-6">
									<div className="flex flex-col gap-3">
										<p className="font-semibold text-sm text-neutral-900">
											Audience countries
										</p>
										<BarList
											data={[
												{
													name:
														data.tiktokAccount
															?.audienceCountry1 ||
														'',
													value:
														data.tiktokAccount
															?.audienceCountry1Percentage ??
														0,
												},
												{
													name:
														data.tiktokAccount
															?.audienceCountry2 ||
														'',
													value:
														data.tiktokAccount
															?.audienceCountry2Percentage ??
														0,
												},
												{
													name:
														data.tiktokAccount
															?.audienceCountry3 ||
														'',
													value:
														data.tiktokAccount
															?.audienceCountry3Percentage ??
														0,
												},
											]}
											valueFormatter={(v) => v.toFixed(2)}
											sortOrder="descending"
										/>
									</div>
									<div className="flex flex-col gap-3">
										<p className="font-semibold text-sm text-neutral-900">
											Audience gender
										</p>
										<BarList
											data={[
												{
													name: 'Female',
													value:
														data.tiktokAccount
															?.audienceFemalePercentage ??
														0,
												},
												{
													name: 'Male',
													value:
														data.tiktokAccount
															?.audienceMalePercentage ??
														0,
												},
												{
													name: 'Other',
													value:
														data.tiktokAccount
															?.audienceOtherPercentage ??
														0,
												},
											]}
											valueFormatter={(v) => v.toFixed(2)}
											sortOrder="descending"
										/>
									</div>
									<div className="flex flex-col gap-3">
										<p className="font-semibold text-sm text-neutral-900">
											Audience age
										</p>
										<BarList
											data={[
												{
													name: 'Age 18-25',
													value:
														data.tiktokAccount
															?.audience18Percentage ??
														0,
												},
												{
													name: 'Age 25-35',
													value:
														data.tiktokAccount
															?.audience25Percentage ??
														0,
												},
												{
													name: 'Age 35-55',
													value:
														data.tiktokAccount
															?.audience35Percentage ??
														0,
												},
												{
													name: 'Age 55+',
													value:
														data.tiktokAccount
															?.audience55Percentage ??
														0,
												},
											]}
											valueFormatter={(v) => v.toFixed(2)}
											sortOrder="descending"
										/>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="h-64 flex items-center justify-center">
						<p>An error occurred while fetching influencer data.</p>
					</div>
				)}
			</Modal>
		)
	}
)
