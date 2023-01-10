import { getNowTimeInfo } from '@/utils/time'
import moment from 'moment'
import { useMemo } from 'react'
import { getToday } from '../utils'

type TProps = {
	workEndTime: string
	workStartTime: string
}

export function useTimeInfo({ workEndTime, workStartTime }: TProps) {
	const { timeNow, nowHour, nowMinutes, nowWeak } = getNowTimeInfo()
	const endWork = getToday() + ' ' + workEndTime
	const startWork = getToday() + ' ' + workStartTime

	const outWork = moment().weekday(6).format('YYYY/MM/DD') // 距离周末的时间
	const weekStart = moment(timeNow)
		.subtract(nowWeak - 1, 'days')
		.add(7, 'days')
		.format('YYYY/MM/DD') //下周一 -- 开始工作的时间

	// 工作时间进度条
	const workProgress = useMemo(() => {
		const parent = moment(endWork).valueOf() - moment(startWork).valueOf()
		const child = Date.now() - moment(startWork).valueOf()
		return +((child / parent) * 100).toFixed(2)
	}, [startWork, endWork])

	// 周末进度条
	const weekProgress = useMemo(() => {
		const parent = 1000 * 60 * 60 * 24 * 2
		const child = moment(weekStart).valueOf() - Date.now()
		return +((child / parent) * 100).toFixed(2)
	}, [startWork, endWork])

	return {
		weekStart,
		workProgress,
		weekProgress,
		outWork,
		endWork,
		nowHour,
		nowMinutes,
		nowWeak,
	}
}
