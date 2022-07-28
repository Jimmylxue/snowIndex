import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { TSnowTerminal } from 'types/TSnowTerminal'
import { uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint } from '@utils/hintExecute'

export function useTerminal(): TSnowTerminal {
	const inputRef = useRef<HTMLInputElement>(null)
	const [{ historyRecord, currentRecord }, dispatch] = useReducer(
		recordReducer,
		{
			historyRecord: [],
			currentRecord: [],
		}
	)
	const [hintText, setHintText] = useState('')
	let commandIndex = useMemo(() => historyRecord.length, [historyRecord.length])

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value)
		const instruct = e.target.value
		const instr = instruct.trim().split(' ')
		if (instr.length === 0) {
			return
		}
		setHintText(matchHint(instr[0])!)
		// matchHint(instr[0])
	}

	const terminalNode = (
		<div className="mt-8">
			{currentRecord.map(rec => (
				<p key={rec.id}>
					<span>[local]$ </span>
					<span>{rec.instruct}</span>
				</p>
			))}
			<p>
				<span>[local]$ </span>
				<input
					ref={inputRef}
					className=" bg-none outline-none bg-transparent  w-80"
					type="text"
					autoFocus
					onChange={changeInput}
				/>
			</p>
			{hintText && <p className=" text-gray-400">hint: {hintText}</p>}
		</div>
	)

	const temp = {
		terminalNode,
		focusInput: () => {
			inputRef.current?.focus()
		},
		clear: () => {
			inputRef.current!.value = ''
			dispatch({
				type: 'CLEAR_CURRENT',
			})
		},
		enter: () => {
			const instruct = inputRef.current?.value
			if (!instruct) {
				return
			}
			doCommandExecute(instruct, temp)
			dispatch({
				type: 'ADD_RECORD',
				record: { id: uuid(), instruct },
			})
			inputRef.current!.value = ''
			inputRef.current?.focus()
		},
		showPrevCommand: () => {
			if (commandIndex === 0) {
				return
			}
			inputRef.current!.value = historyRecord[commandIndex - 1].instruct
			commandIndex--
		},
		showNextCommand: () => {
			if (commandIndex === historyRecord.length - 1) {
				return
			}
			inputRef.current!.value = historyRecord[commandIndex + 1].instruct
			commandIndex++
		},
	}

	return temp
}
