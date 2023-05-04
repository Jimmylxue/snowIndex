export type BasePxPosition = {
	xPx: number
	yPx: number
}

export type BaseLayoutPosition = {
	_x: number
	_y: number
	_index: number
}

export type TPointStatus = 'EMPTY' | 'WHITE' | 'BLACK'

export type TPointInfo = BasePxPosition & {
	pointStatus: TPointStatus
} & BaseLayoutPosition

export type TGamePointInfo = {
	oneDiffPointList: TPointInfo[]
	twoDiffPointList: TPointInfo[][]
}
