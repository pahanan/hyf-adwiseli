import useBrand from '@/hooks/use-brand'

type NewCampaignLayoutProps = {
	children: React.ReactNode
}

export default function NewCampaignLayout({
	children,
}: NewCampaignLayoutProps) {
	const { brand } = useBrand()
	return (
		<div className="h-full flex">
			<div className="w-[40%] border-r bg-white">{children}</div>
			<div className="flex-1 flex flex-col w-full">
				<div className="h-[70px] flex items-center px-6 w-full border-b bg-white">
					<p className="font-medium">Live preview</p>
				</div>
				<div className="flex-1 p-20 px-40 flex flex-col items-center justify-center relative">
					<div className="w-full h-full border rounded-xl relative z-[20] shadow-clean bg-white">
						<div className="w-full relative overflow-hidden h-[90px] rounded-t-xl bg-yellow-500">
							<img
								className="absolute blur-2xl rounded-t-xl w-full h-full inset-0 backdrop-blur-2xl"
								src={brand?.iconURL}
							></img>
						</div>
						<div className="px-8 z-[30] relative -mt-7">
							<img
								className="w-[70px] border-[6px] border-white h-[70px] rounded-xl"
								src={brand?.iconURL}
							></img>
						</div>
					</div>
					<div
						style={{
							background:
								'linear-gradient(0deg, rgba(255,85,0,0.052476365546218475) 0%, rgba(255,255,255,0) 100%)',
						}}
						className="absolute inset-0"
					></div>
				</div>
			</div>
		</div>
	)
}
