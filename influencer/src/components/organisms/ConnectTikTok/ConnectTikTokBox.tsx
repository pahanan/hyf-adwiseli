import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function ConnectTikTokBox() {
	return (
		<div className="w-full rounded-xl h-[400px] flex items-center justify-center bg-white border border-neutral-300 border-dashed">
			<div className="flex flex-col gap-7 items-center justify-center">
				<div className="flex flex-col gap-1">
					<h3 className="font-medium text-center text-lg">
						Connect TikTok to get started
					</h3>
					<p className="font-base text-neutral-700 text-center">
						Connect your TikTok to participate in campaigns
					</p>
				</div>
				<Link href={`/connect/tiktok`}>
					<Button size="sm">Connect TikTok</Button>
				</Link>
			</div>
		</div>
	)
}
