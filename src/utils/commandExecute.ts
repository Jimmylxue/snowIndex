import { commandList } from '@core/hint'
import { TSnowTerminal } from 'types/TSnowTerminal'
import {
	baiduExecute,
	bgExecute,
	biliExecute,
	githubExecute,
	googleExecute,
	juejinExecute,
	resetExecute,
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
		terminal.showError('找不到命令（输入 help 查看命令列表）', instruct)
		return
	}
	const instrTemps = instruct.split(instr[0]).join(' ')
	switch (instr[0]) {
		case 'search':
			searchExecute(instrTemps, terminal, commandItem)
			return
		case 'help':
			// console.log('帮助文档')
			// terminal.addRecord()
			terminal.addInstructRecord({ type: 'HELP', instruct })
			return
		case 'baidu':
			baiduExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'github':
			githubExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'google':
			googleExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'juejin':
			juejinExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'zhihu':
			zhihuExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'bili':
			biliExecute(instrTemps)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })

			return
		case 'bg':
			bgExecute(instrTemps, terminal)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })
			return
		case 'reset':
			resetExecute(instrTemps, terminal)
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })
			return
		default:
			terminal.addInstructRecord({ type: 'INSTRUCT', instruct })
			terminal.focusInput()
			break
	}
}
