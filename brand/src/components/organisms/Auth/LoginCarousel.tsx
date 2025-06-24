import { useState, useEffect } from 'react'

// Carousel component
const LoginCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [progress, setProgress] = useState(0)

	// Carousel content
	const slides = [
		{
			image: '/images/1.jpg',
			title: 'Adgang til top influencers',
			description:
				"Connect with top influencers to grow your brand's reach.",
		},
		{
			image: '/images/2.jpg',
			title: 'Data-drevet matchmaking',
			description:
				"Connect with top influencers to grow your brand's reach",
		},
		{
			image: '/images/1.jpg',
			title: 'Skriv med dine influencers',
			description:
				"Connect with top influencers to grow your brand's reach",
		},
		{
			image: '/images/2.jpg',
			title: 'Et kompetent team',
			description:
				"Connect with top influencers to grow your brand's reach",
		},
	]

	// Timer for slide transitions
	useEffect(() => {
		const progressInterval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress >= 100) {
					setCurrentSlide(
						(prevSlide) => (prevSlide + 1) % slides.length
					)
					return 0
				}
				return prevProgress + 1
			})
		}, 50) // Update progress every 50ms for smooth animation

		return () => clearInterval(progressInterval)
	}, [slides.length])

	return (
		<div
			className="h-full rounded-3xl w-full hidden lg:flex flex-col items-center justify-end relative overflow-hidden bg-cover bg-center transition-all duration-500 ease-linear"
			style={{
				backgroundImage: `url(${slides[currentSlide].image})`,
			}}
		>
			<div className="absolute h-full inset-0 bg-gradient-to-t from-primary via-orange-primary/70 to-transparent"></div>
			<div className="w-full relative flex flex-col gap-6 z-10 pb-10 px-10">
				{/* Slide text content */}
				<div className="max-w-md flex flex-col gap-2 mb-2">
					{slides.map((slide, index) => (
						<div
							key={`text-${index}`}
							className={`transition-opacity duration-1000 ${
								index === currentSlide
									? 'opacity-100'
									: 'opacity-0 absolute'
							}`}
						>
							<h2 className="text-3xl heading mb-2 font-bold text-white">
								{slide.title}
							</h2>
							<p className="text-lg heading text-white">
								{slide.description}
							</p>
						</div>
					))}
				</div>

				<div className="h-1 bg-white bg-opacity-30 rounded-full">
					<div
						className="h-1 bg-white rounded-full transition-all duration-500 ease-linear"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
		</div>
	)
}

export default LoginCarousel
