import { searchPlatformList } from '@hooks/const'

export function juejinExecute(instruct: string) {
	const juejinParams = {
		_: '',
		self: false,
		user: false,
	}
	if (instruct.includes('-u') && instruct.includes('-s')) {
		juejinParams._ = instruct.split('-u')[0].trimStart()
		juejinParams.self = true
		juejinParams.user = true
	} else if (instruct.includes('-u')) {
		juejinParams._ = instruct.split('-u')[0].trimStart()
		juejinParams.user = true
	} else if (instruct.includes('-s')) {
		juejinParams._ = instruct.split('-s')[0].trimStart()
		juejinParams.self = true
	} else {
		juejinParams._ = instruct.trimStart()
	}

	console.log('instruct--------', instruct)
	console.log('analyze-------------------↓', juejinParams)
	console.log(
		`search ${juejinParams._} -f ${juejinParams.user} ${
			juejinParams.self ? '-s' : ''
		}`
	)

	const searchTarget = searchPlatformList.find(
		platform => platform.key === (juejinParams.user ? 'juejinUser' : 'juejin')
	)?.target

	window.open(
		`${searchTarget}${juejinParams._.trim()}`,
		`${juejinParams.self ? '_self' : searchTarget! + juejinParams}`
	)
}

export const juejinCommand = {
	start: 'juejin',
	hint: 'juejin <搜索内容> [-u 是否搜索作者] [-s 是否当前页面打开]',
	desc: '稀土掘金搜索引擎',
	options: [
		{
			key: 'self',
			desc: '是否在当前页面打开',
			alias: ['-s'],
			type: 'boolean',
			default: false,
		},
		{
			key: 'user',
			desc: '是否搜索作者',
			alias: ['-u'],
			type: 'boolean',
			default: false,
		},
	],
}