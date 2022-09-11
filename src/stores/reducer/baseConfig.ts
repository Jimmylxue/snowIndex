import { TBaseConfigAction } from '@stores/consts'
import { Action } from 'redux'

export type TBaseConfigType = {
	hintShow: boolean
	hostname: string
}

// store中数据的默认值
const defaultState: TBaseConfigType = {
	hintShow: true,
	hostname: 'local',
}
const baseConfigReducer = ((
	state = defaultState,
	action: Action<TBaseConfigAction> & { data: TBaseConfigType }
) => {
	const { type, data } = action

	switch (type) {
		case 'set_hint_show':
			return {
				...state,
				hintShow: !!data.hintShow,
			}

		case 'set_hostname':
			return {
				...state,
				hostname: data.hostname,
			}

		default:
			return {
				...state,
			}
	}
}) as () => TBaseConfigType

export default baseConfigReducer
