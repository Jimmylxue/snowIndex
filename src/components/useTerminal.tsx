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
import { useHelp } from '@components/useHelp'
import { useNode } from './useNode'
import Welcome from './Welcome'
import Weather from './Weather'
import { usePosition } from '@hooks/useLocation'
import { useDispatch, useSelector } from 'react-redux'
import store from '@stores/store'

export function useTerminal(): TSnowTerminal {
	const { helpNode } = useHelp()
	const { infoNode } = useNode()
	usePosition()
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
	const state = store.getState()
	const { background } = useSelector<typeof state, typeof state.background>(
		state => state.background
	)
	const storeDispatch = useDispatch()
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
		clearInput: () => {
			inputRef.current!.value = ''
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
			const textValue = commandRecord[commandIndex - 1].instruct as string
			commandIndex--
			if (!textValue) {
				scheduler.showPrevCommand()
			} else {
				element.value = textValue
				const length = textValue.length
				setTimeout(() => {
					element.selectionStart = element.selectionEnd = length
				})
			}
		},
		showNextCommand: () => {
			if (commandIndex === commandRecord.length - 1) {
				return
			}
			const element = inputRef.current!
			const textValue = commandRecord[commandIndex + 1].instruct as string
			commandIndex++
			if (!textValue) {
				scheduler.showNextCommand()
			} else {
				element.value = textValue
			}
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
			storeDispatch({
				type: 'set_background',
				data: {
					background: url,
				},
			})
		},

		addInstructRecord: ({ type, instruct, result }: TAddRecordItem) => {
			switch (type) {
				case 'INSTRUCT':
					const record: TInputRecord = {
						id: uuid(),
						instruct: instruct!,
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
						instruct: 'aaa',
						type: type,
					}
					dispatch({
						type: 'ADD_NODE',
						record: records,
						instruct,
					})
					return
				case 'WEATHER':
					const weatherRecord: TInputRecord = {
						id: uuid(),
						instruct: instruct!,
						type: type,
						result: result!,
					}
					dispatch({
						type: 'ADD_NODE',
						record: weatherRecord,
						instruct,
						// result: result!,
					})
			}
		},
		reset: () => {
			storeDispatch({
				type: 'clear',
			})
		},

		setSystemShow: (flag: 'AUTHOR_SHOW_ON' | 'AUTHOR_SHOW_OFF') => {
			switch (flag) {
				case 'AUTHOR_SHOW_ON':
					storeDispatch({
						type: 'set_auth_show',
						data: {
							authorShow: true,
						},
					})
					break
				case 'AUTHOR_SHOW_OFF':
					storeDispatch({
						type: 'set_auth_show',
						data: {
							authorShow: false,
						},
					})
					break
				default:
					break
			}
		},

		setWelcomeText: (welcomeText: string) => {
			storeDispatch({
				type: 'set_welcome',
				data: {
					welcomeText,
				},
			})
		},
	}

	const terminalNode = (
		<>
			<Welcome />
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
							</div>
						) : rec.type === 'HELP' ? (
							helpNode
						) : rec.type === 'INFO' ? (
							infoNode
						) : rec.type === 'WEATHER' ? (
							<Weather weather={rec.result} />
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
