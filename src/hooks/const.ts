import { TSnowTerminal } from '../types/TSnowTerminal'

interface ShortcutType {
	code: string // 按键码
	desc?: string // 功能描述
	keyDesc?: string // 按键描述
	ctrlKey?: boolean
	metaKey?: boolean
	shiftKey?: boolean
	// action: (e: Event, terminal: TerminalType) => void
	action: (e: Event, terminal: TSnowTerminal) => void
}
/**
 * 快捷键列表
 */
export const shortcutList: ShortcutType[] = [
	{
		desc: '清屏',
		code: 'KeyL',
		keyDesc: 'Ctrl + L',
		ctrlKey: true,
		// action(e, terminal) {
		// 	e.preventDefault()
		// 	terminal.clear()
		// },
		// @ts-ignore
		action: (e, terminal) => {
			terminal.clear()
		},
	},
	// {
	// 	desc: '折叠',
	// 	code: 'KeyO',
	// 	keyDesc: 'Ctrl + O',
	// 	ctrlKey: true,
	// 	action: () => {
	// 		console.log('折叠啊')
	// 	},
	// },
	// {
	// 	desc: '粘贴',
	// 	code: 'KeyV',
	// 	keyDesc: 'Ctrl + V',
	// 	metaKey: true,
	// 	action: () => {
	// 		console.log('粘贴一下')
	// 	},
	// },
	{
		desc: '清空当前输入重新输入',
		code: 'KeyC',
		keyDesc: 'Ctrl + C',
		ctrlKey: true,
		action: (_, terminal) => {
			terminal.clearInput()
			terminal.addInstructRecord({
				type: 'INSTRUCT',
				instruct: '',
			})
		},
	},
	{
		desc: '自动匹配指令',
		code: 'Tab',
		keyDesc: 'Tab',
		action: (e, terminal) => {
			e.preventDefault()
			terminal.matchInstruct()
		},
	},
	{
		code: 'Backspace',
		action: () => {
			console.log('Backspace')
		},
	},
	{
		desc: '指令指令',
		code: 'Enter',
		keyDesc: 'Enter',
		action: (_, terminal) => {
			terminal.enter()
		},
	},
	{
		desc: '查看上一条命令',
		code: 'ArrowUp',
		keyDesc: '↑',
		action: (_, terminal) => {
			terminal.showPrevCommand()
		},
	},
	{
		desc: '查看下一条命令',
		code: 'ArrowDown',
		keyDesc: '↓',
		action: (_, terminal) => {
			terminal.showNextCommand()
		},
	},
]

export const searchPlatformList = [
	{
		key: 'baidu',
		target: 'https://www.baidu.com/s?wd=',
	},
	{
		key: 'baiduImage',
		target: 'https://image.baidu.com/search/index?tn=baiduimage&word=',
	},
	{
		key: 'google',
		target: 'https://www.google.com/search?q=',
	},
	{
		key: 'googleImage',
		target: 'https://www.google.co.jp/search?source=lnms&tbm=isch&q=',
	},
	{
		key: 'github',
		target: 'https://github.com/search?q=',
	},
	{
		key: 'githubUser',
		target: 'https://github.com/',
	},
	{
		key: 'zhihu',
		target: 'https://www.zhihu.com/search?q=',
	},
	{
		key: 'zhihuUser',
		target: 'https://www.zhihu.com/search?type=people&q=',
	},
	{
		key: 'juejin',
		target: 'https://juejin.cn/search?query=',
	},
	{
		key: 'juejinUser',
		target: 'https://juejin.cn/search?type=1&query=',
	},
	{
		key: 'bili',
		target: 'https://search.bilibili.com/all?keyword=',
	},
	{
		key: 'biliUser',
		target: 'https://search.bilibili.com/upuser?keyword=',
	},
	{
		key: 'wangyiyun',
		target: 'https://music.163.com/#/search/m/?type=1&s=',
	},
	{
		key: 'wangyiyunUser',
		target: 'https://music.163.com/#/search/m/?type=100&s=',
	},
	{
		key: 'npm',
		target: 'https://www.npmjs.com/search?q=',
	},
]
