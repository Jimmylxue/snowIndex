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
			{/* font-sans */}
			{/* <p
				style={{
					fontFamily: 'Zpix',
				}}
			>
				hello world 你好世界
			</p> */}
			<div
				className="bg-black h-screen overflow-auto p-5 relative font-sans"
				// style={{
				// 	fontFamily: 'Zpix',
				// }}
			>
				{terminalNode}
			</div>
		</QueryClientProvider>
	)
}

export default App
