import { useRef } from 'react'
import { useShotCut } from './hooks/useShotCut'
import { useTerminal } from './hooks/usetTerminal'

function App() {
	const inputRef = useRef<HTMLInputElement>(null)
	const terminal = useTerminal(inputRef.current!)
	useShotCut(terminal)
	// const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	console.log(e.target.value)
	// }

	// const keydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
	// 	// console.log('keydown', e.code)
	// 	if (e.code === 'Enter') {
	// 		console.log('回车键')
	// 	}
	// }

	return (
		<div
			className="bg-black h-screen overflow-hidden font-sans p-5"
			onClick={() => {
				inputRef.current?.focus()
			}}
		>
			<div className=" text-white">
				<p>Welcome to SnowIndex, This is awesome!</p>
				<p>
					Author Jimmyxuexue, reference from{' '}
					<a className=" text-blue-500">coder_yupi</a>
				</p>

				<p className="mt-8">
					<span>[local]$ </span>
					<input
						ref={inputRef}
						className=" bg-none outline-none bg-transparent  w-80"
						type="text"
						autoFocus
						// onChange={changeInput}
						// onKeyDown={keydown}
					/>
				</p>
			</div>
		</div>
	)
}

export default App
