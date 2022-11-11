import { TWelcomeAction } from '@/stores/consts'
import { Action } from 'redux'

export type TWelcomeType = {
	authorShow: boolean
	welcomeText: string
}

const defaultState: TWelcomeType = {
	authorShow: true,
	welcomeText: 'Welcome to SnowIndex, This is awesome!',
}
const welcomeReducer = ((
	state = defaultState,
	action: Action<TWelcomeAction> & { data: TWelcomeType }
) => {
	const { type, data } = action

	switch (type) {
		case 'set_auth_show':
			return {
				...state,
				authorShow: data.authorShow,
			}

		case 'set_welcome':
			return {
				...state,
				welcomeText: data.welcomeText,
			}

		default:
			return { ...state }
	}
}) as () => TWelcomeType

export default welcomeReducer
