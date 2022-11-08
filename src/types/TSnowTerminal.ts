import { TSystemShow } from '@stores/consts'
import { ReactNode } from 'react'

export type TSnowTerminal = {
	terminalNode?: ReactNode
	clear: () => void
	focusInput: () => void
	clearInput: () => void
	enter: () => void
	showPrevCommand: () => void
	showNextCommand: () => void
	showError: (msg: string, instruct: string) => void
	showSuccess: (msg: string, instruct: string) => void
	changeBackGround: (url: string) => void
	addInstructRecord: (params: TAddRecordItem) => void
	reset: () => void
	setSystemShow: (flag: TSystemShow) => void
	setWelcomeText: (text: string) => void
	value: string
	setValue: (instruct: string) => void
	matchInstruct: () => void
	changeHostname: (hostname: string) => void
	setJumpList: (
		type: 'ADD' | 'REMOVE' | 'CLEAR',
		jumpInfo?: { url: string; name: string }
	) => void
	getStoreValue: (key?: string) => any
}

export type TAddRecordItem = {
	type: TInstructType
	instruct?: string
	result?: any
	helpKey?: string
}

export type TInstructType =
	| 'INSTRUCT'
	| 'ERROR_TEXT'
	| 'HELP'
	| 'INFO'
	| 'SUCCESS_TEXT'
	| 'WEATHER'
	| 'HISTORY'
	| 'DATE'
	| 'INSTRUCT_ITEM_HELP' // 所有的基础指令的help
	| 'SHORTCUT'
	| 'TIME'
	| 'VAR_BOOK'

export type TInputRecord = {
	id: number
	instruct: string
	type: TInstructType
	result?: any // 接口的返回值 如天气接口返回值
	helpKey?: string
	// result
}

export type TInstructRecordState = {
	historyRecord: TInputRecord[]
	currentRecord: TInputRecord[]
	hintText: string
	errorText: string
	successText: string
}

export type TRecordAction = {
	type:
		| 'ADD_RECORD'
		| 'CLEAR_CURRENT'
		| 'CLEAR_ALL'
		| 'SET_HINT'
		| 'SET_ERROR'
		| 'SET_SUCCESS'
		| 'ADD_NODE'
} & Partial<TInstructRecordState> & {
		record?: TInputRecord
		hintText?: string
		errorText?: string
		instruct?: string
		result?: any
		helpKey?: string
	}
