import { ReactNode } from 'react'

export type TSnowTerminal = {
	terminalNode: ReactNode
	clear: () => void
	focusInput: () => void
	enter: () => void
	showPrevCommand: () => void
	showNextCommand: () => void
}

export type TInputRecord = {
	id: number
	instruct: string
}

export type TInstructRecordState = {
	historyRecord: TInputRecord[]
	currentRecord: TInputRecord[]
}

export type TRecordAction = {
	type: 'ADD_RECORD' | 'CLEAR_CURRENT' | 'CLEAR_ALL'
} & Partial<TInstructRecordState> & {
		record?: TInputRecord
	}
