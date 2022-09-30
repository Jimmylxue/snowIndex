import { memo } from 'react'
import { Statistic } from 'antd'
import moment from 'moment'

const { Countdown } = Statistic

export default memo(() => {
	const timeNow = new Date()
	const nowWeak = +moment(timeNow).format('E')
	const xiaban = +moment(timeNow)
	const outWork = moment().weekday(6).format('YYYY/MM/DD') //周六
	const weekStart = moment(timeNow)
		.subtract(nowWeak - 1, 'days')
		.add(7, 'days')
		.format('YYYY/MM/DD') //下周一
	return (
		<div className="my-1">
			{nowWeak <= 5 && (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white">距离下班：</div>}
					value={outWork}
					format="D 天 H 时 m 分 s 秒"
				/>
			)}

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

			<Countdown
				valueStyle={{
					color: '#fff',
				}}
				style={{
					color: '#fff',
				}}
				title={<div className=" text-white">距离下周一：</div>}
				value={weekStart}
				format="D 天 H 时 m 分 s 秒"
			/>
		</div>
	)
})
