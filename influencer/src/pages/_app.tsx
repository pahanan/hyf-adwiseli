import Meta from '@/components/layout/Meta'
import '@/styles/globals.css'
import NiceModal from '@ebay/nice-modal-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<NiceModal.Provider>
				<Meta />
				<Toaster position="bottom-right" richColors />
				<Component {...pageProps} />
			</NiceModal.Provider>
		</QueryClientProvider>
	)
}
