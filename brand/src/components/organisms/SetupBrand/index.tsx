import Meta from '@/components/layout/Meta'
import Button from '@/components/ui/Button'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/Form'
import SingleImageUpload from '@/components/ui/ImageUpload/SingleImageUpload'
import { FormInput } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { toastError } from '@/helpers/toasty'
import { cn } from '@/helpers/utils'
import useUser from '@/hooks/use-user'
import http, { getError } from '@/queries/http'
import upload from '@/queries/upload'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const schema = z.object({
	brandName: z.string().nonempty('Brand name is required'),
	brandIcon: z.any(),
})

export default function SetupBrand() {
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			brandName: '',
			brandIcon: null,
		},
	})

	async function onSubmit(values: z.infer<typeof schema>) {
		if (submitting) return
		if (!values.brandIcon) {
			return form.setError('brandIcon', {
				type: 'manual',
				message: 'Please upload a brand icon',
			})
		}
		setSubmitting(true)
		await upload({
			file: values.brandIcon,
		})
			.then(async (data) => {
				await http
					.post(`/create-brand`, {
						...values,
						iconId: data?.mediaId,
					})
					.then((data) => {
						router.replace(`/${data.data.id}`)
					})
					.catch((error) => toastError(getError(error)))
					.finally(() => setSubmitting(false))
			})
			.catch((error) => toastError(getError(error)))
			.finally(() => setSubmitting(false))
	}

	return (
		<div className="h-screen lg:grid grid-cols-[1fr_55%] w-full bg-white">
			<Meta title="Setup Brand • AdWiseli" />
			<div className="m-6">
				<div
					style={{
						backgroundImage: `url(/images/1.jpg)`,
					}}
					className="w-full bg-cover relative overflow-hidden h-full rounded-3xl"
				>
					{' '}
					<div className="absolute h-full inset-0 bg-gradient-to-t from-primary via-orange-primary/70 to-transparent"></div>
				</div>
			</div>
			<div className="items-center h-full justify-center flex">
				<div className="flex items-center justify-center w-full">
					<div className="w-full flex flex-col gap-8 max-w-sm p-6 relative">
						<div className="flex flex-col">
							<h2 className="text-3xl mb-2 font-semibold">
								Create a brand
							</h2>
						</div>

						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-full flex flex-col gap-4"
							>
								<FormField
									name="brandName"
									render={({ field }) => (
										<FormItem>
											<FormInput
												{...field}
												label="Brand name"
												description="This is the name of your brand"
												placeholder="AdWiseli"
											/>
										</FormItem>
									)}
								/>
								<FormField
									name="brandIcon"
									render={({ field }) => (
										<FormItem>
											<Label className="font-semibold text-sm">
												Brand Logo
											</Label>
											<SingleImageUpload
												initialImage={undefined}
												aspectRatio={1 / 1}
												onImageCrop={(file) => {
													field.onChange(file)
												}}
												className={cn(
													'size-40 object-cover rounded-lg'
												)}
												chooseImageClassName="object-contain w-full h-full"
												removable={true}
											/>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="mt-4 flex flex-col">
									<Button
										loading={submitting}
										disabled={submitting}
										type="submit"
										variant={'primary'}
										onClick={() => {
											form.trigger()
											console.log(form.formState.errors)
										}}
									>
										Continue
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}
