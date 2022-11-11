import { SET_HINT_SHOW } from '@/stores/consts'

export function setHintShow(data: any) {
	return { type: SET_HINT_SHOW, data }
}
