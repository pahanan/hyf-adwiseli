import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { CampaignOffer } from '@/queries/campaigns/getOffers'
import MatchBadge from './MatchBadge'
import Tooltip from '@/components/ui/Tooltip'
import { matchmakingScores } from '@/helpers/scores'
import { X } from 'lucide-react'
import ScoreTooltip from './ScoreTooltip'
import { twoDecimalFormatting } from '@/helpers/numbers'

export default function PendingOfferOverview({
	offers,
}: {
	offers: CampaignOffer[]
}) {
	return (
		<div className="flex flex-col gap-2">
			{offers.map((offer, index) => (
				<div
					key={offer.id}
					className="flex flex-col border bg-white rounded-lg"
				>
					<div className="p-2 border-b">
						<p>Offer #{index + 1}</p>
					</div>
					<table className="w-full border-collapse bg-white rounded-b-lg overflow-hidden">
						<thead>
							<tr className="bg-neutral-50 text-neutral-500 text-sm">
								<th className="px-4 py-3 font-semibold text-left">
									Creator
								</th>
								<th className="px-4 py-3 font-semibold text-left">
									Match
								</th>
								<th className="px-4 py-3 font-semibold text-left">
									Followers
								</th>
								<th className="px-4 py-3 font-semibold text-left">
									Engagement Rate
								</th>
							</tr>
						</thead>
						<tbody>
							{offer.creators.map((creator) => (
								<tr
									key={creator.influencerId}
									className="border-t border-gray-200 hover:bg-gray-50"
								>
									<td className="px-4 py-3 font-medium text-gray-800">
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
											<div className="flex flex-col">
												<p className="text-base font-medium">
													{creator.influencerName}
												</p>
												<p className="text-sm font-normal text-gray-500">
													@{creator.username}
												</p>
											</div>
										</div>
									</td>
									<td className="px-4 py-3">
										<Tooltip
											jsx={
												<ScoreTooltip
													creator={creator}
												/>
											}
											className="bg-white min-w-96 border text-black"
										>
											<div className="flex">
												<MatchBadge
													score={creator.overallScore}
												/>
											</div>
										</Tooltip>
									</td>
									<td className="px-4 py-3">
										{twoDecimalFormatting(
											creator.followers || 0
										)}
									</td>
									<td className="px-4 py-3">
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
			))}
		</div>
	)
}
