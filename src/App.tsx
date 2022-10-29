import { config } from '@config/react-query'
import TerminalPage from './pages/terminal'

function App() {
	const { queryClient, QueryClientProvider } = config()

	return (
		<QueryClientProvider client={queryClient}>
			<div className="bg-black h-screen overflow-auto p-5 relative font-sans">
				<TerminalPage />
			</div>
		</QueryClientProvider>
	)
}

export default App
