import dayjs from 'dayjs'

let UID = {
	_nextID: 0,
	get() {
		return this._nextID++
	},
}

export const uuid = () => UID.get()

export function subStrBetween(str: string, start: string, end: string) {
	const split1 = str.split(start)[1]
	if (!split1) {
		return ''
	}
	const split2 = split1.split(end)[0]
	return split2
}

export function getToday() {
	return dayjs().format('YYYY-MM-DD')
}

type TWeak = '1' | '2' | '3' | '4' | '5' | '6' | '0'

export function getWeekByDate(date: string): string {
	const week: TWeak = String(dayjs(date).get('day')) as unknown as TWeak

	const map = {
		'1': '周一',
		'2': '周二',
		'3': '周三',
		'4': '周四',
		'5': '周五',
		'6': '周六',
		'0': '周日',
	}
	return map[week]
}

export function getFullToday() {
	const ymd = dayjs().format('YYYY-MM-DD')
	const week = getWeekByDate(ymd)
	const hms = dayjs().format('HH:mm:ss')
	return `${ymd} ${week} ${hms}`
}
