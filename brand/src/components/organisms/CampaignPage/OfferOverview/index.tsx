import Loading from '@/components/ui/Loading'
import useCampaign from '@/hooks/use-campaign'
import getOffers from '@/queries/campaigns/getOffers'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CampaignOfferCard from '../CampaignOfferCard'
import OfferSelectionBar from '../OfferSelectionBar'
import { useState } from 'react'
import http from '@/queries/http'
import { toast } from 'sonner'
import { toastError } from '@/helpers/toasty'

export default function OfferOverview() {
	const { campaign } = useCampaign()
	const [submitting, setSubmitting] = useState(false)
	const queryClient = useQueryClient()

	const [selectedOffers, setSelectedOffers] = useState<string[]>([])

	const { data, isLoading } = useQuery({
		queryKey: ['campaign', campaign.id, 'offers'],
		queryFn: async () =>
			await getOffers({
				campaignId: campaign.id,
				brandId: campaign.brandId,
			}),
	})

	async function onSubmit() {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(
				`/${campaign?.brandId}/campaigns/${campaign?.id}/offer/confirm`,
				{
					selectedOffers,
				}
			)
			.then(({ data }) => {
				toast.success(data.message)
				queryClient.invalidateQueries({
					queryKey: ['campaign', campaign.id],
				})
			})
			.catch((error) => {
				toastError(error)
				setSubmitting(false)
			})
	}

	if (isLoading || !data) {
		return (
			<div className="h-64 flex items-center justify-center">
				<Loading />
			</div>
		)
	}

	return (
		<div className="bg-white h-[93vh] relative">
			<div className="grid grid-cols-3 p-4 gap-4">
				{data.map((offer, index) => (
					<CampaignOfferCard
						index={index}
						offer={offer}
						key={offer.id}
						selectedOffers={selectedOffers}
						setSelectedOffers={setSelectedOffers}
					/>
				))}
			</div>
			<OfferSelectionBar
				selectedOffers={selectedOffers}
				onContinue={onSubmit}
			/>
		</div>
	)
}
