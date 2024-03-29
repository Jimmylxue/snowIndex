import { uuid } from '@/utils/index'
import {
	TInputRecord,
	TInstructRecordState,
	TRecordAction,
} from '@/types/TSnowTerminal'

export function recordReducer(
	state: TInstructRecordState,
	action: TRecordAction
): TInstructRecordState {
	switch (action.type) {
		case 'ADD_RECORD':
			return {
				...state,
				historyRecord: [...state.historyRecord, action.record!],
				currentRecord: [...state.currentRecord, action.record!],
				hintText: action.hintText!,
			}

		case 'CLEAR_CURRENT':
			return {
				...state,
				currentRecord: [],
				errorText: '',
				hintText: '',
			}

		case 'CLEAR_ALL':
			return {
				...state,
				historyRecord: [],
				currentRecord: [],
				hintText: '',
				errorText: '',
			}

		case 'SET_HINT':
			return {
				...state,
				hintText: action.hintText!,
			}

		case 'SET_ERROR':
			const record: TInputRecord = {
				id: uuid(),
				instruct: action.errorText!,
				type: 'ERROR_TEXT',
			}
			return {
				...state,
				currentRecord: [...state.currentRecord, action.record!, record],
				historyRecord: [...state.historyRecord, action.record!, record],
				errorText: action.errorText!,
				hintText: '',
			}

		case 'SET_SUCCESS':
			const success_record: TInputRecord = {
				id: uuid(),
				instruct: action.successText!,
				type: 'SUCCESS_TEXT',
			}
			return {
				...state,
				currentRecord: [...state.currentRecord, action.record!, success_record],
				historyRecord: [...state.historyRecord, action.record!, success_record],
				successText: action.successText!,
				hintText: '',
			}

		case 'ADD_NODE':
			const records: TInputRecord = {
				id: uuid(),
				instruct: action.instruct!,
				type: 'INSTRUCT',
				helpKey: action.helpKey,
			}
			return {
				...state,
				currentRecord: [...state.currentRecord, records, action.record!],
				historyRecord: [...state.historyRecord, records, action.record!],
				hintText: '',
			}

		default:
			return state
	}
}
