import { THintShowAction } from '@stores/consts'
import { Action } from 'redux'

export type TBaseConfigType = {
	hintShow: boolean
}

// store中数据的默认值
const defaultState: TBaseConfigType = {
	hintShow: true,
}
const baseConfigReducer = ((
	state = defaultState,
	action: Action<THintShowAction> & { data: TBaseConfigType }
) => {
	const { type, data } = action

	switch (type) {
		case 'set_hint_show':
			return {
				...state,
				hintShow: !!data.hintShow,
			}

		default:
			return {
				...state,
			}
	}
}) as () => TBaseConfigType
export default baseConfigReducer
