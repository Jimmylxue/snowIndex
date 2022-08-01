import { TInstructRecordState, TRecordAction } from 'types/TSnowTerminal'

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
			return {
				...state,
				errorText: action.errorText!,
			}

		default:
			return state
	}
}
