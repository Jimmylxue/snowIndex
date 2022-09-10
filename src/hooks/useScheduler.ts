export function useScheduler(inputRef: React.RefObject<HTMLInputElement>) {
	const scheduler = {
		get value() {
			return inputRef.current?.value! || ''
		},

		setValue(val: string) {
			inputRef.current!.value = val
			update()
		},

		focusInput: () => {
			console.log('foucs')
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
	} as TSnowTerminal

	return scheduler
}
