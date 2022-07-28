import { commandList } from '@hooks/commandList'

export function matchHint(instruct: string) {
	return commandList.find(command => command.start === instruct)?.hint
	// switch (instruct) {
	// 	case 'search':
	// 		return 'search <搜索内容> [-f from] [-s 是否当前页面打开]'
	// 	case 'help':
	// 		return 'help 命令英文名称'
	// }
}