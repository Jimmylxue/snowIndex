import moment from 'moment'

export function getNowTimeInfo() {
	const timeNow = new Date()
	const nowHour = timeNow.getHours()
	const nowMinutes = timeNow.getMinutes()
	const nowWeak = +moment(timeNow).format('E')

	return {
		timeNow,
		nowHour,
		nowMinutes,
		nowWeak,
	}
}
