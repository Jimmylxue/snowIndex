import { memo, useMemo } from 'react'
import { Progress, Statistic } from 'antd'
import { useTimeInfo } from '@/hooks/useTimeInfo'

const { Countdown } = Statistic

export default memo(() => {
	const {
		weekStart,
		progress,
		outWork,
		endWork,
		nowHour,
		nowMinutes,
		nowWeak,
	} = useTimeInfo({
		workStartTime: '9:00:00',
		workEndTime: '18:00:00',
	})

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
			<Progress
				percent={progress}
				status="active"
				strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
			/>
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
