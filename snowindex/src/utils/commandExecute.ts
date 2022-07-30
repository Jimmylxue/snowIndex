import { commandList } from '@hooks/commandList'
import { searchPlatformList } from '@hooks/const'
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
					subStrBetween(instrTemp, '-f', '-s').trim() ||
					commandItem?.options?.[1].default,
			}
			if (instrTemp.includes('-f') && instrTemp.includes('-s')) {
				matchParams._ = instrTemp.split('-f')[0].trimStart()
				matchParams.self = true
			} else if (instrTemp.includes('-f')) {
				matchParams._ = instrTemp.split('-f')[0].trimStart()
				// searchText = instrTemp.split('-f')[0]
			} else if (instrTemp.includes('-s')) {
				matchParams._ = instrTemp.split('-s')[0].trimStart()
				console.log('is -s')
				matchParams.self = true
			} else {
				matchParams._ = instrTemp.trimStart()
			}

			console.log('instruct--------', instruct)
			console.log('analyze-------------------↓', matchParams)
			console.log(
				`search ${matchParams._} -f ${matchParams.fromWay} ${
					matchParams.self ? '-s' : ''
				}`
			)
			const searchTarget = searchPlatformList.find(
				platform => platform.key === matchParams.fromWay
			)?.target
			if (!searchTarget) {
				// todo terminal 显示错误
				return
			}
			console.log(matchParams._)
			window.open(
				`${searchTarget}${matchParams._}`,
				// `${searchTarget}${matchParams._}`
				// `_self`
				`${matchParams.self ? '_self' : searchTarget + matchParams}`
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
