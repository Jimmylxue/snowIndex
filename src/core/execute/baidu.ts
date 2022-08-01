import { searchPlatformList } from '@hooks/const'

export function baiduExecute(instruct: string) {
	const baiduParams = {
		_: '',
		self: false,
		photo: false,
	}
	if (instruct.includes('-s') && instruct.includes('-p')) {
		baiduParams._ = instruct.split('-s')[0]
		baiduParams.self = true
		baiduParams.photo = true
	} else if (instruct.includes('-s')) {
		baiduParams._ = instruct.split('-s')[0]
		baiduParams.self = true
	} else if (instruct.includes('-p')) {
		baiduParams._ = instruct.split('-p')[0]
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
}

export const baiduCommand = {
	start: 'baidu',
	hint: 'baidu <搜索内容> [-s 是否当前页面打开] [-p 是否搜索图片]',
	desc: '百度搜索引擎搜索',
	options: [
		{
			key: 'self',
			desc: '是否在当前页面打开',
			alias: ['-s'],
			type: 'boolean',
			default: false,
		},
		{
			key: 'photo',
			desc: '是否搜索图片',
			alias: ['-p'],
			type: 'boolean',
			default: false,
		},
	],
}