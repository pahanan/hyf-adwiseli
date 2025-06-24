import Layout from '@/components/layout'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/CheckBox'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/Form'
import { FormInput } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import RangeSlider from '@/components/ui/RangeSlider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select'
import { Slider } from '@/components/ui/slider'
import { formatNumber, twoDecimalFormatting } from '@/helpers/numbers'
import { toastError } from '@/helpers/toasty'
import toPascalCase from '@/helpers/toPascalCase'
import { capitalize, cn } from '@/helpers/utils'
import withBrand from '@/hoc/with-brand'
import useBrand from '@/hooks/use-brand'
import useCountries from '@/hooks/use-countries'
import useInterests from '@/hooks/use-interests'
import http, { getError } from '@/queries/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const CAMPAIGN_GOALS = [
	{
		title: 'Brand awareness',
		value: 'AWARENESS',
		description: 'Increase the visibility of your brand',
	},
	{
		title: 'Product promotion',
		value: 'PROMOTION',
		description: 'Promote a specific product or service',
	},
	{
		title: 'Sales and leads',
		value: 'SALES',
		description:
			'Generate sales or leads for a specific product or service',
	},
	{
		title: 'Page traffic',
		value: 'TRAFFIC',
		description: 'Drive traffic to a specific page',
	},
]

const CREATOR_TYPES = [
	{
		title: 'Influencer',
		value: 'INFLUENCER',
		description: 'You need an influencer to post about your brand',
	},
	{
		title: 'UGC',
		value: 'UGC',
		description: 'You need advertising content from a creator',
	},
]

const schema = z.object({
	campaignName: z.string(),
	campaignGoal: z.enum(['AWARENESS', 'PROMOTION', 'SALES', 'TRAFFIC']),
	influencerAmount: z.coerce
		.number({
			message: 'Please enter a valid number',
		})
		.max(30, 'Maximum number of influencers is 30'),
	influencerAgeRange: z
		.object({
			min: z.number(),
			max: z.number(),
		})
		.refine((data) => data.min <= data.max, {
			message: 'Minimum age must be lower than maximum age',
		}),
	contentType: z.enum(['INFLUENCER', 'UGC']),
	minimumFollowers: z.coerce
		.number({
			message: 'Please enter a valid number',
		})
		.min(0, 'Minimum followers must be greater than 0'),
	audienceInterests: z.array(z.number()),
	audienceCountry: z.string().min(1, 'Please select a country'),
	audienceAgeDistribution: z.object({
		age18: z.number(),
		age25: z.number(),
		age35: z.number(),
		age45: z.number(),
		age55: z.number(),
	}),
	audienceGenderDistribution: z.object({
		female: z.number(),
		male: z.number(),
		other: z.number(),
	}),
})

function NewCampaign() {
	const { brand } = useBrand()
	const { interests } = useInterests()
	const { countries } = useCountries()
	const router = useRouter()

	const [submitting, setSubmitting] = useState(false)

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			campaignName: 'My new campaign',
			campaignGoal: 'AWARENESS',
			influencerAmount: 20,
			influencerAgeRange: {
				min: 18,
				max: 55,
			},
			contentType: 'INFLUENCER',
			audienceInterests: [],
			audienceCountry: '',
			audienceAgeDistribution: {
				age18: 30,
				age25: 20,
				age35: 20,
				age45: 20,
				age55: 10,
			},
			audienceGenderDistribution: {
				female: 50,
				male: 40,
				other: 10,
			},
			minimumFollowers: 0,
		},
	})

	async function handleSubmit(data: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/${brand?.id}/campaigns/create-campaign`, data)
			.then(({ data }: any) => {
				toast.success('Campaign created successfully.')
				router.replace(`/${brand?.id}/campaigns/${data.id}`)
			})
			.catch((error: any) => {
				toastError(getError(error))
				setSubmitting(false)
			})
	}

	function handleDistributionChange({
		field,
		key,
		value,
	}: {
		field: any
		key: string
		value: number
	}) {
		console.log(field.value, key, value)

		const otherKeys = Object.keys(field.value).filter((k) => k !== key)
		const otherSum = otherKeys.reduce((sum, k) => sum + field.value[k], 0)
		// If other sum is 0, we can't adjust (edge case)
		if (otherSum === 0) return

		const delta = value - field.value[key]
		const newDistribution = {
			...field.value,
			[key]: value,
		}

		otherKeys.forEach((k) => {
			const proportion = field.value[k] / otherSum
			newDistribution[k] = Math.max(
				0,
				field.value[k] - delta * proportion
			)
		})

		let total = 0
		Object.keys(newDistribution).forEach((k) => {
			total += newDistribution[k]
		})
		if (total !== 100) {
			const diff = 100 - total
			// Add/subtract from the largest value
			const largest = Object.keys(newDistribution).reduce((a, b) =>
				newDistribution[a] > newDistribution[b] ? a : b
			)
			newDistribution[largest] += diff
		}

		field.onChange(newDistribution)
	}

	const campaignName = form.watch('campaignName')
	const campaignGoal = form.watch('campaignGoal')
	const influencerAmount = form.watch('influencerAmount')
	const contentType = form.watch('contentType')
	const audienceInterests = form.watch('audienceInterests')
	const influencerAgeRange = form.watch('influencerAgeRange')
	const minimumFollowers = form.watch('minimumFollowers')
	return (
		<Layout active="new-campaign" title="Create a new campaign">
			<div className="h-full flex">
				<div className="border-r flex-1 lg:max-w-[40%] bg-white overflow-y-scroll no-scrollbar pb-20">
					<div className="p-4 flex flex-col gap-3.5">
						<Form {...form}>
							<form
								className="w-full flex flex-col gap-6"
								onSubmit={form.handleSubmit(handleSubmit)}
							>
								<FormField
									name="campaignName"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="text"
												labelClassName="text-[13px] font-semibold mb-1"
												label="Campaign name"
												placeholder="Winter collection drop 24/25"
												required
											/>
										</FormItem>
									)}
								/>

								<FormField
									name="campaignGoal"
									render={({ field }) => (
										<FormItem className="flex-1 flex flex-col">
											<p className="mb-1 text-secondary font-semibold text-[13px]">
												Goal of campaign
											</p>
											<div className="grid grid-cols-2 gap-3">
												{CAMPAIGN_GOALS.map((goal) => (
													<button
														key={goal.value}
														type="button"
														className={cn(
															'flex cursor-pointer items-center gap-3 p-4 border rounded-lg',
															field.value ===
																goal.value
																? 'bg-primary/10 border-primary'
																: 'hover:bg-neutral-50'
														)}
														onClick={() => {
															console.log(
																goal.value
															)
															field.onChange(
																goal.value
															)
														}}
													>
														<div className="flex flex-col gap-1">
															<p className="font-semibold text-[13px] text-left">
																{goal.title}
															</p>
															<p className="text-[13px] text-neutral-700 text-left">
																{
																	goal.description
																}
															</p>
														</div>
													</button>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="influencerAmount"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="number"
												labelClassName="text-[13px] font-semibold mb-1"
												label="How many influencers do you want"
												placeholder="15"
												required
											/>
										</FormItem>
									)}
								/>
								<FormField
									name="contentType"
									render={({ field }) => (
										<FormItem className="flex-1 flex flex-col">
											<p className="font-semibold text-secondary text-[13px] mb-1">
												Type of content needed
											</p>
											<div className="grid grid-cols-2 gap-3">
												{CREATOR_TYPES.map((type) => (
													<button
														key={type.value}
														type="button"
														className={cn(
															'flex cursor-pointer items-center gap-3 p-4 border rounded-lg',
															field.value ===
																type.value
																? 'bg-primary/10 border-primary'
																: 'hover:bg-neutral-50'
														)}
														onClick={() =>
															field.onChange(
																type.value
															)
														}
													>
														<div className="flex flex-col gap-1">
															<p className="font-semibold text-[13px] text-left">
																{type.title}
															</p>
															<p className="text-[13px] text-neutral-700 text-left">
																{
																	type.description
																}
															</p>
														</div>
													</button>
												))}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="minimumFollowers"
									render={({ field }) => (
										<FormItem className="w-full text-sm font-regular">
											<FormInput
												{...field}
												type="number"
												labelClassName="text-[13px] font-semibold mb-1"
												label="Minimum followers"
												placeholder="1000"
												required
											/>
										</FormItem>
									)}
								/>
								<FormField
									name="influencerAgeRange"
									render={({ field }) => (
										<FormItem className="flex-1 flex flex-col mb-4">
											<p className="font-semibold mb-1 text-secondary text-[13px]">
												Creator age range
											</p>
											<p className="text-secondary text-xs">
												Your preferred age range for the
												creators
											</p>
											<div className="">
												<RangeSlider
													min={13}
													max={65}
													step={1}
													value={field.value}
													onChange={(value) => {
														field.onChange(value)
													}}
													valueLabelFormatter={(
														value
													) =>
														`${formatNumber(
															value
														)} years`
													}
												/>
											</div>
										</FormItem>
									)}
								/>
								<FormField
									name="audienceCountry"
									render={({ field }) => (
										<FormItem className="relative">
											<Label className="text-[13px] mb-1 font-semibold">
												Audience Country
											</Label>
											<Select
												value={field.value}
												onValueChange={(value) =>
													field.onChange(value)
												}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select a country" />
												</SelectTrigger>
												<SelectContent>
													{(countries || []).map(
														(country) => (
															<SelectItem
																key={
																	country.code
																}
																value={
																	country.code
																}
															>
																<div className="flex items-center gap-2">
																	<img
																		src={`https://flagsapi.com/${country.code}/flat/64.png`}
																		className="w-5 h-5 rounded-full flex-shrink-0 object-cover"
																	/>
																	{
																		country.name
																	}
																</div>
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="audienceInterests"
									render={({ field }) => (
										<FormItem className="flex flex-col">
											<div>
												<Label className="text-sm font-semibold">
													Interests
												</Label>
												<p className="text-sm text-gray-500">
													Select the interests that
													match your brand and your
													target audience
												</p>
											</div>
											<div>
												<button
													type="button"
													className="text-xs font-medium text-primary"
													onClick={() => {
														field.onChange(
															field.value
																.length ===
																interests?.length ||
																0
																? []
																: interests?.map(
																		(
																			interest
																		) =>
																			interest.id
																	)
														)
													}}
												>
													{field.value.length ===
														interests?.length || 0
														? 'Deselect all'
														: 'Select all'}
												</button>
											</div>

											<div className="flex flex-wrap gap-1 mt-2">
												{(interests || []).map(
													(interest) => (
														<p
															key={interest.id}
															className={cn(
																'rounded-full px-3 py-1 cursor-pointer text-xs font-normal border',
																field.value.includes(
																	interest.id
																)
																	? 'bg-primary/10 border-primary text-primary'
																	: 'hover:bg-gray-50'
															)}
															onClick={() => {
																if (
																	field.value.includes(
																		interest.id
																	)
																) {
																	field.onChange(
																		field.value.filter(
																			(
																				id: number
																			) =>
																				id !==
																				interest.id
																		)
																	)
																} else {
																	field.onChange(
																		[
																			...field.value,
																			interest.id,
																		]
																	)
																}
															}}
														>
															{interest.name}
														</p>
													)
												)}
											</div>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name="audienceAgeDistribution"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-1.5">
											<Label className="text-sm font-semibold">
												Audience Age Distribution
											</Label>
											<div className="flex flex-col gap-2">
												{[
													'age18',
													'age25',
													'age35',
													'age45',
													'age55',
												].map((value) => (
													<div
														key={value}
														className="flex items-center gap-2"
													>
														<p className="w-16 text-sm">
															{value ===
																'age18' &&
																'18-25'}
															{value ===
																'age25' &&
																'25-35'}
															{value ===
																'age35' &&
																'35-45'}
															{value ===
																'age45' &&
																'45-55'}
															{value ===
																'age55' &&
																'55+'}
														</p>
														<Slider
															min={0}
															max={100}
															step={1}
															value={[
																field.value[
																	value
																],
															]}
															onValueChange={([
																newValue,
															]) =>
																handleDistributionChange(
																	{
																		field: field,
																		key: value,
																		value: newValue,
																	}
																)
															}
														/>
														<p className="w-16 text-sm">
															{Math.round(
																field.value[
																	value
																]
															)}
															%
														</p>
													</div>
												))}
											</div>
										</FormItem>
									)}
								/>

								<FormField
									name="audienceGenderDistribution"
									render={({ field }) => (
										<FormItem className="flex flex-col gap-1.5">
											<Label className="text-sm font-semibold">
												Audience Gender Distribution
											</Label>
											<div className="flex flex-col gap-2">
												{[
													'male',
													'female',
													'other',
												].map((value) => (
													<div
														key={value}
														className="flex items-center gap-2"
													>
														<p className="w-16 text-sm">
															{capitalize(value)}
														</p>
														<Slider
															min={0}
															max={100}
															step={1}
															value={[
																field.value[
																	value
																],
															]}
															onValueChange={([
																newValue,
															]) =>
																handleDistributionChange(
																	{
																		field: field,
																		key: value,
																		value: newValue,
																	}
																)
															}
														/>
														<p className="w-16 text-sm">
															{Math.round(
																field.value[
																	value
																]
															)}
															%
														</p>
													</div>
												))}
											</div>
										</FormItem>
									)}
								/>
								<div className="flex flex-col gap-4 mt-3">
									<Button
										type="submit"
										size={'sm'}
										variant={'primary'}
										disabled={submitting}
										loading={submitting}
									>
										{form.watch('campaignName')
											? `Create "${form.watch(
													'campaignName'
												)}"`
											: 'Create campaign'}
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
				<div className="flex-1 bg-white max-h-[calc(100vh-65px)] flex flex-col w-full">
					<div className="flex-1 flex flex-col items-center justify-center relative">
						<div className="w-full h-full relative z-[20]  bg-white">
							<div className="absolute z-[50] top-0 right-0 left-0 flex items-center justify-center">
								<div className="bg-white px-3 py-2 rounded-full -mt-5 border flex items-center gap-2">
									<div className="relative flex items-center">
										<div className="h-[10px] w-[10px] rounded-full bg-green-500" />
										<div className="absolute inset-0">
											<div className="h-[10px] w-[10px] rounded-full bg-green-500 opacity-75 animate-ping" />
										</div>
									</div>
									<p className="text-sm font-medium">
										Live preview
									</p>
								</div>
							</div>
							<div className="w-full relative overflow-hidden h-[140px]">
								<img
									className="absolute blur-2xl w-full h-full inset-0 backdrop-blur-2xl"
									src={brand?.iconURL}
								></img>
							</div>
							<div className="px-10 z-[30] flex flex-col gap-4 relative -mt-7 pb-6">
								<img
									className="w-[70px] -ml-[6px] border-[6px] border-white h-[70px] rounded-xl"
									src={brand?.iconURL}
								></img>
								<div className="flex flex-col gap-1.5">
									{campaignName !== '' ? (
										<h2 className="font-medium text-2xl">
											{campaignName}
										</h2>
									) : (
										<div className="h-8 bg-neutral-100 rounded-md w-60 animate-pulse"></div>
									)}
									{campaignGoal && (
										<p className="text-neutral-700">
											This campaign is driven with a{' '}
											{campaignGoal.toLowerCase()} goal.
										</p>
									)}
								</div>

								<div className="border-y flex items-center gap-2 py-5 flex-wrap">
									{influencerAmount !== 0 && (
										<Badge stroke={true} color="purple">
											{influencerAmount} creators
										</Badge>
									)}
									{contentType && (
										<Badge stroke={true} color="blue">
											{toPascalCase(contentType)}
										</Badge>
									)}
									{influencerAgeRange && (
										<Badge stroke={true} color="orange">
											{influencerAgeRange['min']}-
											{influencerAgeRange['max']} years
										</Badge>
									)}
									{minimumFollowers && (
										<Badge stroke={true} color="yellow">
											Minimum {minimumFollowers} followers
										</Badge>
									)}
								</div>

								{/* Added sections for audience targeting information */}
								<div className="flex flex-col gap-6">
									{/* Audience Country */}
									{form.watch('audienceCountry') && (
										<div className="flex flex-col gap-2.5">
											<h3 className="font-medium text-sm">
												Target Location
											</h3>
											<div className="flex items-center gap-2">
												{countries &&
													countries.find(
														(c) =>
															c.code ===
															form.watch(
																'audienceCountry'
															)
													) && (
														<>
															<img
																src={`https://flagsapi.com/${form.watch(
																	'audienceCountry'
																)}/flat/64.png`}
																className="w-5 h-5 rounded-full flex-shrink-0 object-cover"
															/>
															<p className="text-sm text-neutral-700">
																{
																	countries.find(
																		(c) =>
																			c.code ===
																			form.watch(
																				'audienceCountry'
																			)
																	)?.name
																}
															</p>
														</>
													)}
											</div>
										</div>
									)}

									{/* Audience Interests */}
									{audienceInterests &&
										audienceInterests.length > 0 && (
											<div className="flex flex-col gap-2.5">
												<h3 className="font-medium text-sm">
													Creator Interests
												</h3>
												<div className="flex flex-wrap gap-1">
													{audienceInterests.map(
														(interestId) => {
															const interest =
																interests?.find(
																	(i) =>
																		i.id ===
																		interestId
																)
															return interest ? (
																<span
																	key={
																		interest.id
																	}
																	className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
																>
																	{
																		interest.name
																	}
																</span>
															) : null
														}
													)}
												</div>
											</div>
										)}

									{/* Age Distribution */}
									{form.watch('audienceAgeDistribution') && (
										<div className="flex flex-col gap-2.5">
											<h3 className="font-medium text-sm">
												Audience Age
											</h3>
											<div className="grid grid-cols-5 gap-6 mt-1">
												{Object.entries(
													form.watch(
														'audienceAgeDistribution'
													)
												).map(([key, value]) => (
													<div
														key={key}
														className="flex flex-col items-center"
													>
														<div className="w-full bg-gray-200 rounded-full h-1.5">
															<div
																className="bg-primary h-1.5 rounded-full"
																style={{
																	width: `${value}%`,
																}}
															></div>
														</div>
														<div className="flex justify-between w-full mt-1">
															<span className="text-xs text-gray-500">
																{key.replace(
																	'age',
																	''
																)}
															</span>
															<span className="text-xs font-medium">
																{Math.round(
																	Number(
																		value
																	)
																)}
																%
															</span>
														</div>
													</div>
												))}
											</div>
										</div>
									)}

									{/* Gender Distribution */}
									{form.watch(
										'audienceGenderDistribution'
									) && (
										<div className="flex flex-col gap-2.5">
											<h3 className="font-medium text-sm">
												Audience Gender
											</h3>
											<div className="flex items-center gap-6 w-full">
												{Object.entries(
													form.watch(
														'audienceGenderDistribution'
													)
												).map(([key, value]) => (
													<div
														key={key}
														className="flex-1"
													>
														<div className="w-full flex items-center gap-2">
															<div className="w-full bg-gray-200 rounded-full h-1.5">
																<div
																	className={`h-1.5 rounded-full ${
																		key ===
																		'female'
																			? 'bg-pink-500'
																			: key ===
																				  'male'
																				? 'bg-blue-500'
																				: 'bg-purple-500'
																	}`}
																	style={{
																		width: `${value}%`,
																	}}
																></div>
															</div>
														</div>
														<div className="flex justify-between w-full mt-1">
															<span className="text-xs text-gray-500">
																{capitalize(
																	key
																)}
															</span>
															<span className="text-xs font-medium">
																{Math.round(
																	Number(
																		value
																	)
																)}
																%
															</span>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default withBrand(NewCampaign)
