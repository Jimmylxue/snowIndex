import { TBaseConfigAction } from '@/stores/consts'
import { Action } from 'redux'

// there is not every state both should be save as store
export type TBaseConfigType = {
	hintShow: boolean
	hostname: string
	timeShow: boolean
	jumpList: {
		name: string
		url: string
	}[]
}

// store中数据的默认值
const defaultState: TBaseConfigType = {
	hintShow: true,
	hostname: 'local',
	timeShow: false,
	jumpList: [],
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

		case 'set_time_show':
			return {
				...state,
				timeShow: !!data.timeShow,
			}

		case 'set_jump_list':
			return {
				...state,
				jumpList: [...data.jumpList],
			}

		default:
			return {
				...state,
			}
	}
}) as () => TBaseConfigType

export default baseConfigReducer
