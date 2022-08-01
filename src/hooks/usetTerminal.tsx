import { useMemo, useReducer, useRef, useState } from 'react'
import { TSnowTerminal } from 'types/TSnowTerminal'
import { uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint } from '@utils/hintExecute'

export function useTerminal(): TSnowTerminal {
	const inputRef = useRef<HTMLInputElement>(null)
	const [{ historyRecord, currentRecord, hintText, errorText }, dispatch] =
		useReducer(recordReducer, {
			historyRecord: [],
			currentRecord: [],
			hintText: '',
			errorText: '',
		})
	let commandIndex = useMemo(() => historyRecord.length, [historyRecord.length])

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const instruct = e.target.value
		const instr = instruct.trim().split(' ')
		if (instr.length === 0) {
			return
		}
		dispatch({
			type: 'SET_HINT',
			hintText: matchHint(instr[0])!,
		})
	}

	const terminalNode = (
		<div className="mt-8">
			{currentRecord.map(rec => (
				<p key={rec.id}>
					<span>[local]$ </span>
					<span>{rec.instruct}</span>
				</p>
			))}
			{errorText && (
				<div className=" text-white flex items-center my-1">
					<div className=" bg-red-600 px-2 text-white mr-2">error</div>{' '}
					{errorText}
				</div>
			)}
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
				hintText: '',
			})
			// alert('cc')
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

		showError: (text: string) => {
			dispatch({
				type: 'SET_ERROR',
				errorText: text,
			})
		},
	}

	return temp
}
