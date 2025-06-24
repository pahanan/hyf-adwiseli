import Layout from '@/components/layout'
import EmptyState from '@/components/molecules/EmptyState'
import ActiveLayout from '@/components/organisms/CampaignPage/ActiveLayout'
import CampaignPageLayout from '@/components/organisms/CampaignPage/CampaignPageLayout'
import OfferOverview from '@/components/organisms/CampaignPage/OfferOverview'
import withCampaign from '@/hoc/with-campaign'
import useCampaign from '@/hooks/use-campaign'
import { useQueryClient } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const AIAnimation = dynamic(
	() => import('@/components/organisms/CampaignPage/AIAnimation'),
	{ ssr: false }
)

function CampaignPage() {
	const { campaign } = useCampaign()
	const queryClient = useQueryClient()

	// State to track loading status
	const [isLoading, setIsLoading] = useState(true)
	// State to track time since campaign creation
	const [timeSinceCreation, setTimeSinceCreation] = useState(0)

	useEffect(() => {
		// Calculate initial time since creation
		const updateTimeSinceCreation = () => {
			const creationTime = new Date(campaign.createdAt).getTime()
			const currentTime = new Date().getTime()
			setTimeSinceCreation(currentTime - creationTime)
		}

		// Initial calculation
		updateTimeSinceCreation()

		// Set up interval to update time elapsed every second
		const timeInterval = setInterval(() => {
			updateTimeSinceCreation()
		}, 1000)

		// Cleanup interval
		return () => clearInterval(timeInterval)
	}, [campaign.createdAt])

	useEffect(() => {
		// Update loading state based on results and time since creation
		setIsLoading(
			campaign.status == 'GENERATING' || timeSinceCreation < 3_000
		)
	}, [campaign.status, timeSinceCreation])

	useEffect(() => {
		// Set up polling for results if they're not yet generated
		if (campaign.status === 'GENERATING') {
			const pollingInterval = setInterval(() => {
				queryClient.invalidateQueries({
					queryKey: ['campaign', campaign.id],
				})
			}, 2000)

			return () => clearInterval(pollingInterval)
		}
	}, [campaign.id, campaign.status, queryClient])

	return (
		<Layout
			active="dashboard"
			title={
				campaign.status === 'PENDING'
					? campaign.name
					: campaign.status === 'ACTIVE'
					? undefined
					: campaign.name
			}
		>
			{isLoading ? (
				<div className="h-64 flex flex-col items-center justify-center">
					<div className="relative flex h-24">
						{typeof window !== 'undefined' && <AIAnimation />}
					</div>
					<h1 className="text-lg text-center">
						Our AI is finding the best influencers for your
						campaign, please wait...
					</h1>
				</div>
			) : campaign.status == 'PENDING' ? (
				<OfferOverview />
			) : campaign.status == 'ACTIVE' ? (
				<ActiveLayout />
			) : (
				<EmptyState
					headline="Campaign canceled"
					description="Tak for fremsendte - vi vil gerne have endnu et møde med jer, for at tale om detaljerne og muligheden for opstart. Har I tid til et møde på mandag."
					icon={
						<svg
							width="50"
							height="50"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M22 17L14.1314 9.13137C13.7354 8.73535 13.5373 8.53735 13.309 8.46316C13.1082 8.3979 12.8918 8.3979 12.691 8.46316C12.4627 8.53735 12.2646 8.73535 11.8686 9.13137L9.13137 11.8686C8.73535 12.2646 8.53735 12.4627 8.30902 12.5368C8.10817 12.6021 7.89183 12.6021 7.69098 12.5368C7.46265 12.4627 7.26465 12.2646 6.86863 11.8686L2 7M22 17H15M22 17V10"
								stroke="#737373"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					}
				/>
			)}
		</Layout>
	)
}

export default withCampaign(CampaignPage)
