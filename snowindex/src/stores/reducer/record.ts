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
			}

		case 'CLEAR_CURRENT':
			return {
				...state,
				currentRecord: [],
			}

		case 'CLEAR_ALL':
			return {
				...state,
				historyRecord: [],
				currentRecord: [],
			}

		default:
			return state
	}
}
