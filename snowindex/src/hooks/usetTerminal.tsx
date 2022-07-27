import { useReducer, useRef } from 'react'
import {
	TSnowTerminal,
	TInstructRecordState,
	TRecordAction,
} from 'types/TSnowTerminal'
import { uuid } from '@utils/index'

function reducer(
	state: TInstructRecordState,
	action: TRecordAction
): TInstructRecordState {
	switch (action.type) {
		case 'ADD_RECORD':
			return {
				...state,
				historyRecord: [...state.historyRecord, action.record!],
				currentRecord: [...state.currentRecord, action.record!],
			}

		case 'CLEAR_CURRENT':
			return {
				...state,
				currentRecord: [],
			}

		case 'CLEAR_ALL':
			return {
				...state,
				historyRecord: [],
				currentRecord: [],
			}

		default:
			return state
	}
}

export function useTerminal(): TSnowTerminal {
	const inputRef = useRef<HTMLInputElement>(null)
	const [{ historyRecord, currentRecord }, dispatch] = useReducer(reducer, {
		historyRecord: [],
		currentRecord: [],
	})
	let commandIndex = historyRecord.length
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
				/>
			</p>
		</div>
	)

	return {
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
}
