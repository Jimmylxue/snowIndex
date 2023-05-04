import {
	checkHasSuccessLine,
	getCheckColLine,
	getCheckLeftDiagLine,
	getCheckRightDiagLine,
	getCheckRowLine,
	getLayoutPointByPosition,
	updateOneDiffLayout,
	updateTwoDiffLayout,
} from '../game'
import { TPointInfo } from '../type'
import { twoDiffList } from '../../mock/point'

const pointList: TPointInfo[] = [
	{
		xPx: 50,
		yPx: 50,
		_x: 1,
		_y: 1,
		_index: 18,
		pointStatus: 'EMPTY',
	},
	{
		xPx: 100,
		yPx: 50,
		_x: 2,
		_y: 1,
		_index: 19,
		pointStatus: 'EMPTY',
	},
]

let oneDiffPointLists: TPointInfo[]
let twoDiffPointLists: TPointInfo[][]

beforeEach(() => {
	oneDiffPointLists = [
		{
			xPx: 0,
			yPx: 0,
			_x: 0,
			_y: 0,
			_index: 0,
			pointStatus: 'EMPTY',
		},
		{
			xPx: 50,
			yPx: 0,
			_x: 1,
			_y: 0,
			_index: 1,
			pointStatus: 'EMPTY',
		},
	]
	twoDiffPointLists = [
		[
			{
				xPx: 0,
				yPx: 0,
				_x: 0,
				_y: 0,
				_index: 0,
				pointStatus: 'EMPTY',
			},
			{
				xPx: 50,
				yPx: 0,
				_x: 1,
				_y: 0,
				_index: 1,
				pointStatus: 'EMPTY',
			},
		],
		[
			{
				xPx: 0,
				yPx: 50,
				_x: 0,
				_y: 1,
				_index: 2,
				pointStatus: 'EMPTY',
			},
			{
				xPx: 50,
				yPx: 50,
				_x: 1,
				_y: 1,
				_index: 3,
				pointStatus: 'EMPTY',
			},
		],
	]
})

describe('>>> getLayoutPointByPosition', () => {
	it('position {50,50} should has return point', () => {
		expect(getLayoutPointByPosition({ xPx: 50, yPx: 50 }, pointList)).toEqual({
			xPx: 50,
			yPx: 50,
			_x: 1,
			_y: 1,
			_index: 18,
			pointStatus: 'EMPTY',
		})
	})

	it('position {80,80} should has return undefined', () => {
		expect(
			getLayoutPointByPosition({ xPx: 80, yPx: 80 }, pointList)
		).toBeUndefined()
	})
})

describe('>>> updateOneDiffLayout', () => {
	it('update point{0,0} to be BLACK', () => {
		const pointInfo: TPointInfo = {
			xPx: 0,
			yPx: 0,
			_x: 0,
			_y: 0,
			_index: 0,
			pointStatus: 'BLACK',
		}
		expect(
			updateOneDiffLayout(pointInfo, oneDiffPointLists)[pointInfo._index]
		).toEqual({
			xPx: 0,
			yPx: 0,
			_x: 0,
			_y: 0,
			_index: 0,
			pointStatus: 'BLACK',
		})
	})
})

describe('>>> updateTwoDiffLayout', () => {
	it('update point{50,50} to be WHITE', () => {
		const pointInfo: TPointInfo = {
			xPx: 50,
			yPx: 50,
			_x: 1,
			_y: 1,
			_index: 3,
			pointStatus: 'WHITE',
		}
		expect(
			updateTwoDiffLayout(pointInfo, twoDiffPointLists)[pointInfo._x][
				pointInfo._y
			]
		).toEqual({
			xPx: 50,
			yPx: 50,
			_x: 1,
			_y: 1,
			_index: 3,
			pointStatus: 'WHITE',
		})
	})
})

describe('>>> getCheckRowLine', () => {
	it('point {0,0} line info', () => {
		expect(
			getCheckRowLine(
				{
					xPx: 0,
					yPx: 0,
					pointStatus: 'EMPTY',
					_x: 0,
					_y: 0,
					_index: 0,
				},
				twoDiffList
			).length
		).toBe(twoDiffList[0].length - 1)
	})

	it('point {5,5} line info', () => {
		expect(
			getCheckRowLine(
				{
					xPx: 250,
					yPx: 250,
					pointStatus: 'EMPTY',
					_x: 5,
					_y: 5,
					_index: 50,
				},
				twoDiffList
			).length
		).toBe(3)
	})

	it('point {8,8} line info', () => {
		expect(
			getCheckRowLine(
				{
					xPx: 400,
					yPx: 400,
					pointStatus: 'EMPTY',
					_x: 8,
					_y: 8,
					_index: 80,
				},
				twoDiffList
			).length
		).toBe(0)
	})
})

describe('>>> getCheckColLine', () => {
	it('point {0,0} line info', () => {
		expect(
			getCheckColLine(
				{
					xPx: 0,
					yPx: 0,
					pointStatus: 'EMPTY',
					_x: 0,
					_y: 0,
					_index: 0,
				},
				twoDiffList
			).length
		).toBe(twoDiffList[0].length - 1)
	})

	it('point {5,2} line info', () => {
		expect(
			getCheckColLine(
				{
					xPx: 250,
					yPx: 100,
					pointStatus: 'EMPTY',
					_x: 5,
					_y: 2,
					_index: 23,
				},
				twoDiffList
			).length
		).toBe(6)
		// 共9行 3,4,5,6,7,8 （从0 开始）
	})
})

describe('>>> getCheckRightDiagLine', () => {
	it('point {0,0} line info', () => {
		expect(
			getCheckRightDiagLine(
				{
					xPx: 0,
					yPx: 0,
					pointStatus: 'EMPTY',
					_x: 0,
					_y: 0,
					_index: 0,
				},
				twoDiffList
			).length
		).toBe(twoDiffList[0].length - 1)
	})

	it('point {5,2} line info', () => {
		const diagInfo = getCheckRightDiagLine(
			{
				xPx: 250,
				yPx: 100,
				pointStatus: 'EMPTY',
				_x: 5,
				_y: 2,
				_index: 23,
			},
			twoDiffList
		)
		expect(diagInfo.length).toBe(3)

		expect(diagInfo[0]).toEqual({
			xPx: 300,
			yPx: 150,
			pointStatus: 'EMPTY',
			_x: 6,
			_y: 3,
			_index: 33,
		})
	})
})

describe('>>> getCheckLeftDiagLine', () => {
	it('point {0,0} line info', () => {
		expect(
			getCheckLeftDiagLine(
				{
					xPx: 0,
					yPx: 0,
					pointStatus: 'EMPTY',
					_x: 0,
					_y: 0,
					_index: 0,
				},
				twoDiffList
			).length
		).toBe(0) // {0,0}
	})

	it('point {5,2} line info', () => {
		const diagInfo = getCheckLeftDiagLine(
			{
				xPx: 250,
				yPx: 100,
				pointStatus: 'EMPTY',
				_x: 5,
				_y: 2,
				_index: 23,
			},
			twoDiffList
		)
		expect(diagInfo.length).toBe(5) // {0,7} {1,6} {2,5} {3,4} {4,3}
	})
})

// })

describe('>>> checkHasSuccessLine', () => {
	const checkItem: TPointInfo = {
		xPx: 200,
		yPx: 50,
		pointStatus: 'BLACK',
		_x: 4,
		_y: 1,
		_index: 13,
	}
	it('array length less than 4', () => {
		const arr: TPointInfo[] = [
			{
				xPx: 250,
				yPx: 50,
				pointStatus: 'EMPTY',
				_x: 5,
				_y: 1,
				_index: 14,
			},
			{
				xPx: 300,
				yPx: 50,
				pointStatus: 'EMPTY',
				_x: 6,
				_y: 1,
				_index: 15,
			},
			{
				xPx: 350,
				yPx: 50,
				pointStatus: 'EMPTY',
				_x: 7,
				_y: 1,
				_index: 16,
			},
			{
				xPx: 400,
				yPx: 50,
				pointStatus: 'EMPTY',
				_x: 8,
				_y: 1,
				_index: 17,
			},
		]
		expect(checkHasSuccessLine(checkItem, arr)).toBeFalsy()
	})

	it('5 black', () => {
		const arr2: TPointInfo[] = [
			{
				xPx: 250,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 5,
				_y: 1,
				_index: 14,
			},
			{
				xPx: 300,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 6,
				_y: 1,
				_index: 15,
			},
			{
				xPx: 350,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 7,
				_y: 1,
				_index: 16,
			},
			{
				xPx: 400,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 8,
				_y: 1,
				_index: 17,
			},
		]
		expect(checkHasSuccessLine(checkItem, arr2)).toBeTruthy()
	})

	it('5 chess has one of White', () => {
		const arr2: TPointInfo[] = [
			{
				xPx: 250,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 5,
				_y: 1,
				_index: 14,
			},
			{
				xPx: 300,
				yPx: 50,
				pointStatus: 'WHITE',
				_x: 6,
				_y: 1,
				_index: 15,
			},
			{
				xPx: 350,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 7,
				_y: 1,
				_index: 16,
			},
			{
				xPx: 400,
				yPx: 50,
				pointStatus: 'BLACK',
				_x: 8,
				_y: 1,
				_index: 17,
			},
		]
		expect(checkHasSuccessLine(checkItem, arr2)).toBeFalsy()
	})
})

// 这部分可以不测

// describe('>>> playChess', () => {
// 	it('update point{50,0} with BLACK should success', () => {
// 		expect(
// 			playChess(
// 				'BLACK',
// 				{ xPx: 50, yPx: 0 },
// 				oneDiffPointLists,
// 				twoDiffPointLists
// 			)?.[0]?.[1]
// 		).toEqual({
// 			xPx: 50,
// 			yPx: 0,
// 			_x: 1,
// 			_y: 0,
// 			_index: 1,
// 			pointStatus: 'BLACK',
// 		})
// 	})
// 	it('update point{0,0} with BLACK should success', () => {
// 		const res = playChess(
// 			'BLACK',
// 			{ xPx: 0, yPx: 0 },
// 			oneDiffPointLists,
// 			twoDiffPointLists
// 		)
// 		if (res) {
// 			const [_, newTwoDiffList] = res
// 			expect(newTwoDiffList.length).toBe(2)
// 			expect(newTwoDiffList[0][0].pointStatus === 'BLACK').toBeTruthy()
// 		}
// 	})
// })

export {}
