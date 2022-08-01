import { searchCommand } from '@core/execute/search'
import { baiduCommand } from '@core/execute/baidu'
import { googleCommand } from '@core/execute/google'
import { githubCommand } from '@core/execute/github'
import { juejinCommand } from '@core/execute/juejin'
import { zhihuCommand } from '@core/execute/zhihu'
import { biliCommand } from '@core/execute/bilibili'

export const commandList = [
	searchCommand,
	baiduCommand,
	googleCommand,
	githubCommand,
	juejinCommand,
	zhihuCommand,
	biliCommand,
]