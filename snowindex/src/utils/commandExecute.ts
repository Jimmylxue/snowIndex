import { commandList } from '@hooks/commandList'
import { TSnowTerminal } from 'types/TSnowTerminal'
import { subStrBetween } from '.'

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
			const commandItem = commandList.find(str => str.start === instr[0])
			const instrTemp = instruct.split('search').join(' ')
			const matchParams = {
				_: '',
				self: false,
				fromWay:
					subStrBetween(instrTemp, '-f', '-s') ||
					commandItem?.options?.[1].default,
			}
			// let searchText: string = ''
			// let isSelf = false
			// let fromWay =
			// 	subStrBetween(instrTemp, '-f', '-s') ||
			// 	commandItem?.options?.[1].default
			if (instrTemp.includes('-f')) {
				matchParams._ = instrTemp.split('-f')[0]
				// searchText = instrTemp.split('-f')[0]
			} else if (instrTemp.includes('-s')) {
				matchParams._ = instrTemp.split('-s')[0]
				matchParams.self = true
			}

			console.log('instruct--------', instruct)
			console.log('analyze-------------------↓', matchParams)
			console.log(
				`search ${matchParams._} -f ${matchParams.fromWay} ${
					matchParams.self ? '-s' : ''
				}`
			)
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
