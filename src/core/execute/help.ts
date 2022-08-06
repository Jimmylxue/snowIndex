import { searchPlatformList } from '@hooks/const'

export function helpExecute(instruct: string) {
	// const baiduParams = {
	// 	_: '',
	// 	self: false,
	// 	photo: false,
	// }
	// if (
	// 	instruct.trimStart().includes(' -s') &&
	// 	instruct.trimEnd().endsWith(' -p')
	// ) {
	// 	baiduParams._ = instruct.split(' -s')[0]
	// 	baiduParams.self = true
	// 	baiduParams.photo = true
	// } else if (instruct.trimStart().includes(' -s')) {
	// 	baiduParams._ = instruct.split(' -s')[0]
	// 	baiduParams.self = true
	// } else if (instruct.trimEnd().endsWith(' -p')) {
	// 	baiduParams._ = instruct.split(' -p')[0]
	// 	baiduParams.photo = true
	// } else {
	// 	baiduParams._ = instruct.trimStart()
	// }
	// console.log('instruct--------', instruct)
	// console.log('analyze-------------------↓', baiduParams)
	// const baiduTarget = searchPlatformList.find(
	// 	plat => plat.key === (baiduParams.photo ? 'baiduImage' : 'baidu')
	// )?.target
	// window.open(
	// 	`${baiduTarget}${baiduParams._}`,
	// 	`${baiduParams.self ? '_self' : baiduTarget! + baiduParams}`
	// )
}

export const helpCommand = {
	start: 'help',
	hint: 'help [英文命令名称]',
	desc: '查看帮助手册',
	options: [],
}
