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
			// console.log('清空屏幕')
			terminal.clear()
		},
	},
	{
		desc: '折叠',
		code: 'KeyO',
		keyDesc: 'Ctrl + O',
		ctrlKey: true,
		// action(e, terminal) {
		// 	e.preventDefault()
		// 	terminal.toggleAllCollapse()
		// },
		action: () => {
			console.log('折叠啊')
		},
	},
	{
		desc: '粘贴',
		code: 'KeyV',
		keyDesc: 'Ctrl + V',
		metaKey: true,
		action: () => {
			console.log('粘贴一下')
		},
	},
	{
		code: 'Tab',
		action: () => {
			console.log('tab~~')
		},
	},
	{
		code: 'Backspace',
		action: () => {
			console.log('Backspace')
		},
	},
	{
		code: 'Enter',
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
		key: 'github',
		target: 'https://github.com/search?q=',
	},
	{
		key: 'github',
		target: 'https://github.com/search?q=',
	},
	{
		key: 'zhihu',
		target: 'https://www.zhihu.com/search?q=',
	},
	{
		key: 'juejin',
		target: 'https://juejin.cn/search?query=',
	},
	{
		key: 'bili',
		target: 'https://search.bilibili.com/all?keyword=',
	},
]
