import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import NiceModal from '@ebay/nice-modal-react'
import CampaignOfferModal from '../Modals/CampaignOfferModal'
import { cn } from '@/helpers/utils'
import Badge from '@/components/ui/Badge'
import { CampaignOffer } from '@/queries/campaigns/getOffers'

type CampaignOfferCardProps = {
	index: number
	offer: CampaignOffer
	selectedOffers: string[]
	setSelectedOffers: (offers: string[]) => void
}

export default function CampaignOfferCard({
	index,
	offer,
	selectedOffers,
	setSelectedOffers,
}: CampaignOfferCardProps) {
	const isSelected = selectedOffers.includes(offer.id)
	return (
		<div className="relative rounded-lg transition-all">
			<div
				className={cn(
					'absolute inset-0 flex items-center justify-center transition-all opacity-0',
					isSelected && 'opacity-100 transition-all'
				)}
			>
				<div className="shadow-clean">
					<Badge className="relative  z-[50]" color="green">
						Offer selected
					</Badge>
				</div>
			</div>
			<div className="absolute z-[25] bottom-8 right-0 left-0 flex items-center justify-center gap-2">
				<Button
					variant={isSelected ? 'outline' : 'primary'}
					onClick={
						isSelected
							? () =>
									setSelectedOffers(
										selectedOffers.filter(
											(id) => id !== offer.id
										)
									)
							: () =>
									setSelectedOffers([
										...selectedOffers,
										offer.id,
									])
					}
					size={'sm'}
					className="shadow-sm transition-none"
				>
					{isSelected ? 'Deselect offer' : 'Select offer'}
				</Button>
				<Button
					variant={'outline'}
					className="bg-white shadow-sm"
					onClick={() =>
						NiceModal.show(CampaignOfferModal, { offer: offer })
					}
					size={'sm'}
				>
					View full offer
				</Button>
			</div>
			<div
				className={cn(
					'bg-white transition-all pb-3 relative flex flex-col gap-3',
					isSelected && 'opacity-20 transition-all'
				)}
			>
				<h3 className="font-medium text-sm relative z-[30]">
					{index == 0
						? 'First'
						: index == 1
							? 'Second'
							: index == 2
								? 'Third'
								: `${index + 1}th`}{' '}
					Offer
				</h3>
				<div className="flex flex-col gap-2">
					{offer.creators.slice(0, 7).map((creator, index) => (
						<div
							key={creator.influencerId}
							className="w-full select-none shadow-sm rounded-lg bg-white p-3 px-2 border"
						>
							<div className="flex items-center gap-2">
								<div className="relative">
									<div className="rounded-full border shadow-sm">
										<Avatar className="size-8 border-2 border-white">
											<AvatarImage
												src={creator.profilePictureURL}
											/>
											<AvatarFallback />
										</Avatar>
									</div>
									<img
										src={`https://hatscripts.github.io/circle-flags/flags/dk.svg`}
										className="w-4 h-4 absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
									/>
								</div>
								<div className="flex flex-col">
									<p className="font-medium text-sm">
										{creator.influencerName}
									</p>
									<p className="text-neutral-700 text-xs font-base">
										@{creator.username}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="absolute z-[20] inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"></div>
			</div>
		</div>
	)
}
