import { useEffect, useMemo, useReducer, useRef } from 'react'
import {
	TAddRecordItem,
	TInputRecord,
	TSnowTerminal,
} from 'types/TSnowTerminal'
import { getNodeByType, uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint } from '@utils/hintExecute'
import { useHelp } from '@components/useHelp'
import { useNode } from './useNode'
import Welcome from './Welcome'
import { useSystemState } from 'types/TSystem'

export function useTerminal(): TSnowTerminal {
	const { helpNode } = useHelp()
	const { infoNode } = useNode()
	const inputRef = useRef<HTMLInputElement>(null)
	const recordContainer = useRef<HTMLInputElement>(null)
	const [{ historyRecord, currentRecord, hintText }, dispatch] = useReducer(
		recordReducer,
		{
			historyRecord: [],
			currentRecord: [],
			hintText: '',
			errorText: '',
			successText: '',
		}
	)
	const { background, setBackground, reset, setWelcome, welcome } =
		useSystemState()
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

	const scheduler = {
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
			doCommandExecute(instruct, scheduler)
			inputRef.current!.value = ''

			scheduler.focusInput()
		},
		showPrevCommand: () => {
			if (commandIndex === 0) {
				return
			}
			const element = inputRef.current!
			element.value = commandRecord[commandIndex - 1].instruct as string
			const length = (commandRecord[commandIndex - 1].instruct as string).length
			setTimeout(() => {
				element.selectionStart = element.selectionEnd = length
			})
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

		showSuccess: (text: string, instruct: string) => {
			dispatch({
				type: 'SET_SUCCESS',
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
				case 'INFO':
				case 'HELP':
					const records: TInputRecord = {
						id: uuid(),
						// instruct: helpNode,
						instruct: getNodeByType(type),
						type: type,
					}
					dispatch({
						type: 'ADD_NODE',
						record: records,
						instruct,
					})
					return
			}
		},
		reset: () => {
			reset()
		},

		setSystemShow: (flag: 'AUTHOR_SHOW_ON' | 'AUTHOR_SHOW_OFF') => {
			switch (flag) {
				case 'AUTHOR_SHOW_ON':
					setWelcome({
						authorShow: true,
						welcomeText: 'Welcome to SnowIndex, This is awesome!',
					})
					break
				case 'AUTHOR_SHOW_OFF':
					console.log('sss')
					setWelcome({
						authorShow: false,
						welcomeText: 'Welcome to SnowIndex, This is awesome!',
					})
					break
				default:
					break
			}
		},
	}

	const terminalNode = (
		<>
			<Welcome scheduler={scheduler} welcome={welcome} />
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
						) : rec.type === 'SUCCESS_TEXT' ? (
							<div className=" text-white flex items-center my-1">
								<div className=" bg-green-600 px-2 text-white mr-2">
									success
								</div>{' '}
								{rec.instruct}
							</div>
						) : rec.type === 'HELP' ? (
							helpNode
						) : rec.type === 'INFO' ? (
							infoNode
						) : null}
					</div>
				))}
				<p className="flex items-center">
					<span>[local]$ </span>
					<input
						ref={inputRef}
						className=" bg-none outline-none bg-transparent flex-grow pl-2"
						type="text"
						autoFocus
						onChange={changeInput}
					/>
				</p>
				{hintText && <p className=" text-gray-400">hint: {hintText}</p>}
			</div>
		</>
	)

	return { ...scheduler, terminalNode }
}
