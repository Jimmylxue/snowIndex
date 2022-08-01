import { commandList } from '@hooks/commandList'
import { searchPlatformList } from '@hooks/const'
import { TSnowTerminal } from 'types/TSnowTerminal'
import { subStrBetween } from '.'
import { githubExecute } from '@core/execute'

export function doCommandExecute(instruct: string, terminal: TSnowTerminal) {
	// console.log('ccc', terminal)
	console.log('inst', instruct.split(' '))
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
			const matchParams = {
				_: '',
				self: false,
				fromWay:
					subStrBetween(instrTemps, '-f', '-s').trim() ||
					commandItem?.options?.[1].default,
			}
			if (instrTemps.includes('-f') && instrTemps.includes('-s')) {
				matchParams._ = instrTemps.split('-f')[0].trimStart()
				matchParams.self = true
			} else if (instrTemps.includes('-f')) {
				matchParams._ = instrTemps.split('-f')[0].trimStart()
			} else if (instrTemps.includes('-s')) {
				matchParams._ = instrTemps.split('-s')[0].trimStart()
				console.log('is -s')
				matchParams.self = true
			} else {
				matchParams._ = instrTemps.trimStart()
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
				terminal.showError('找不到搜索源')
				// todo terminal 显示错误
				return
			}
			console.log(matchParams._)
			window.open(
				`${searchTarget}${matchParams._}`,
				`${matchParams.self ? '_self' : searchTarget + matchParams}`
			)
			return
		case 'help':
			console.log('帮助文档')
			return
		case 'baidu':
			const baiduParams = {
				_: '',
				self: false,
				photo: false,
			}
			console.log('instrTemps', instrTemps)
			if (instrTemps.includes('-s') && instrTemps.includes('-p')) {
				baiduParams._ = instrTemps.split('-s')[0]
				baiduParams.self = true
				baiduParams.photo = true
			} else if (instrTemps.includes('-s')) {
				baiduParams._ = instrTemps.split('-s')[0]
				baiduParams.self = true
			} else if (instrTemps.includes('-p')) {
				baiduParams._ = instrTemps.split('-p')[0]
				baiduParams.photo = true
			}
			console.log('instruct--------', instruct)
			console.log('analyze-------------------↓', baiduParams)
			const baiduTarget = searchPlatformList.find(
				plat => plat.key === (baiduParams.photo ? 'baiduImage' : 'baidu')
			)?.target
			window.open(
				`${baiduTarget}${baiduParams._}`,
				`${baiduParams.self ? '_self' : baiduTarget! + baiduParams}`
			)
			return
		case 'github':
			githubExecute(instrTemps)
			return
		default:
			// console.log('指令错误')
			terminal.focusInput()
			break
	}
}
