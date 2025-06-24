import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useRef } from 'react'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Modal } from '@/components/ui/Modal'
import Button from '../Button'
import { Image } from 'lucide-react'

type ImageCropperModalProps = {
	file: File
	aspectRatio: number
}

export default NiceModal.create(
	({ file, aspectRatio }: ImageCropperModalProps) => {
		const modal = useModal()

		const cropperRef = useRef<ReactCropperElement>(null)

		async function cancel() {
			modal.reject()
			modal.hide()
		}

		async function confirm() {
			const cropper = cropperRef?.current?.cropper
			if (!cropper) return cancel()
			let base64 = cropper.getCroppedCanvas().toDataURL()

			let blob = await fetch(base64).then((r) => r.blob())

			let fileName = file.name || 'image.png'

			let newFile = new File([blob], fileName, { type: 'image/png' })
			modal.resolve(newFile)
			modal.hide()
		}

		let fileUrl = URL.createObjectURL(file)

		return (
			<Modal modal={modal} className="overflow-hidden" closeable={false}>
				<div className="flex flex-col gap-6">
					<div className="flex items-center gap-3">
						<div className="rounded-lg border p-3 bg-gray-50">
							<Image className="text-neutral-700" size={20} />
						</div>
						<div className="flex flex-col">
							<h2 className="text-lg font-medium">Crop image</h2>
							<p className="text-sm text-neutral-700">
								Select the area of the image you want to use
							</p>
						</div>
					</div>
					<div className="flex-col gap-4 flex items-center">
						<Cropper
							ref={cropperRef}
							src={fileUrl}
							aspectRatio={aspectRatio}
							zoomOnWheel={false}
							className="w-fit"
						/>
					</div>
					<div className="flex gap-2">
						<Button
							onClick={cancel}
							variant="outline"
							className="flex-1"
						>
							Cancel
						</Button>
						<Button
							onClick={confirm}
							variant="secondary"
							className="flex-1"
						>
							Crop image
						</Button>
					</div>
				</div>
			</Modal>
		)
	}
)
