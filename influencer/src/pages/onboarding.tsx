import Button from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/Form'
import { FormInput } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select'
import { getAge } from '@/helpers/date'
import { toastError } from '@/helpers/toasty'
import { cn } from '@/helpers/utils'
import useCountries from '@/hooks/use-countries'
import useInterests from '@/hooks/use-interests'
import useUser from '@/hooks/use-user'
import http, { getError } from '@/queries/http'
import { zodResolver } from '@hookform/resolvers/zod'
import { startOfDay } from 'date-fns'
import { CircleSmall, Mars, Venus } from 'lucide-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import * as z from 'zod'

const schema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	birthday: z
		.date({ message: 'Please select your birthday' })
		.refine((value) => value < startOfDay(new Date()), {
			message: "Birthday can't be in the future",
		})
		.refine((value) => getAge(value) >= 18, {
			message: 'You must be at least 18 years old',
		}),
	country: z.string().min(1, 'Country is required'),
	gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
		message: 'Please select a gender',
	}),
	interests: z.array(z.number()).nonempty().max(5).min(1, {
		message: 'Select at least 1 content type',
	}),
})

function Onboarding() {
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const { countries } = useCountries()
	const { interests } = useInterests()

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			fullName: '',
			birthday: undefined as unknown as Date,
			country: '',
			gender: undefined as unknown as 'MALE' | 'FEMALE' | 'OTHER',
			interests: [] as unknown as [number, ...number[]],
		},
	})

	async function onSubmit(values: z.infer<typeof schema>) {
		if (submitting) return
		setSubmitting(true)
		await http
			.post(`/user/onboarding`, values)
			.then((data) => {
				window.location.href = '/'
			})
			.catch((error) => toastError(getError(error)))
			.finally(() => setSubmitting(false))
	}

	return (
		<div className="bg-neutral-50 h-screen">
			<div className="max-w-xl border-x bg-white h-full p-10 mx-auto">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-8 pb-10 lg:pb-0"
					>
						<h2 className="text-3xl mb-2 font-semibold">
							Your information
						</h2>
						<div className="flex flex-col gap-4 w-full">
							<FormField
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormInput
											{...field}
											label="Full name"
											placeholder="Josephine Abigail"
										/>
									</FormItem>
								)}
							/>
							<FormField
								name="country"
								render={({ field }) => (
									<FormItem>
										<Label className="text-sm font-semibold">
											Country
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
															key={country.code}
															value={country.code}
														>
															<div className="flex items-center gap-2">
																<img
																	src={`https://flagsapi.com/${country.code}/flat/64.png`}
																	className="w-5 h-5 rounded-full flex-shrink-0 object-cover"
																/>
																{country.name}
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
								name="birthday"
								render={({ field }) => (
									<FormItem className="w-full text-sm font-regular">
										<Label className="text-sm font-semibold">
											Birthday
										</Label>
										<DatePicker
											date={field.value}
											onSelect={field.onChange}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="gender"
								render={({ field }) => (
									<FormItem>
										<Label className="text-sm font-semibold">
											Gender
										</Label>
										<Select
											value={field.value}
											onValueChange={(value) =>
												field.onChange(value)
											}
										>
											<SelectTrigger>
												<SelectValue placeholder="What's your gender" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value={'FEMALE'}>
													<div className="flex items-center gap-2">
														<Venus size={16} />
														<p>Female</p>
													</div>
												</SelectItem>
												<SelectItem value={'MALE'}>
													<div className="flex items-center gap-2">
														<Mars size={16} />
														<p>Male</p>
													</div>
												</SelectItem>
												<SelectItem value={'OTHER'}>
													<div className="flex items-center gap-2">
														<CircleSmall
															size={16}
														/>
														<p>Other</p>
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name="interests"
								render={({ field }) => (
									<FormItem className="flex flex-col gap-2">
										<div>
											<Label className="text-sm font-semibold">
												Content Types
											</Label>
											<p className="text-sm text-gray-500">
												Select the 5 types of content
												that you currently make the most
												of.
											</p>
										</div>

										<div className="flex flex-wrap gap-1 mt-2">
											{(interests || []).map(
												(interest) => (
													<p
														key={interest.id}
														className={cn(
															'rounded-full px-3 py-1 cursor-pointer text-xs font-medium border',
															field.value.includes(
																interest.id
															) &&
																'bg-primary/10 border-primary text-primary',
															field.value
																.length >= 5 &&
																!field.value.includes(
																	interest.id
																) &&
																'opacity-50'
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
															} else if (
																(field.value
																	?.length ||
																	0) < 5
															) {
																field.onChange([
																	...field.value,
																	interest.id,
																])
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
						</div>

						<Button
							type="submit"
							disabled={submitting}
							loading={submitting}
							className="mt-4"
						>
							Save information
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default Onboarding
