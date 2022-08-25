import { QueryClientProvider, QueryClient } from 'react-query'

export function config() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	})

	return {
		queryClient,
		QueryClientProvider,
	}
}
