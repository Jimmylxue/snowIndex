import { memo } from 'react'
import { Statistic } from 'antd'
import moment from 'moment'
import { getToday } from '@utils/index'

const { Countdown } = Statistic

export default memo(() => {
	const dayStr = getToday() + ' 23:59:59'
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
	return (
		<div className="my-1" id="timeNode">
			{nowWeak <= 5 && nowHour < 6 && nowMinutes < 0 ? (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white">距离下班：</div>}
					value={xiaban}
					format="HH:mm:ss:SSS"
				/>
			) : (
				<p className="mb-1">下班时间，该学习啦~</p>
			)}

			{nowWeak <= 5 ? (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white">距离周末：</div>}
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
