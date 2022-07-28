import { TSnowTerminal } from 'types/TSnowTerminal'

export function doCommandExecute(instruct: string, terminal: TSnowTerminal) {
	// console.log('ccc', terminal)
	console.log('inst', instruct.split(' '))
	const instr = instruct.trim().split(' ')
	if (instr.length === 0) {
		terminal.focusInput()
		return
	}

	switch (instr[0]) {
		case 'search':
			console.log('执行搜索')
			return
		case 'help':
			console.log('帮助文档')
			return
		default:
			console.log('指令错误')
			terminal.focusInput()
			break
	}
}
