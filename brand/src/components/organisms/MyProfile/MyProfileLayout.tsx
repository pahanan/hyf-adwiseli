type MyProfileLayoutProps = {
	children: React.ReactNode
}

export default function MyProfileLayout({ children }: MyProfileLayoutProps) {
	return (
		<div className="flex h-[calc(100vh-60px)] bg-white">
			<div className="w-[250px] flex flex-col gap-1 p-2 flex-shrink-0 h-full bg-white border-r">
				<div className="p-2 py-3 bg-neutral-100 rounded-lg">
					<p className="font-medium text-sm">General</p>
				</div>
				<div className="p-2 py-3 bg-neutral-100 rounded-lg">
					<p className="font-medium text-sm">Danger zone</p>
				</div>
			</div>
			<div className="p-24 bg-neutral-50 w-full">{children}</div>
		</div>
	)
}
