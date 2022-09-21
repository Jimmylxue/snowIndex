import { get } from '@api/index'
import { TBgType } from 'types/TBackground'
import { TSnowTerminal } from 'types/TSnowTerminal'

export async function dateExecute(instruct: string, terminal: TSnowTerminal) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeBackGround(instruct.trim())
		return
	}
	const res = await get<TBgType>('background/base')
	terminal.changeBackGround(res.result?.imgurl!)
}

export const dateCommand = {
	start: 'date',
	hint: '查看当前日期',
	desc: '查看当前日期',
	params: [],
	options: [],
}
