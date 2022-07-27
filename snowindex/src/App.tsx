import { useShotCut } from './hooks/useShotCut'
import { useTerminal } from './hooks/usetTerminal'

function App() {
	const terminal = useTerminal()
	const { terminalNode } = terminal
	useShotCut(terminal)

	return (
		<div
			className="bg-black h-screen overflow-hidden font-sans p-5"
			onClick={() => {
				terminal.focusInput()
			}}
		>
			<div className=" text-white">
				<p>Welcome to SnowIndex, This is awesome!</p>
				<p>
					Author Jimmyxuexue, reference from{' '}
					<a className=" text-blue-500">coder_yupi</a>
				</p>
				{terminalNode}
			</div>
		</div>
	)
}

export default App
