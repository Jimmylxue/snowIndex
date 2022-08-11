import { TSnowTerminal } from 'types/TSnowTerminal'

export function resetExecute(instruct: string, terminal: TSnowTerminal) {
	terminal.reset()
}

export const resetCommand = {
	start: 'reset',
	hint: '重置系统配置',
	desc: '重置系统配置 - 背景图片',
}
