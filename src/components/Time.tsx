import { memo, useMemo } from 'react'
import { Statistic } from 'antd'
import moment from 'moment'
import { getToday } from '@/utils/index'

const { Countdown } = Statistic

export default memo(() => {
	const dayStr = getToday() + ' 18:00:00'
	const timeNow = new Date()
	const nowHour = timeNow.getHours()
	const nowMinutes = timeNow.getMinutes()
	const nowWeak = +moment(timeNow).format('E')
	const xiaban = +moment(dayStr)
	const outWork = moment().weekday(6).format('YYYY/MM/DD') //周六
	const weekStart = moment(timeNow)
		.subtract(nowWeak - 1, 'days')
		.add(7, 'days')
		.format('YYYY/MM/DD') //下周一
	const showOffWork = useMemo(() => {
		if (nowWeak <= 5 && nowHour < 18) {
			return (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white -mb-2">距离下班：</div>}
					value={xiaban}
					format="HH:mm:ss:SSS"
				/>
			)
		} else {
			return <p className="mb-1">下班时间，该学习啦~</p>
		}
	}, [nowWeak, nowHour, nowMinutes])
	return (
		<div className="my-1" id="timeNode">
			{showOffWork}

			{nowWeak <= 5 ? (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white -mb-2">距离周末：</div>}
					value={outWork}
					format="D 天 H 时 m 分 s 秒"
				/>
			) : (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white">周末体验卡剩余时间：</div>}
					value={weekStart}
					format="D 天 H 时 m 分 s 秒"
				/>
			)}
		</div>
	)
})
