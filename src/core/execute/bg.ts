import { get } from '@api/index'
// import { useChangeBackground } from '@api/background'
import { TSnowTerminal } from 'types/TSnowTerminal'

type TBgType = {
	code: string
	height: string
	imgurl: string
	width: string
}

export async function bgExecute(instruct: string, terminal: TSnowTerminal) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeBackGround(instruct.trim())
		return
	}
	const res = await get<TBgType>('background/base')
	terminal.changeBackGround(res.result?.imgurl!)
}

export const bgCommand = {
	start: 'bg',
	hint: 'background [图片地址（不填则随机）]',
	desc: '背景设置',
}
