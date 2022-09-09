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
] as {
	start: string
	hint: string
	desc: string
}[]
