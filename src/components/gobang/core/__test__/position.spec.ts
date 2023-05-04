import {
	filterShouldCheckPosition,
	getClickNearPosition,
	getLatticeSize,
	getPositionByRowAndColumn,
	getPositionPxList,
} from '../position'

describe('>>> getLatticeSize', () => {
	it('one of lattice is 50 when layout size is 750 and split 15 part', () => {
		expect(getLatticeSize(750, 15)).toBe(50)
	})
})

describe('>>> getPositionByRowAndColumn', () => {
	it('position is 0,0 when row is 0 and col is 0', () => {
		expect(getPositionByRowAndColumn(0, 0)).toEqual({
			xPx: 0,
			yPx: 0,
		})
	})

	it('position is 200,0 when row is 0 and col is 4', () => {
		expect(getPositionByRowAndColumn(4, 0)).toEqual({
			xPx: 200,
			yPx: 0,
		})
	})

	it('position is 750,7500 when row is 14 and col is 14', () => {
		expect(getPositionByRowAndColumn(15, 15)).toEqual({
			xPx: 750,
			yPx: 750,
		})
	})
})

describe('>>> getPositionPxList', () => {
	it('layoutWidth is 750 split size 15', () => {
		const positionListInfo = getPositionPxList(750, 15)
		expect(positionListInfo.length === 2).toBeTruthy()
		const [oneDiffPositionList, twoDiffPositionList] = positionListInfo
		expect(oneDiffPositionList.length === 16 * 16).toBeTruthy()
		expect(twoDiffPositionList.length).toBe(16)
		expect(twoDiffPositionList[1].length).toBe(16)
	})
})

describe('>>> filterShouldCheckPosition', () => {
	const [oneDiffPositionList] = getPositionPxList(750, 15)

	it('position {100,100} should has 4 position data', () => {
		expect(
			filterShouldCheckPosition({ xPx: 70, yPx: 70 }, oneDiffPositionList)
				.length === 4
		).toBeTruthy()

		expect(
			filterShouldCheckPosition({ xPx: 70, yPx: 70 }, oneDiffPositionList)
		).toEqual([
			{ xPx: 50, yPx: 50, pointStatus: 'EMPTY', _x: 1, _y: 1, _index: 16 },
			{ xPx: 50, yPx: 100, pointStatus: 'EMPTY', _x: 1, _y: 2, _index: 31 },
			{ xPx: 100, yPx: 50, pointStatus: 'EMPTY', _x: 2, _y: 1, _index: 17 },
			{ xPx: 100, yPx: 100, pointStatus: 'EMPTY', _x: 2, _y: 2, _index: 32 },
		])
	})

	it('position {70,0} should has 2 position data', () => {
		expect(
			filterShouldCheckPosition({ xPx: 70, yPx: 0 }, oneDiffPositionList)
				.length === 2
		).toBeTruthy()
		expect(
			filterShouldCheckPosition({ xPx: 70, yPx: 0 }, oneDiffPositionList)
		).toEqual([
			{ xPx: 50, yPx: 0, pointStatus: 'EMPTY', _x: 1, _y: 0, _index: 1 },
			{ xPx: 100, yPx: 0, pointStatus: 'EMPTY', _x: 2, _y: 0, _index: 2 },
		])
	})

	it('position {750,750} should has 1 position data', () => {
		expect(
			filterShouldCheckPosition({ xPx: 750, yPx: 750 }, oneDiffPositionList)
				.length === 1
		).toBeTruthy()
		expect(
			filterShouldCheckPosition({ xPx: 750, yPx: 750 }, oneDiffPositionList)
		).toEqual([
			{ xPx: 750, yPx: 750, pointStatus: 'EMPTY', _x: 15, _y: 15, _index: 240 },
		])
	})
})

describe('>>> getClickNearPosition', () => {
	it('position {730,730} should return point {750,750}', () => {
		const clickPoint = { xPx: 730, yPx: 730 }
		const [oneDiffPositionList] = getPositionPxList(750, 15)
		const shouldCheckList = filterShouldCheckPosition(
			clickPoint,
			oneDiffPositionList
		)
		expect(getClickNearPosition(clickPoint, shouldCheckList).point).toEqual({
			xPx: 750,
			yPx: 750,
			pointStatus: 'EMPTY',
			_x: 15,
			_y: 15,
			_index: 240,
		})
	})

	it('position {720,720} should return point {750,750}', () => {
		const clickPoint = { xPx: 720, yPx: 720 }
		const [oneDiffPositionList] = getPositionPxList(750, 15)
		const shouldCheckList = filterShouldCheckPosition(
			clickPoint,
			oneDiffPositionList
		)
		expect(getClickNearPosition(clickPoint, shouldCheckList).point).toEqual({
			xPx: 700,
			yPx: 700,
			pointStatus: 'EMPTY',
			_x: 14,
			_y: 14,
			_index: 224,
		})
	})

	it('position {725,725} should return point {750,750}', () => {
		const clickPoint = { xPx: 725, yPx: 725 }
		const [oneDiffPositionList] = getPositionPxList(750, 15)
		const shouldCheckList = filterShouldCheckPosition(
			clickPoint,
			oneDiffPositionList
		)
		expect(getClickNearPosition(clickPoint, shouldCheckList).point).toEqual({
			xPx: 700,
			yPx: 700,
			pointStatus: 'EMPTY',
			_x: 14,
			_y: 14,
			_index: 224,
		})
	})
})

export {}
