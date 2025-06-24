import React, { useState } from 'react'
import RangeSlider from '@/components/ui/RangeSlider'
import { formatNumber } from '@/helpers/numbers'
import { Slider } from '@/components/ui/slider'

const BrandMatchmakingInterface = () => {
	// State for brand preferences
	const [brandPreferences, setBrandPreferences] = useState<any>({
		// Interests (using checkboxes in UI)
		interests: [],

		// Influencer age range
		influencerAgeRange: {
			min: 18,
			max: 35,
		},

		// Audience age distribution (slider values 0-100)
		audienceAgeDistribution: {
			age18: 20, // 18-24
			age25: 20, // 25-34
			age35: 20, // 35-44
			age45: 20, // 45-54
			age55: 20, // 55+
		},

		// Country preferences (selected countries get weight 1.0)
		selectedCountries: [],

		// Audience gender distribution (slider values 0-100, always sum to 100)
		audienceGenderDistribution: {
			female: 33,
			male: 33,
			other: 34,
		},

		// Minimum metrics
		minimumFollowers: 5000,
		minimumEngagementRate: 2, // Store as percentage (2%)
		minimumAverageViews: 1000,
	})

	// Available interests
	const availableInterests = [
		{ id: 1, name: 'Fashion' },
		{ id: 2, name: 'Beauty' },
		{ id: 3, name: 'Fitness' },
		{ id: 4, name: 'Food' },
		{ id: 5, name: 'Travel' },
		{ id: 6, name: 'Technology' },
		{ id: 7, name: 'Gaming' },
		{ id: 8, name: 'Lifestyle' },
		{ id: 9, name: 'Music' },
		{ id: 10, name: 'Entertainment' },
		{ id: 11, name: 'Business' },
		{ id: 12, name: 'Education' },
	]

	// Popular countries
	const popularCountries = [
		{ code: 'US', name: 'United States' },
		{ code: 'CA', name: 'Canada' },
		{ code: 'UK', name: 'United Kingdom' },
		{ code: 'AU', name: 'Australia' },
		{ code: 'FR', name: 'France' },
		{ code: 'DE', name: 'Germany' },
		{ code: 'JP', name: 'Japan' },
		{ code: 'BR', name: 'Brazil' },
		{ code: 'IN', name: 'India' },
		{ code: 'MX', name: 'Mexico' },
	]

	// Toggle interest selection
	const toggleInterest = (interestId: number) => {
		if (brandPreferences.interests.includes(interestId)) {
			setBrandPreferences({
				...brandPreferences,
				interests: brandPreferences.interests.filter(
					(id: any) => id !== interestId
				),
			})
		} else {
			setBrandPreferences({
				...brandPreferences,
				interests: [...brandPreferences.interests, interestId],
			})
		}
	}

	// Toggle country selection
	const toggleCountry = (countryCode: string) => {
		if (brandPreferences.selectedCountries.includes(countryCode)) {
			setBrandPreferences({
				...brandPreferences,
				selectedCountries: brandPreferences.selectedCountries.filter(
					(code: any) => code !== countryCode
				),
			})
		} else {
			setBrandPreferences({
				...brandPreferences,
				selectedCountries: [
					...brandPreferences.selectedCountries,
					countryCode,
				],
			})
		}
	}

	// Handle influencer age range change
	const handleAgeRangeChange = (values: { min: number; max: number }) => {
		setBrandPreferences({
			...brandPreferences,
			influencerAgeRange: values,
		})
	}

	// Handle audience age distribution change
	const handleAudienceAgeChange = (key: string, value: any) => {
		setBrandPreferences({
			...brandPreferences,
			audienceAgeDistribution: {
				...brandPreferences.audienceAgeDistribution,
				[key]: value,
			},
		})
	}

	// Handle gender distribution change - ensures total is 100%
	const handleGenderDistributionChange = (gender: string, value: any) => {
		const current = brandPreferences.audienceGenderDistribution
		const otherGenders = Object.keys(current).filter((g) => g !== gender)

		// Calculate the current sum of other genders
		const otherSum = otherGenders.reduce((sum, g) => sum + current[g], 0)

		// If other sum is 0, we can't adjust (edge case)
		if (otherSum === 0) return

		// Calculate how much we need to adjust other genders by
		const delta = value - current[gender]

		// Create new distribution
		const newDistribution = { ...current, [gender]: value }

		// Adjust other genders proportionally
		otherGenders.forEach((g) => {
			const proportion = current[g] / otherSum
			newDistribution[g] = Math.max(0, current[g] - delta * proportion)
		})

		// Round values and ensure they sum to 100
		let total = 0
		Object.keys(newDistribution).forEach((g) => {
			newDistribution[g] = Math.round(newDistribution[g])
			total += newDistribution[g]
		})

		// Handle rounding errors
		if (total !== 100) {
			const diff = 100 - total
			// Add/subtract from the largest value
			const largest = Object.keys(newDistribution).reduce((a, b) =>
				newDistribution[a] > newDistribution[b] ? a : b
			)
			newDistribution[largest] += diff
		}

		setBrandPreferences({
			...brandPreferences,
			audienceGenderDistribution: newDistribution,
		})
	}

	// Convert UI preferences to algorithm format
	const getAlgorithmParameters = () => {
		// Convert selected countries to weighted object
		const countryPreferences: {
			[key: string]: number
		} = {}
		brandPreferences.selectedCountries.forEach((code: any) => {
			countryPreferences[code] = 1.0
		})

		// Convert audience age distribution to weights (0-1)
		const audienceAgePreferences = {
			age18: brandPreferences.audienceAgeDistribution.age18 / 100,
			age25: brandPreferences.audienceAgeDistribution.age25 / 100,
			age35: brandPreferences.audienceAgeDistribution.age35 / 100,
			age45: brandPreferences.audienceAgeDistribution.age45 / 100,
			age55: brandPreferences.audienceAgeDistribution.age55 / 100,
		}

		// Convert gender distribution to weights (0-1)
		const audienceGenderPreferences = {
			female: brandPreferences.audienceGenderDistribution.female / 100,
			male: brandPreferences.audienceGenderDistribution.male / 100,
			other: brandPreferences.audienceGenderDistribution.other / 100,
		}

		return {
			interests: brandPreferences.interests,
			influencerAgeRange: {
				min: brandPreferences.influencerAgeRange.min,
				max: brandPreferences.influencerAgeRange.max,
			},
			audienceAgePreferences,
			audienceCountryPreferences: countryPreferences,
			audienceGenderPreferences,
			minimumFollowers: brandPreferences.minimumFollowers,
			minimumEngagementRate: brandPreferences.minimumEngagementRate / 100, // Convert from percentage
			minimumAverageViews: brandPreferences.minimumAverageViews,
		}
	}

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const algorithmParams = getAlgorithmParameters()
		console.log('Algorithm parameters:', algorithmParams)
		// Here you would call your API with these parameters
	}

	return (
		<div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">
				Find Your Perfect Creator Match
			</h1>

			<form onSubmit={handleSubmit}>
				{/* Interests Section */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Content Interests
					</h2>
					<p className="text-gray-600 mb-4">
						Select content categories that align with your brand
					</p>

					<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
						{availableInterests.map((interest) => (
							<div
								key={interest.id}
								className={`p-3 border rounded-lg cursor-pointer transition-colors ${
									brandPreferences.interests.includes(
										interest.id
									)
										? 'bg-blue-100 border-blue-500'
										: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
								}`}
								onClick={() => toggleInterest(interest.id)}
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										className="mr-2"
										checked={brandPreferences.interests.includes(
											interest.id
										)}
										onChange={() => {}}
									/>
									<span>{interest.name}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Influencer Age Range */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Creator Age Range
					</h2>
					<p className="text-gray-600 mb-4">
						Select the age range of creators you want to work with
					</p>

					<div className="px-4 py-6">
						<RangeSlider
							min={13}
							max={65}
							step={1}
							value={brandPreferences.influencerAgeRange}
							onChange={handleAgeRangeChange}
							valueLabelFormatter={(value) => formatNumber(value)}
						/>
						<div className="flex justify-between text-sm">
							<span>
								{brandPreferences.influencerAgeRange.min} years
							</span>
							<span>
								{brandPreferences.influencerAgeRange.max} years
							</span>
						</div>
					</div>
				</div>

				{/* Audience Age Distribution */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Target Audience Age
					</h2>
					<p className="text-gray-600 mb-4">
						Adjust importance of each age group in your target
						audience
					</p>

					<div className="space-y-4 px-2">
						<div>
							<div className="flex justify-between mb-1">
								<label className="text-sm font-medium">
									18-24 years
								</label>
								<span className="text-sm text-gray-500">
									{
										brandPreferences.audienceAgeDistribution
											.age18
									}
									%
								</span>
							</div>
							<Slider
								min={0}
								max={100}
								step={5}
								value={[
									brandPreferences.audienceAgeDistribution
										.age18,
								]}
								onValueChange={([value]) =>
									handleAudienceAgeChange('age18', value)
								}
							/>
						</div>

						<div>
							<div className="flex justify-between mb-1">
								<label className="text-sm font-medium">
									25-34 years
								</label>
								<span className="text-sm text-gray-500">
									{
										brandPreferences.audienceAgeDistribution
											.age25
									}
									%
								</span>
							</div>
							<Slider
								min={0}
								max={100}
								step={5}
								value={[
									brandPreferences.audienceAgeDistribution
										.age25,
								]}
								onValueChange={([value]) =>
									handleAudienceAgeChange('age25', value)
								}
							/>
						</div>

						<div>
							<div className="flex justify-between mb-1">
								<label className="text-sm font-medium">
									35-44 years
								</label>
								<span className="text-sm text-gray-500">
									{
										brandPreferences.audienceAgeDistribution
											.age35
									}
									%
								</span>
							</div>
							<Slider
								min={0}
								max={100}
								step={5}
								value={[
									brandPreferences.audienceAgeDistribution
										.age35,
								]}
								onValueChange={([value]) =>
									handleAudienceAgeChange('age35', value)
								}
							/>
						</div>

						<div>
							<div className="flex justify-between mb-1">
								<label className="text-sm font-medium">
									45-54 years
								</label>
								<span className="text-sm text-gray-500">
									{
										brandPreferences.audienceAgeDistribution
											.age45
									}
									%
								</span>
							</div>
							<Slider
								min={0}
								max={100}
								step={5}
								value={[
									brandPreferences.audienceAgeDistribution
										.age45,
								]}
								onValueChange={([value]) =>
									handleAudienceAgeChange('age45', value)
								}
							/>
						</div>

						<div>
							<div className="flex justify-between mb-1">
								<label className="text-sm font-medium">
									55+ years
								</label>
								<span className="text-sm text-gray-500">
									{
										brandPreferences.audienceAgeDistribution
											.age55
									}
									%
								</span>
							</div>
							<Slider
								min={0}
								max={100}
								step={5}
								value={[
									brandPreferences.audienceAgeDistribution
										.age55,
								]}
								onValueChange={([value]) =>
									handleAudienceAgeChange('age55', value)
								}
							/>
						</div>
					</div>
				</div>

				{/* Audience Countries */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Target Audience Location
					</h2>
					<p className="text-gray-600 mb-4">
						Select countries for your target audience
					</p>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
						{popularCountries.map((country) => (
							<div
								key={country.code}
								className={`p-2 border rounded-md cursor-pointer transition-colors ${
									brandPreferences.selectedCountries.includes(
										country.code
									)
										? 'bg-blue-100 border-blue-500'
										: 'bg-gray-50 border-gray-200 hover:bg-gray-100'
								}`}
								onClick={() => toggleCountry(country.code)}
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										className="mr-2"
										checked={brandPreferences.selectedCountries.includes(
											country.code
										)}
										onChange={() => {}}
									/>
									<span>{country.name}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Audience Gender Distribution */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Target Audience Gender
					</h2>
					<p className="text-gray-600 mb-4">
						Adjust the gender distribution of your target audience
					</p>

					<div className="px-4 py-6">
						<div className="flex items-center mb-5">
							<span className="w-16 text-sm">Female</span>
							<div className="flex-1 mx-4">
								<Slider
									min={0}
									max={100}
									step={1}
									value={[
										brandPreferences
											.audienceGenderDistribution.female,
									]}
									onValueChange={([value]) =>
										handleGenderDistributionChange(
											'female',
											value
										)
									}
								/>
							</div>
							<span className="w-12 text-right text-sm">
								{
									brandPreferences.audienceGenderDistribution
										.female
								}
								%
							</span>
						</div>

						<div className="flex items-center mb-5">
							<span className="w-16 text-sm">Male</span>
							<div className="flex-1 mx-4">
								<Slider
									min={0}
									max={100}
									step={1}
									value={[
										brandPreferences
											.audienceGenderDistribution.male,
									]}
									onValueChange={([value]) =>
										handleGenderDistributionChange(
											'male',
											value
										)
									}
								/>
							</div>
							<span className="w-12 text-right text-sm">
								{
									brandPreferences.audienceGenderDistribution
										.male
								}
								%
							</span>
						</div>

						<div className="flex items-center">
							<span className="w-16 text-sm">Other</span>
							<div className="flex-1 mx-4">
								<Slider
									min={0}
									max={100}
									step={1}
									value={[
										brandPreferences
											.audienceGenderDistribution.other,
									]}
									onValueChange={([value]) =>
										handleGenderDistributionChange(
											'other',
											value
										)
									}
								/>
							</div>
							<span className="w-12 text-right text-sm">
								{
									brandPreferences.audienceGenderDistribution
										.other
								}
								%
							</span>
						</div>
					</div>
				</div>

				{/* Performance Metrics */}
				<div className="mb-8">
					<h2 className="text-xl font-semibold mb-3">
						Minimum Requirements
					</h2>
					<p className="text-gray-600 mb-4">
						Set minimum performance metrics for creators
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<label className="block text-sm font-medium mb-2">
								Minimum Followers
							</label>
							<select
								className="w-full p-2 border rounded-md"
								value={brandPreferences.minimumFollowers}
								onChange={(e) =>
									setBrandPreferences({
										...brandPreferences,
										minimumFollowers: parseInt(
											e.target.value
										),
									})
								}
							>
								<option value={1000}>1,000+</option>
								<option value={5000}>5,000+</option>
								<option value={10000}>10,000+</option>
								<option value={50000}>50,000+</option>
								<option value={100000}>100,000+</option>
								<option value={500000}>500,000+</option>
								<option value={1000000}>1,000,000+</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Minimum Engagement Rate
							</label>
							<select
								className="w-full p-2 border rounded-md"
								value={brandPreferences.minimumEngagementRate}
								onChange={(e) =>
									setBrandPreferences({
										...brandPreferences,
										minimumEngagementRate: parseFloat(
											e.target.value
										),
									})
								}
							>
								<option value={1}>1%+</option>
								<option value={2}>2%+</option>
								<option value={3}>3%+</option>
								<option value={5}>5%+</option>
								<option value={7}>7%+</option>
								<option value={10}>10%+</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Minimum Average Views
							</label>
							<select
								className="w-full p-2 border rounded-md"
								value={brandPreferences.minimumAverageViews}
								onChange={(e) =>
									setBrandPreferences({
										...brandPreferences,
										minimumAverageViews: parseInt(
											e.target.value
										),
									})
								}
							>
								<option value={1000}>1,000+</option>
								<option value={5000}>5,000+</option>
								<option value={10000}>10,000+</option>
								<option value={50000}>50,000+</option>
								<option value={100000}>100,000+</option>
								<option value={500000}>500,000+</option>
							</select>
						</div>
					</div>
				</div>

				{/* Submit Button */}
				<div className="text-center">
					<button
						type="submit"
						className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
					>
						Find Matching Creators
					</button>
				</div>
			</form>
		</div>
	)
}

export default BrandMatchmakingInterface
