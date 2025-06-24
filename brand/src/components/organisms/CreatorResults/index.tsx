import React, { useState } from 'react'

type Interest = number

type Gender = 'Male' | 'Female' | 'Other' | 'Prefer not to say'

type CountryCode = string // ISO country codes like 'US', 'CA', 'UK', etc.

interface Influencer {
	fullName: string
	email: string
	country: CountryCode
	gender: Gender
	birthday: Date
	interests: Interest[] // IDs referencing interests (e.g., 1=Fashion, 3=Fitness, 7=Gaming)
}

interface SocialAccountDetails {
	username: string
	followers: number
	engagementRate: number
	averageViews: number
	medianViews: number
	profilePictureId: string
	bio: string
	audienceCountry1: CountryCode
	audienceCountry1Percentage: number
	audienceCountry2: CountryCode
	audienceCountry2Percentage: number
	audienceCountry3: CountryCode
	audienceCountry3Percentage: number
	audienceMalePercentage: number
	audienceFemalePercentage: number
	audienceOtherPercentage: number
	audience18Percentage: number
	audience25Percentage: number
	audience35Percentage: number
	audience45Percentage: number
	audience55Percentage: number
}

interface ScoreDetails {
	interestsScore: number
	influencerAgeScore: number
	audienceAgeScore: number
	audienceCountryScore: number
	audienceGenderScore: number
	metricsScore: number
}

interface SocialAccount {
	id: string
	score: number
	influencer: Influencer
	socialAccount: SocialAccountDetails
	details: ScoreDetails
}

const CreatorMatchResults = ({
	results = [],
}: {
	results?: SocialAccount[]
}) => {
	const [selectedCreator, setSelectedCreator] =
		useState<SocialAccount | null>(null)

	// Sample results for demonstration
	const sampleResults: SocialAccount[] = [
		{
			id: '1',
			score: 0.87,
			influencer: {
				fullName: 'Alex Johnson',
				email: 'alex@example.com',
				country: 'US',
				gender: 'Male',
				birthday: new Date(1995, 5, 12), // June 12, 1995
				interests: [1, 3, 7], // Fashion, Fitness, Gaming
			},
			socialAccount: {
				username: '@alexcreates',
				followers: 156000,
				engagementRate: 0.068,
				averageViews: 48000,
				medianViews: 42000,
				profilePictureId: '1',
				bio: 'Fitness enthusiast and gaming lover. Creating content that inspires and entertains.',
				audienceCountry1: 'US',
				audienceCountry1Percentage: 65.2,
				audienceCountry2: 'CA',
				audienceCountry2Percentage: 12.8,
				audienceCountry3: 'UK',
				audienceCountry3Percentage: 8.4,
				audienceMalePercentage: 68.5,
				audienceFemalePercentage: 30.1,
				audienceOtherPercentage: 1.4,
				audience18Percentage: 45.2,
				audience25Percentage: 32.7,
				audience35Percentage: 15.3,
				audience45Percentage: 5.1,
				audience55Percentage: 1.7,
			},
			details: {
				interestsScore: 0.75,
				influencerAgeScore: 0.92,
				audienceAgeScore: 0.88,
				audienceCountryScore: 0.95,
				audienceGenderScore: 0.82,
				metricsScore: 0.9,
			},
		},
		{
			id: '2',
			score: 0.83,
			influencer: {
				fullName: 'Sophia Lee',
				email: 'sophia@example.com',
				country: 'CA',
				gender: 'Female',
				birthday: new Date(1998, 9, 25), // Oct 25, 1998
				interests: [1, 2, 8], // Fashion, Beauty, Lifestyle
			},
			socialAccount: {
				username: '@sophiastyle',
				followers: 287000,
				engagementRate: 0.057,
				averageViews: 72000,
				medianViews: 68000,
				profilePictureId: '2',
				bio: 'Fashion and beauty content creator. Sharing my style journey and lifestyle tips.',
				audienceCountry1: 'US',
				audienceCountry1Percentage: 42.7,
				audienceCountry2: 'CA',
				audienceCountry2Percentage: 28.3,
				audienceCountry3: 'UK',
				audienceCountry3Percentage: 12.1,
				audienceMalePercentage: 18.5,
				audienceFemalePercentage: 80.1,
				audienceOtherPercentage: 1.4,
				audience18Percentage: 52.3,
				audience25Percentage: 29.7,
				audience35Percentage: 12.8,
				audience45Percentage: 4.2,
				audience55Percentage: 1.0,
			},
			details: {
				interestsScore: 0.8,
				influencerAgeScore: 0.95,
				audienceAgeScore: 0.91,
				audienceCountryScore: 0.87,
				audienceGenderScore: 0.68,
				metricsScore: 0.95,
			},
		},
		{
			id: '3',
			score: 0.79,
			influencer: {
				fullName: 'Marco Rivera',
				email: 'marco@example.com',
				country: 'US',
				gender: 'Male',
				birthday: new Date(1993, 2, 8), // March 8, 1993
				interests: [4, 5, 8], // Food, Travel, Lifestyle
			},
			socialAccount: {
				username: '@marcoexplores',
				followers: 423000,
				engagementRate: 0.048,
				averageViews: 105000,
				medianViews: 92000,
				profilePictureId: '3',
				bio: 'Food and travel enthusiast. Join me as I explore the world one dish at a time.',
				audienceCountry1: 'US',
				audienceCountry1Percentage: 58.5,
				audienceCountry2: 'MX',
				audienceCountry2Percentage: 14.2,
				audienceCountry3: 'ES',
				audienceCountry3Percentage: 7.8,
				audienceMalePercentage: 42.5,
				audienceFemalePercentage: 56.3,
				audienceOtherPercentage: 1.2,
				audience18Percentage: 32.7,
				audience25Percentage: 38.4,
				audience35Percentage: 21.6,
				audience45Percentage: 5.8,
				audience55Percentage: 1.5,
			},
			details: {
				interestsScore: 0.65,
				influencerAgeScore: 0.82,
				audienceAgeScore: 0.78,
				audienceCountryScore: 0.73,
				audienceGenderScore: 0.88,
				metricsScore: 0.98,
			},
		},
	]

	// For demo purposes, use sample data if no results are provided
	const displayResults = results.length > 0 ? results : sampleResults

	// Get color for score display
	const getScoreColor = (score: number) => {
		if (score >= 0.8) return 'text-green-600'
		if (score >= 0.6) return 'text-yellow-600'
		return 'text-orange-600'
	}

	// Format score as percentage
	const formatScore = (score: number) => `${Math.round(score * 100)}%`

	// Calculate age from birthday
	const calculateAge = (birthday: Date) => {
		if (!birthday) return 'Unknown'
		const today = new Date()
		let age = today.getFullYear() - birthday.getFullYear()
		const monthDiff = today.getMonth() - birthday.getMonth()

		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthday.getDate())
		) {
			age--
		}

		return age
	}

	// Map interest IDs to names
	const interestMap: {
		[key: number]: string
	} = {
		1: 'Fashion',
		2: 'Beauty',
		3: 'Fitness',
		4: 'Food',
		5: 'Travel',
		6: 'Technology',
		7: 'Gaming',
		8: 'Lifestyle',
		9: 'Music',
		10: 'Entertainment',
		11: 'Business',
		12: 'Education',
	}

	// Format interests as string
	const formatInterests = (interestArray: number[]) => {
		if (!interestArray || interestArray.length === 0)
			return 'None specified'
		return interestArray.map((id) => interestMap[id] || id).join(', ')
	}

	return (
		<div className="w-full max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
			<div className="p-6 bg-blue-600 text-white">
				<h1 className="text-2xl font-bold">Your Creator Matches</h1>
				<p className="mt-2">
					We&apos;ve found {displayResults.length} creators that match
					your requirements
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
				{/* Creator List Panel */}
				<div className="md:col-span-1 border-r border-gray-200">
					<div className="p-4 bg-gray-50 border-b border-gray-200">
						<h2 className="font-semibold text-gray-700">
							Top Matches
						</h2>
					</div>

					<div
						className="overflow-y-auto"
						style={{ maxHeight: '600px' }}
					>
						{displayResults.map((result, index) => (
							<div
								key={result.id}
								className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
									selectedCreator?.id === result.id
										? 'bg-blue-50'
										: 'hover:bg-gray-50'
								}`}
								onClick={() => setSelectedCreator(result)}
							>
								<div className="flex items-center">
									<div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 mr-3">
										{/* Placeholder for profile image */}
										<div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
											{result.influencer.fullName?.charAt(
												0
											) ||
												result.socialAccount.username.charAt(
													1
												)}
										</div>
									</div>

									<div className="flex-1">
										<div className="flex justify-between items-start">
											<div>
												<h3 className="font-medium">
													{result.influencer
														.fullName || 'Unnamed'}
												</h3>
												<p className="text-sm text-gray-600">
													{
														result.socialAccount
															.username
													}
												</p>
											</div>
											<div
												className={`text-sm font-semibold ${getScoreColor(
													result.score
												)}`}
											>
												{formatScore(result.score)}
											</div>
										</div>

										<div className="mt-1 flex items-center text-sm text-gray-500">
											<span className="mr-3">
												<span className="font-medium">
													{result.socialAccount.followers.toLocaleString()}
												</span>{' '}
												followers
											</span>
											<span>
												<span className="font-medium">
													{(
														result.socialAccount
															.engagementRate *
														100
													).toFixed(1)}
													%
												</span>{' '}
												engagement
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Creator Detail Panel */}
				<div className="md:col-span-2">
					{selectedCreator ? (
						<div className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex items-center">
									<div className="w-16 h-16 rounded-full bg-gray-300 flex-shrink-0 mr-4">
										{/* Placeholder for profile image */}
										<div className="w-full h-full flex items-center justify-center text-gray-600 text-xl font-bold">
											{selectedCreator.influencer.fullName?.charAt(
												0
											) ||
												selectedCreator.socialAccount.username.charAt(
													1
												)}
										</div>
									</div>

									<div>
										<h2 className="text-xl font-bold">
											{
												selectedCreator.influencer
													.fullName
											}
										</h2>
										<p className="text-gray-600">
											{
												selectedCreator.socialAccount
													.username
											}
										</p>
										<p className="mt-1 text-sm text-gray-500">
											{selectedCreator.influencer
												.country ||
												'Location not specified'}{' '}
											•
											{calculateAge(
												selectedCreator.influencer
													.birthday
											)}{' '}
											years old
										</p>
									</div>
								</div>

								<div className="text-center">
									<div
										className={`text-2xl font-bold ${getScoreColor(
											selectedCreator.score
										)}`}
									>
										{formatScore(selectedCreator.score)}
									</div>
									<p className="text-sm text-gray-500">
										Match Score
									</p>
								</div>
							</div>

							<div className="mt-6">
								<p className="text-gray-700">
									{selectedCreator.socialAccount.bio}
								</p>
							</div>

							{/* Match Details */}
							<div className="mt-8">
								<h3 className="text-lg font-semibold mb-4">
									Match Details
								</h3>

								<div className="grid grid-cols-2 gap-4">
									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Interests
										</h4>
										<p>
											{formatInterests(
												selectedCreator.influencer
													.interests
											)}
										</p>
										<div className="mt-3 flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.interestsScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.interestsScore
												)}
											</span>
										</div>
									</div>

									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Demographics
										</h4>
										<p>
											Age:{' '}
											{calculateAge(
												selectedCreator.influencer
													.birthday
											)}{' '}
											years
										</p>
										<div className="mt-3 flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.influencerAgeScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.influencerAgeScore
												)}
											</span>
										</div>
									</div>

									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Audience Age Distribution
										</h4>
										<div className="grid grid-cols-5 gap-1 mb-2">
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audience18Percentage
													}
													%
												</div>
												<div>18-24</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audience25Percentage
													}
													%
												</div>
												<div>25-34</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audience35Percentage
													}
													%
												</div>
												<div>35-44</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audience45Percentage
													}
													%
												</div>
												<div>45-54</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audience55Percentage
													}
													%
												</div>
												<div>55+</div>
											</div>
										</div>
										<div className="flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.audienceAgeScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.audienceAgeScore
												)}
											</span>
										</div>
									</div>

									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Audience Countries
										</h4>
										<div className="grid grid-cols-3 gap-1 mb-2">
											{selectedCreator.socialAccount
												.audienceCountry1 && (
												<div className="text-xs">
													<div className="font-semibold">
														{
															selectedCreator
																.socialAccount
																.audienceCountry1Percentage
														}
														%
													</div>
													<div>
														{
															selectedCreator
																.socialAccount
																.audienceCountry1
														}
													</div>
												</div>
											)}
											{selectedCreator.socialAccount
												.audienceCountry2 && (
												<div className="text-xs">
													<div className="font-semibold">
														{
															selectedCreator
																.socialAccount
																.audienceCountry2Percentage
														}
														%
													</div>
													<div>
														{
															selectedCreator
																.socialAccount
																.audienceCountry2
														}
													</div>
												</div>
											)}
											{selectedCreator.socialAccount
												.audienceCountry3 && (
												<div className="text-xs">
													<div className="font-semibold">
														{
															selectedCreator
																.socialAccount
																.audienceCountry3Percentage
														}
														%
													</div>
													<div>
														{
															selectedCreator
																.socialAccount
																.audienceCountry3
														}
													</div>
												</div>
											)}
										</div>
										<div className="flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.audienceCountryScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.audienceCountryScore
												)}
											</span>
										</div>
									</div>

									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Audience Gender
										</h4>
										<div className="grid grid-cols-3 gap-1 mb-2">
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audienceFemalePercentage
													}
													%
												</div>
												<div>Female</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audienceMalePercentage
													}
													%
												</div>
												<div>Male</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{
														selectedCreator
															.socialAccount
															.audienceOtherPercentage
													}
													%
												</div>
												<div>Other</div>
											</div>
										</div>
										<div className="flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.audienceGenderScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.audienceGenderScore
												)}
											</span>
										</div>
									</div>

									<div className="border rounded-lg p-4">
										<h4 className="font-medium text-gray-700 mb-3">
											Performance Metrics
										</h4>
										<div className="grid grid-cols-3 gap-1 mb-2">
											<div className="text-xs">
												<div className="font-semibold">
													{selectedCreator.socialAccount.followers.toLocaleString()}
												</div>
												<div>Followers</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{(
														selectedCreator
															.socialAccount
															.engagementRate *
														100
													).toFixed(1)}
													%
												</div>
												<div>Engagement</div>
											</div>
											<div className="text-xs">
												<div className="font-semibold">
													{selectedCreator.socialAccount.averageViews.toLocaleString()}
												</div>
												<div>Avg. Views</div>
											</div>
										</div>
										<div className="flex items-center">
											<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
												<div
													className="h-full bg-blue-500"
													style={{
														width: `${
															selectedCreator
																.details
																.metricsScore *
															100
														}%`,
													}}
												/>
											</div>
											<span className="ml-2 text-sm font-medium">
												{formatScore(
													selectedCreator.details
														.metricsScore
												)}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="mt-8 flex justify-end space-x-4">
								<button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
									Save to List
								</button>
								<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
									Contact Creator
								</button>
							</div>
						</div>
					) : (
						<div className="h-full flex items-center justify-center p-8 text-center text-gray-500">
							<div>
								<svg
									className="w-16 h-16 mx-auto text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									></path>
								</svg>
								<h3 className="mt-4 text-lg font-medium">
									Select a creator
								</h3>
								<p className="mt-2">
									Click on a creator from the list to view
									detailed match information
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CreatorMatchResults
