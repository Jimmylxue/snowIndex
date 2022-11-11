import { TBackgroundAction } from '@/stores/consts'
import { Action } from 'redux'

export type TBackgroundType = {
	background: string
}

// store中数据的默认值
const defaultState: TBackgroundType = {
	background: '',
}
const backgroundReducer = ((
	state = defaultState,
	action: Action<TBackgroundAction> & { data: TBackgroundType }
) => {
	const { type, data } = action

	switch (type) {
		case 'set_background':
			return {
				...state,
				background: data.background || '',
			}

		default:
			return {
				...state,
			}
	}
}) as () => TBackgroundType
export default backgroundReducer
