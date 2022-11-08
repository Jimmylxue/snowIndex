import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { TInputRecord, TSnowTerminal } from 'types/TSnowTerminal'
import { uuid } from '@utils/index'
import { recordReducer } from '@stores/reducer/record'
import { doCommandExecute } from '@utils/commandExecute'
import { matchHint, matchStartInstruct } from '@utils/hintExecute'
import { useDispatch, useSelector } from 'react-redux'
import store from '@stores/store'
import { useUpdate } from 'ahooks'
import RecordContainer from './RecordContainer'
import { Welcome, Time } from '@components/index'
import classNames from 'classnames'

export function useTerminal(): TSnowTerminal {
	const update = useUpdate()
	const inputRef = useRef<HTMLInputElement>(null)
	const recordContainer = useRef<HTMLInputElement>(null)
	const [containerHeight, setContainerHeight] = useState<number>(0)

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
	const jumpList = baseConfig.jumpList || []
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

		addInstructRecord: ({ type, instruct, result, helpKey }) => {
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
				case 'WEATHER':
				case 'HISTORY':
				case 'DATE':
				case 'SHORTCUT':
				default:
					const fanyiRecord: TInputRecord = {
						id: uuid(),
						instruct: instruct!,
						type: type,
						result: result!,
						helpKey,
					}
					dispatch({
						type: 'ADD_NODE',
						record: fanyiRecord,
						instruct,
						helpKey,
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
				case 'TIME_SHOW_ON':
					storeDispatch({
						type: 'set_time_show',
						data: {
							timeShow: true,
						},
					})
					return
				case 'TIME_SHOW_OFF':
					storeDispatch({
						type: 'set_time_show',
						data: {
							timeShow: false,
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

		setJumpList: (type, jumpInfo?) => {
			const getJumpValue = () => {
				switch (type) {
					case 'ADD':
						return [...jumpList, jumpInfo]
					case 'REMOVE':
						return [...jumpList.filter(jump => jump.name !== jumpInfo?.name)]
					case 'CLEAR':
						return []
					default:
						return [...jumpList]
				}
			}
			storeDispatch({
				type: 'set_jump_list',
				data: {
					jumpList: getJumpValue(),
				},
			})
		},

		getStoreValue: key => {
			if (key) {
				// @ts-ignore
				return state?.[key]
			}
			return state
		},
	} as TSnowTerminal

	useEffect(() => {
		setTimeout(() => {
			const welcomeNode = document
				.getElementById('welcomeNode')
				?.getBoundingClientRect()?.height
			const timeNode = document
				.getElementById('timeNode')
				?.getBoundingClientRect()?.height
			setContainerHeight((welcomeNode || 0) + (timeNode || 0) + 80)
		})
	}, [baseConfig?.timeShow])

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
			{baseConfig?.timeShow && (
				<div className=" text-white">
					<Time />
					{/* {JSON.stringify(jumpList)} */}
				</div>
			)}

			<div
				className={classNames('relative z-10 overflow-auto text-white', {
					'mt-8': !baseConfig?.timeShow,
				})}
				ref={recordContainer}
				style={{
					height: `calc(100vh - ${containerHeight}px)`,
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
					<p className=" helpKey">hint: {hintText}</p>
				)}
			</div>
		</>
	)

	return { ...scheduler, terminalNode }
}
