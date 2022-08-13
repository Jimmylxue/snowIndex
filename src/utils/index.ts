import { useHelp } from '@components/useHelp'
import { useNode } from '@components/useNode'
import { TInstructType } from 'types/TSnowTerminal'

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
	}
	// return
}
