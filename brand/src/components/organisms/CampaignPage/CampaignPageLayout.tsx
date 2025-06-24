import useCampaign from '@/hooks/use-campaign'

type CampaignPageLayoutProps = {
	children?: React.ReactNode
}

export default function CampaignPageLayout({
	children,
}: CampaignPageLayoutProps) {
	const { campaign } = useCampaign()
	return (
		<div>
			<div className="">{children}</div>
		</div>
	)
}
