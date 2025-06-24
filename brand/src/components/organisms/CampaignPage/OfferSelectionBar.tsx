export default function OfferSelectionBar({
	totalOffers = 3,
	selectedOffers,
	onContinue,
	loading = false,
}: {
	totalOffers?: number
	selectedOffers: string[]
	onContinue: () => void
	loading?: boolean
}) {
	return (
		<div className="absolute z-[30] right-0 left-0 bottom-10">
			<div className="bg-white flex items-center gap-3.5 w-fit p-3 mx-auto border rounded-lg shadow-2xl shadow-neutral-300">
				<div className="flex items-center justify-between gap-4">
					<div className="relative">
						<div className="w-60 h-1.5 rounded-full bg-neutral-200"></div>
						<div
							style={{
								width:
									true &&
									`${
										(selectedOffers.length / totalOffers) *
										100
									}%`,
							}}
							className="h-1.5 absolute inset-0 rounded-full bg-primary"
						></div>
					</div>
					<p className="font-medium text-sm">
						{selectedOffers.length}/
						<span className="text-gray-700">{totalOffers}</span>
					</p>
				</div>

				<div className="flex border-l pl-2 flex-col items-center justify-center">
					<button
						onClick={onContinue}
						disabled={loading}
						className="text-sm text-neutral-700 font-medium px-4 py-1 rounded-lg hover:bg-gray-50 disabled:cursor- transition-all duration-20"
					>
						{selectedOffers.length == 0
							? 'Continue without offers'
							: 'Continue with selected offers'}
					</button>
				</div>
			</div>
		</div>
	)
}
