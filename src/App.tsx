import { useShotCut } from './hooks/useShotCut'
import { useTerminal } from './components/useTerminal'

function App() {
	const terminal = useTerminal()
	const { terminalNode } = terminal
	useShotCut(terminal)

	return (
		<div
			className="bg-black h-screen overflow-auto font-sans p-5 relative"
			onClick={() => {
				setTimeout(() => {
					// terminal.focusInput()
				}, 0)
			}}
		>
			{terminalNode}
		</div>
	)
}

export default App
