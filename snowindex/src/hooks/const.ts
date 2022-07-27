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
		// action(e, terminal) {
		// 	terminal.focusInput()
		// },
		action: () => {
			console.log('粘贴一下')
		},
	},
	{
		code: 'Tab',
		// action(e, terminal) {
		// 	e.preventDefault()
		// 	terminal.focusInput()
		// },
		action: () => {
			console.log('tab~~')
		},
	},
	{
		code: 'Backspace',
		// action(e, terminal) {
		// 	terminal.focusInput()
		// },
		action: () => {
			console.log('Backspace')
		},
	},
	{
		code: 'Enter',
		// action(e, terminal) {
		// 	terminal.focusInput()
		// },
		action: (_, terminal) => {
			terminal.enter()
		},
	},
	{
		desc: '查看上一条命令',
		code: 'ArrowUp',
		keyDesc: '↑',
		// action(e, terminal) {
		// 	e.preventDefault()
		// 	terminal.showPrevCommand()
		// },
		action: (_, terminal) => {
			console.log('上一条')
			terminal.showPrevCommand()
		},
	},
	{
		desc: '查看下一条命令',
		code: 'ArrowDown',
		keyDesc: '↓',
		// action(e, terminal) {
		// 	e.preventDefault()
		// 	terminal.showNextCommand()
		// },
		action: (_, terminal) => {
			console.log('吓一条')
			terminal.showNextCommand()
		},
	},
]
