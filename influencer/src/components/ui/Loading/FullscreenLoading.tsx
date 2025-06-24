import Loading from '.'

export default function FullscreenLoading() {
	return (
		<div className="h-screen flex-col gap-6 w-screen flex items-center justify-center bg-white">
			<Loading color="#FF5500" size="xs" />
		</div>
	)
}
