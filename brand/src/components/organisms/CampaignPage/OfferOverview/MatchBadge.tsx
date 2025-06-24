import Badge from '@/components/ui/Badge'
import { matchmakingScores } from '@/helpers/scores'
import { hexToRgba } from '@/helpers/utils'
import NiceModal from '@ebay/nice-modal-react'
import { ArrowUp, ArrowUpRight } from 'lucide-react'
import CreatorScoreModal from '../../Modals/CreatorScoreModal'

export default function MatchBadge({ score }: { score: number }) {
	const colorData = matchmakingScores.find((range) => {
		return range.lowerBound <= score && range.upperBound >= score
	})
	if (!colorData) return <div>{score}</div>

	return (
		<Badge
			stroke={true}
			className="hover:opacity-60 transition-all"
			color={
				colorData.label === 'Poor'
					? 'yellow'
					: colorData.label === 'Very poor'
						? 'red'
						: colorData.label === 'Average'
							? 'blue'
							: 'green'
			}
		>
			<p className="font-semibold leading-4 text-xs">{colorData.label}</p>
			<ArrowUpRight size={13} />
		</Badge>
	)
}
