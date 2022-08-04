import { ReactNode } from 'react'

export type TSnowTerminal = {
	terminalNode: ReactNode
	clear: () => void
	focusInput: () => void
	enter: () => void
	showPrevCommand: () => void
	showNextCommand: () => void
	showError: (msg: string) => void
	changeBackGround: (url: string) => void
}

export type TInputRecord = {
	id: number
	instruct: string
}

export type TInstructRecordState = {
	historyRecord: TInputRecord[]
	currentRecord: TInputRecord[]
	hintText: string
	errorText: string
}

export type TRecordAction = {
	type: 'ADD_RECORD' | 'CLEAR_CURRENT' | 'CLEAR_ALL' | 'SET_HINT' | 'SET_ERROR'
} & Partial<TInstructRecordState> & {
		record?: TInputRecord
		hintText?: string
		errorText?: string
	}
