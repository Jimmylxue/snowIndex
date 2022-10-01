import { searchCommand } from '@core/execute/search'
import { baiduCommand } from '@core/execute/baidu'
import { googleCommand } from '@core/execute/google'
import { githubCommand } from '@core/execute/github'
import { juejinCommand } from '@core/execute/juejin'
import { zhihuCommand } from '@core/execute/zhihu'
import { biliCommand } from '@core/execute/bilibili'
import { bgCommand } from '@core/execute/bg'
import { helpCommand } from '@core/execute/help'
import { resetCommand } from '@core/execute/reset'
import { infoCommand } from '@core/execute/info'
import { clearCommand } from '@core/execute/clear'
import { authorShowCommand } from '@core/execute/authorShow'
import { welcomeCommand } from '@core/execute/welcome'
import { weatherCommand } from '@core/execute/weather'
import { wangYiYunCommand } from '@core/execute/wangyiyun'
import { historyCommand } from '@core/execute/history'
import { bingBgCommand } from '@core/execute/bingBg'
import { dateCommand } from '@core/execute/date'
import { gotoCommand } from '@core/execute/goto'
import { hintShowCommand } from '@core/execute/hintShow'
import { hostnameCommand } from '@core/execute/hostname'
import { fanyiCommand } from '@core/execute/fanyi'
import { shortcutCommand } from '@core/execute/shortCut'
import { timeCommand } from '@core/execute/time'
import { varbookCommand } from '@core/execute/varbook'

export const commandList = [
	searchCommand,
	baiduCommand,
	googleCommand,
	githubCommand,
	juejinCommand,
	zhihuCommand,
	biliCommand,
	bgCommand,
	helpCommand,
	resetCommand,
	infoCommand,
	clearCommand,
	authorShowCommand,
	welcomeCommand,
	weatherCommand,
	wangYiYunCommand,
	historyCommand,
	bingBgCommand,
	dateCommand,
	gotoCommand,
	hintShowCommand,
	hostnameCommand,
	fanyiCommand,
	shortcutCommand,
	timeCommand,
	varbookCommand,
] as {
	start: string
	hint: string
	desc: string
	params: {
		key: string
		desc: string
		isRequire: boolean
	}[]
	options: {
		key: string
		desc: string
		alias: string[]
		isRequire: boolean
		default: false
	}[]
}[]
