import { SET_WELCOME } from '@/stores/consts'

export function setWelcome(data: any) {
	return { type: SET_WELCOME, data }
}
