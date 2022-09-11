import { get } from '@api/index'
import { TBgType } from 'types/TBackground'
import { TSnowTerminal } from 'types/TSnowTerminal'

export const hostnameCommand = {
	start: 'hostname',
	hint: 'hostname [主机名]',
	desc: '设置主机名',
}

export async function hostnameExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeHostname(instruct.trim())
		terminal.showSuccess('设置成功', fullInstruct)
		return
	}
	terminal.showError(`请输入正确指令 ：${hostnameCommand.hint}`, fullInstruct)
}
