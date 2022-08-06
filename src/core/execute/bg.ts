import { TSnowTerminal } from 'types/TSnowTerminal'

export function bgExecute(instruct: string, terminal: TSnowTerminal) {
	if (instruct.trim()) {
		// 有地址
		terminal.changeBackGround(instruct.trim())
		return
	}
	terminal.changeBackGround(
		'https://tva2.sinaimg.cn/large/9bd9b167gy1g2qkr9uavvj21hc0u01kx.jpg'
	)
}

export const bgCommand = {
	start: 'bg',
	hint: 'background [图片地址（不填则随机）]',
	desc: '背景设置',
}
