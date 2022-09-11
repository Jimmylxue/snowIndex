import { useEffect, useMemo, useReducer, useRef } from 'react'
import { TInputRecord, TSnowTerminal } from 'types/TSnowTerminal'
import { uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint, matchStartInstruct } from '@utils/hintExecute'
import { usePosition } from '@hooks/useLocation'
import { useDispatch, useSelector } from 'react-redux'
import store from '@stores/store'
import { useUpdate } from 'ahooks'
import RecordContainer from './RecordContainer'
import { Welcome } from '@components/index'

export function useTerminal(): TSnowTerminal {
	usePosition()
	const update = useUpdate()
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
	const { background, baseConfig } = useSelector<typeof state, typeof state>(
		state => state
	)
	const storeDispatch = useDispatch()

	const commandRecord = useMemo(() => {
		return historyRecord.filter(cur => cur.type === 'INSTRUCT')
	}, [historyRecord.length])

	let commandIndex = useMemo(() => commandRecord.length, [commandRecord.length])

	const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const instruct = e.target.value
		setHint(instruct)
	}

	const setHint = (instruct: string) => {
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
		get value() {
			return inputRef.current?.value! || ''
		},

		setValue(val: string) {
			inputRef.current!.value = val
			update()
		},

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

		showError: (text, instruct) => {
			dispatch({
				type: 'SET_ERROR',
				errorText: text,
				record: { id: uuid(), instruct, type: 'INSTRUCT' }, // 原指令
			})
		},

		showSuccess: (text, instruct) => {
			dispatch({
				type: 'SET_SUCCESS',
				successText: text,
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

		addInstructRecord: ({ type, instruct, result }) => {
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
					})
					return
				case 'HISTORY':
					const historyRecord: TInputRecord = {
						id: uuid(),
						instruct: instruct!,
						type: type,
						result: result!,
					}
					dispatch({
						type: 'ADD_NODE',
						record: historyRecord,
						instruct,
					})
					return
				case 'DATE':
					const dateRecord: TInputRecord = {
						id: uuid(),
						instruct: instruct!,
						type: type,
						result: result!,
					}
					dispatch({
						type: 'ADD_NODE',
						record: dateRecord,
						instruct,
					})
					return
			}
		},
		reset: () => {
			storeDispatch({
				type: 'RESET',
			})
		},

		setSystemShow: flag => {
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
				case 'HINT_SHOW_ON':
					storeDispatch({
						type: 'set_hint_show',
						data: {
							hintShow: true,
						},
					})
					return
				case 'HINT_SHOW_OFF':
					storeDispatch({
						type: 'set_hint_show',
						data: {
							hintShow: false,
						},
					})
					return
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

		matchInstruct: () => {
			const instruct = scheduler.value
			if (!instruct.trim()) {
				return
			}
			const matchInstruct = matchStartInstruct(instruct)
			if (matchInstruct?.start) {
				scheduler.setValue(`${matchInstruct?.start} `)
				scheduler.focusInput()
				// 设置hint
				setHint(matchInstruct.start!)
			}
		},

		changeHostname: hostname => {
			storeDispatch({
				type: 'set_hostname',
				data: {
					hostname,
				},
			})
		},
	} as TSnowTerminal

	const terminalNode = (
		<>
			<Welcome />
			{background?.background && (
				<img
					src={background?.background}
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
				<RecordContainer
					currentRecord={currentRecord}
					historyRecord={historyRecord}
					hostname={baseConfig.hostname || 'local'}
				/>
				<p className="flex items-center">
					<span>[{baseConfig.hostname || 'local'}]$ </span>
					<input
						ref={inputRef}
						className=" bg-none outline-none bg-transparent flex-grow pl-2"
						type="text"
						autoFocus
						onChange={changeInput}
					/>
				</p>
				{baseConfig?.hintShow && hintText && (
					<p className=" text-gray-400">hint: {hintText}</p>
				)}
			</div>
		</>
	)

	return { ...scheduler, terminalNode }
}
