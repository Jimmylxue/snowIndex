import { commandList } from '@core/hint'
import { TSnowTerminal } from 'types/TSnowTerminal'
import {
	baiduExecute,
	bgExecute,
	biliExecute,
	githubExecute,
	googleExecute,
	juejinExecute,
	searchExecute,
} from '@core/execute'
import { zhihuExecute } from '@core/execute/zhihu'

export function doCommandExecute(instruct: string, terminal: TSnowTerminal) {
	const instr = instruct.trim().split(' ')
	if (instr.length === 0) {
		terminal.focusInput()
		return
	}
	const commandItem = commandList.find(str => str.start === instr[0])
	if (!commandItem) {
		terminal.showError('找不到命令（输入 help 查看命令列表）')
		return
	}
	const instrTemps = instruct.split(instr[0]).join(' ')
	switch (instr[0]) {
		case 'search':
			searchExecute(instrTemps, terminal, commandItem)
			return
		case 'help':
			console.log('帮助文档')
			return
		case 'baidu':
			baiduExecute(instrTemps)
			return
		case 'github':
			githubExecute(instrTemps)
			return
		case 'google':
			googleExecute(instrTemps)
			return
		case 'juejin':
			juejinExecute(instrTemps)
			return
		case 'zhihu':
			zhihuExecute(instrTemps)
			return
		case 'bili':
			biliExecute(instrTemps)
			return
		case 'bg':
			bgExecute(instrTemps, terminal)
		default:
			terminal.focusInput()
			break
	}
}
