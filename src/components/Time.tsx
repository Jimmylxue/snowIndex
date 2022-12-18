import { memo, useMemo } from 'react'
import { Progress, Statistic } from 'antd'
import { useTimeInfo } from '@/hooks/useTimeInfo'

const { Countdown } = Statistic

export default memo(() => {
	const {
		weekStart,
		workProgress,
		outWork,
		endWork,
		nowHour,
		nowMinutes,
		nowWeak,
		weekProgress,
	} = useTimeInfo({
		workStartTime: '9:00:00',
		workEndTime: '18:00:00',
	})

	const isWorkDay = useMemo(() => {
		return nowWeak <= 5
	}, [nowWeak])

	const showOffWork = useMemo(() => {
		if (isWorkDay && nowHour < 18) {
			return (
				<Countdown
					valueStyle={{
						color: '#fff',
					}}
					style={{
						color: '#fff',
					}}
					title={<div className=" text-white -mb-2">距离下班：</div>}
					value={endWork}
					format="HH:mm:ss:SSS"
				/>
			)
		} else {
			return <p className="mb-1">下班时间，该学习啦~</p>
		}
	}, [nowWeak, nowHour, nowMinutes])

	return (
		<div className="my-1" id="timeNode">
			{isWorkDay ? (
				<Progress
					percent={workProgress}
					status="active"
					strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
				/>
			) : (
				<Progress
					percent={weekProgress}
					status="active"
					strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
				/>
			)}

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
