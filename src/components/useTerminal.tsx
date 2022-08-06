import { useEffect, useMemo, useReducer, useRef } from 'react'
import {
	TAddRecordItem,
	TInputRecord,
	TSnowTerminal,
} from 'types/TSnowTerminal'
import { uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint } from '@utils/hintExecute'
import useLocalStorage from '../hooks/useLocalStorage'
import { useHelp } from '@components/useHelp'

export function useTerminal(): TSnowTerminal {
	const { helpNode } = useHelp()
	const inputRef = useRef<HTMLInputElement>(null)
	const recordContainer = useRef<HTMLInputElement>(null)
	const [{ historyRecord, currentRecord, hintText }, dispatch] = useReducer(
		recordReducer,
		{
			historyRecord: [],
			currentRecord: [],
			hintText: '',
			errorText: '',
		}
	)
	const [background, setBackground] = useLocalStorage('snowIndex_bg', '')
	const commandRecord = useMemo(() => {
		return historyRecord.filter(cur => cur.type === 'INSTRUCT')
	}, [historyRecord.length])
	let commandIndex = useMemo(() => commandRecord.length, [commandRecord.length])
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

	useEffect(() => {
		recordContainer.current!.scrollTop = recordContainer.current!.scrollHeight
	}, [currentRecord.length])

	const terminalNode = (
		<>
			<div className=" text-white z-10 relative">
				<p>Welcome to SnowIndex, This is awesome!</p>
				<p>
					Author{' '}
					<a
						className=" text-blue-500 ml-1"
						href="https://github.com/Jimmylxue"
					>
						Jimmyxuexue
					</a>
					, reference from coder_yupi, github:
					<a
						href="https://github.com/Jimmylxue/snowIndex"
						className=" text-blue-500 ml-1"
					>
						SnowIndex
					</a>
				</p>
			</div>
			{background && (
				<img
					src={background}
					alt="背景图片"
					className=" absolute left-0 top-0 z-0 w-full h-full opacity-50"
				/>
			)}

			<div
				className="mt-8 relative z-10 overflow-auto text-white"
				ref={recordContainer}
				style={{
					height: 'calc(100vh - 130px)',
				}}
			>
				{currentRecord.map(rec => (
					<div key={rec.id}>
						{rec.type === 'INSTRUCT' ? (
							<p key={rec.id}>
								<span>[local]$ </span>
								<span>{rec.instruct}</span>
							</p>
						) : rec.type === 'ERROR_TEXT' ? (
							<div className=" text-white flex items-center my-1">
								<div className=" bg-red-600 px-2 text-white mr-2">error</div>{' '}
								{rec.instruct}
							</div>
						) : rec.type === 'HELP' ? (
							helpNode
						) : null}
					</div>
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
		</>
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
			inputRef.current!.value = ''

			temp.focusInput()
		},
		showPrevCommand: () => {
			if (commandIndex === 0) {
				return
			}
			inputRef.current!.value = commandRecord[commandIndex - 1]
				.instruct as string
			commandIndex--
		},
		showNextCommand: () => {
			if (commandIndex === commandRecord.length - 1) {
				return
			}
			inputRef.current!.value = commandRecord[commandIndex + 1]
				.instruct as string
			commandIndex++
		},

		showError: (text: string, instruct: string) => {
			dispatch({
				type: 'SET_ERROR',
				errorText: text,
				record: { id: uuid(), instruct, type: 'INSTRUCT' }, // 原指令
			})
		},

		changeBackGround: (url: string) => {
			setBackground(url)
		},

		addInstructRecord: ({ type, instruct }: TAddRecordItem) => {
			switch (type) {
				case 'INSTRUCT':
					const record: TInputRecord = {
						id: uuid(),
						instruct: instruct,
						type: 'INSTRUCT',
					}
					dispatch({
						type: 'ADD_RECORD',
						record: record,
					})
					return
				case 'HELP':
					const records: TInputRecord = {
						id: uuid(),
						instruct: helpNode,
						type: 'HELP',
					}
					dispatch({
						type: 'ADD_HELP',
						record: records,
						instruct,
					})
					return
			}
		},
	}

	return temp
}
