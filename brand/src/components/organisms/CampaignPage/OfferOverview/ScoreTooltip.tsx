import { matchmakingScores } from '@/helpers/scores'
import { CampaignOffer } from '@/queries/campaigns/getOffers'

export default function ScoreTooltip({
	creator,
}: {
	creator: CampaignOffer['creators'][number]
}) {
	const items = [
		{
			label: 'Interest',
			score: creator.interestScore,
			matchmakingScore: matchmakingScores.find(
				(score) =>
					score.lowerBound <= creator.interestScore &&
					score.upperBound >= creator.interestScore
			),
		},
		{
			label: 'Influencer Age',
			score: creator.influencerAgeScore,
			matchmakingScore: matchmakingScores.find(
				(score) =>
					score.lowerBound <= creator.influencerAgeScore &&
					score.upperBound >= creator.influencerAgeScore
			),
		},
		{
			label: 'Audience Age',
			score: creator.audienceAgeScore,
			matchmakingScore: matchmakingScores.find(
				(score) =>
					score.lowerBound <= creator.audienceAgeScore &&
					score.upperBound >= creator.audienceAgeScore
			),
		},
		{
			label: 'Audience Country',
			score: creator.audienceCountriesScore,
			matchmakingScore: matchmakingScores.find(
				(score) =>
					score.lowerBound <= creator.audienceCountriesScore &&
					score.upperBound >= creator.audienceCountriesScore
			),
		},
		{
			label: 'Audience Gender',
			score: creator.audienceGenderScore,
			matchmakingScore: matchmakingScores.find(
				(score) =>
					score.lowerBound <= creator.audienceGenderScore &&
					score.upperBound >= creator.audienceGenderScore
			),
		},
	]

	return (
		<div className="p-1.5 flex flex-col gap-2">
			<h1 className="font-semibold text-lg">
				How did we get this score?
			</h1>
			<div className="flex flex-col gap-2">
				{items.map((item) => (
					<div className="flex items-center gap-2" key={item.label}>
						<p className="min-w-32 text-sm font-medium">
							{item.label}
						</p>
						<div className="relative w-full">
							<div
								className="absolute z-10 p-1"
								style={{
									left: `${item.score * 100}%`,
									transform: 'translateX(-50%)',
									top: -8,
								}}
							>
								<div className="flex items-center justify-center">
									<p
										style={{
											fontSize: '10px',
										}}
									>
										{item.matchmakingScore?.emoji}
									</p>
								</div>
							</div>
							<div className="overflow-hidden flex w-full h-2 rounded-full">
								{matchmakingScores.map((score) => (
									<div
										key={score.label}
										style={{
											backgroundColor: score.color,
											width: `${
												(score.upperBound -
													score.lowerBound) *
												100
											}%`,
										}}
									/>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
