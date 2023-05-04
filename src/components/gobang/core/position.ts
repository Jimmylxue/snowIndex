import { BasePxPosition, TPointInfo } from './type'
import { getTwoPointInstance } from './util'

export function getLatticeSize(layoutWidth: number, size: number) {
	return layoutWidth / size
}

export function getPositionByRowAndColumn(
	row: number,
	col: number
): BasePxPosition {
	// 14 个 格子 会有15行
	const latticeSize = getLatticeSize(750, 15)
	return {
		xPx: row * latticeSize,
		yPx: col * latticeSize,
	}
}

export function getPositionPxList(
	layoutWidth: number,
	size: number
): [TPointInfo[], TPointInfo[][]] {
	const latticeSize = getLatticeSize(layoutWidth, size)
	const positionPxList: TPointInfo[] = []
	const twoDiffPositionPxList: TPointInfo[][] = []
	for (let i = 0; i <= size; i++) {
		// 行
		const tempTwoDiffList = []
		for (let j = 0; j <= size; j++) {
			// 列
			const tempPosition: TPointInfo = {
				xPx: i * latticeSize,
				yPx: j * latticeSize,
				pointStatus: 'EMPTY',
				_x: i,
				_y: j,
				_index: j * size + i,
			}
			positionPxList.push(tempPosition)
			tempTwoDiffList.push(tempPosition)
		}
		twoDiffPositionPxList.push(tempTwoDiffList)
	}
	const newTwoList = twoDiffPositionPxList[0].map((col, i) =>
		twoDiffPositionPxList.map(row => row[i])
	)
	return [positionPxList, newTwoList]
}

export function filterShouldCheckPosition(
	checkPosition: BasePxPosition,
	layoutPositionList: BasePxPosition[]
) {
	const { xPx, yPx } = checkPosition
	return layoutPositionList.filter(position => {
		const xOk = Math.abs(position.xPx - xPx) < 50
		const yOk = Math.abs(position.yPx - yPx) < 50
		return xOk && yOk
	})
}

export function getClickNearPosition(
	checkPosition: BasePxPosition,
	layoutPositionList: BasePxPosition[]
) {
	const shouldCheckList = filterShouldCheckPosition(
		checkPosition,
		layoutPositionList
	)
	if (shouldCheckList.length === 1) {
		return {
			point: shouldCheckList[0],
			minNearPointIndex: 0,
		}
	}
	let minNearPointIndex = 0
	let minDistance = 50
	let minPoint = null
	shouldCheckList.forEach((item, index) => {
		const distance = getTwoPointInstance(checkPosition, item)
		if (distance < minDistance) {
			minDistance = distance
			minNearPointIndex = index
			minPoint = item
		}
	})

	return {
		point: minPoint,
		minNearPointIndex,
	}
}
