import { ReactNode } from 'react'

export type TSnowTerminal = {
	terminalNode: ReactNode
	clear: () => void
	focusInput: () => void
	enter: () => void
	showPrevCommand: () => void
	showNextCommand: () => void
	showError: (msg: string, instruct: string) => void
	changeBackGround: (url: string) => void
	addInstructRecord: (params: TAddRecordItem) => void
	reset: () => void
}

export type TAddRecordItem = {
	type: TInstructType
	instruct?: string
}

export type TInstructType = 'INSTRUCT' | 'ERROR_TEXT' | 'HELP'

export type TInputRecord = {
	id: number
	instruct: string | ReactNode
	type: TInstructType
}

export type TInstructRecordState = {
	historyRecord: TInputRecord[]
	currentRecord: TInputRecord[]
	hintText: string
	errorText: string
}

export type TRecordAction = {
	type:
		| 'ADD_RECORD'
		| 'CLEAR_CURRENT'
		| 'CLEAR_ALL'
		| 'SET_HINT'
		| 'SET_ERROR'
		| 'ADD_HELP'
} & Partial<TInstructRecordState> & {
		record?: TInputRecord
		hintText?: string
		errorText?: string
		instruct?: string
	}
