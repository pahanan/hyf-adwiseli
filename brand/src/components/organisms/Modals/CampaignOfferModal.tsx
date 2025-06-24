import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Modal } from '@/components/ui/Modal'
import Tooltip from '@/components/ui/Tooltip'
import { CampaignOffer } from '@/queries/campaigns/getOffers'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React from 'react'
import ScoreTooltip from '../CampaignPage/OfferOverview/ScoreTooltip'
import MatchBadge from '../CampaignPage/OfferOverview/MatchBadge'
import { twoDecimalFormatting } from '@/helpers/numbers'
import InfluencerInfoModal from './InfluencerInfoModal'
import Badge from '@/components/ui/Badge'
import CreatorScoreModal from './CreatorScoreModal'

type CampaignOfferModalProps = {
	offer: CampaignOffer
}

export default NiceModal.create(({ offer }: CampaignOfferModalProps) => {
	const modal = useModal()

	return (
		<Modal
			modal={modal}
			className="p-0 gap-0 bg-white max-h-[80vh] overflow-y-auto no-scrollbar"
			headerClassName="p-4 bg-white border-b border-gray-600/10"
			size={'3xl'}
		>
			<div className="sticky border-b p-4 bg-white top-0 z-[200]">
				<p className="font-medium">Match compatibility</p>
			</div>
			<div className="flex flex-col gap-10">
				<div className="relative flex items-center flex-col bg-white border-b">
					<table className="w-full border-collapse bg-white rounded-b-lg overflow-hidden">
						<thead>
							<tr className="bg-white">
								<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
									Creator
								</th>
								<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
									Match
								</th>
								<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
									Followers
								</th>
								<th className="px-4 py-2.5 text-[12px] font-medium text-neutral-500 text-left">
									Engagement Rate
								</th>
							</tr>
						</thead>
						<tbody>
							{offer.creators.map((creator) => (
								<tr
									key={creator.influencerId}
									className="border-t cursor-pointer "
								>
									<td className="px-4 py-2.5 font-medium text-gray-800">
										<div className="flex items-center gap-2">
											<div className="relative">
												<div className="rounded-full border border-gray-600/10 shadow-sm">
													<Avatar className="size-9 border-2 border-white">
														<AvatarImage
															src={
																creator.profilePictureURL
															}
														/>
														<AvatarFallback />
													</Avatar>
												</div>
												{creator.influencerCountry ? (
													<img
														src={`https://hatscripts.github.io/circle-flags/flags/${creator?.influencerCountry?.toLowerCase()}.svg`}
														className="w-4 h-4 absolute bottom-0 right-0 border-[2px] border-white rounded-full object-cover"
													/>
												) : null}
											</div>
											<div
												onClick={() => {
													NiceModal.show(
														InfluencerInfoModal,
														{
															influencerId:
																creator.influencerId,
														}
													)
												}}
												className="flex flex-col group"
											>
												<p className="text-sm font-medium group-hover:text-primary transition-all">
													{creator.influencerName}
												</p>
												<p className="text-xs font-normal text-neutral-700 group-hover:text-primary transition-all">
													@{creator.username}
												</p>
											</div>
										</div>
									</td>
									<td className="px-4 py-2.5">
										<div
											onClick={() =>
												NiceModal.show(
													CreatorScoreModal,
													{
														creator: creator,
													}
												)
											}
											className="flex"
										>
											<MatchBadge
												score={creator.overallScore}
											/>
										</div>
									</td>
									<td className="px-4 py-2.5 text-sm font-medium text-neutral-700 text-left">
										{twoDecimalFormatting(
											creator.followers || 0
										)}
									</td>
									<td className="px-4 py-2.5 text-sm font-medium text-neutral-700 text-left">
										{twoDecimalFormatting(
											creator.engagementRate || 0
										)}
										%
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Modal>
	)
})
