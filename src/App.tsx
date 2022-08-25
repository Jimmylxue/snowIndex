import { useShotCut } from './hooks/useShotCut'
import { useTerminal } from './components/useTerminal'
import { config } from '@config/react-query'

function App() {
	const terminal = useTerminal()
	const { terminalNode } = terminal
	useShotCut(terminal)

	const { queryClient, QueryClientProvider } = config()

	return (
		<QueryClientProvider client={queryClient}>
			<div className="bg-black h-screen overflow-auto font-sans p-5 relative">
				{terminalNode}
			</div>
		</QueryClientProvider>
	)
}

export default App
