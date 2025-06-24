import useCampaign from '@/hooks/use-campaign'
import getOffers from '@/queries/campaigns/getOffers'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useState } from 'react'
import OfferConversations from './OfferConversations'
import Loading from '@/components/ui/Loading'

type CampaignTab = {
	id: string
	title: string
	type: 'chat' | 'page'
	offerId?: string
}

export default function ActiveLayout() {
	const { campaign } = useCampaign()
	const [activeTab, setActiveTab] = useState<CampaignTab | null>(null)

	const { data: offers, isLoading } = useQuery({
		queryKey: ['campaign', campaign.id, 'offers'],
		queryFn: async () =>
			await getOffers({
				campaignId: campaign.id,
				brandId: campaign.brandId,
			}),
	})

	const tabs: CampaignTab[] = useMemo(() => {
		let defaultTabs: CampaignTab[] = []

		const offerTabs = (offers
			?.map((offer, index) => ({
				id: offer.id,
				title: `Offer #${index + 1}`,
				type: 'chat',
				offerId: offer.id,
				status: offer.status,
			}))
			.filter((offer) => offer.status === 'ACCEPTED') ||
			[]) as CampaignTab[]

		return [...offerTabs, ...defaultTabs]
	}, [offers])

	useEffect(() => {
		if (!activeTab && tabs.length > 0 && !isLoading) {
			setActiveTab(tabs[0])
		}
	}, [activeTab, isLoading, tabs])

	return (
		<div className="flex-1 shadow-naviga shadow-neutral-400/10 rounded-tl-lg w-full h-full flex flex-col">
			<div className="w-full pt-3.5 flex flex-col gap-5 justify-center bg-white rounded-tl-lg border-b px-4">
				<p className="text-[15px] font-medium">{campaign.name}</p>
				<div className="flex items-center gap-6">
					{!isLoading &&
						tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab)}
								className={`
                                font-medium 
                                text-sm 
                                pb-1.5 
                                transition-colors 
                                duration-200 
                                ${
									activeTab?.id === tab.id
										? 'border-b-2 border-neutral-900 text-neutral-900'
										: 'border-b-2 border-transparent text-neutral-500 hover:text-neutral-700'
								}
                            `}
							>
								{tab.title}
							</button>
						))}
				</div>
			</div>
			{isLoading ? (
				<div className="flex items-center justify-center w-full h-full">
					<Loading />
				</div>
			) : null}
			<div className="flex-1 flex flex-col overflow-hidden">
				{activeTab?.type == 'chat' ? (
					<OfferConversations offerId={activeTab.offerId as string} />
				) : null}
			</div>
		</div>
	)
}
