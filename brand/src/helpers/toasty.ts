import { GetErrorResponse } from '@/queries/http'
import { toast } from 'sonner'

export function toastError(error: GetErrorResponse) {
	toast.error(error.error, {
		description: error.errorDescription || undefined,
	})
}
