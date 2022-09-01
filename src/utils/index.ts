import { useHelp } from '@components/useHelp'
import { useNode } from '@components/useNode'
import { TInstructType } from 'types/TSnowTerminal'
// const dayjs = require('dayjs')
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

const { helpNode } = useHelp()
const { infoNode } = useNode()

export function getNodeByType(type: TInstructType) {
	// const
	switch (type) {
		case 'HELP':
			return helpNode
		case 'INFO':
			return infoNode
		// case 'WEATHER':
		// 	return <Weather />
	}
	// return
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

// getWeekByDate('2022-08-28')
