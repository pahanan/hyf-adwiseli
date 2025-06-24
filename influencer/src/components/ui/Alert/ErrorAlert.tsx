import { GetErrorResponse } from '@/queries/http'
import Alert from '.'

export default function ErrorAlert({
	error,
	className,
}: {
	error: unknown
	className?: string
}) {
	return (
		<Alert
			variant={'expanded'}
			color="error"
			title={
				error
					? (error as unknown as GetErrorResponse).error
					: 'An error occurred'
			}
			className={className}
		>
			{error
				? (error as unknown as GetErrorResponse).errorDescription
				: 'An error occurred. Please try again later.'}
		</Alert>
	)
}
