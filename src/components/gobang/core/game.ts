import { getClickNearPosition } from './position'
import { BasePxPosition, TPointInfo } from './type'

// 检查当前这个棋子 可否在某个点下
export function checkPointCanChess(pointInfo: TPointInfo) {
	return pointInfo.pointStatus === 'EMPTY'
}

export function getLayoutPointByPosition(
	position: BasePxPosition,
	oneDiffPointList: TPointInfo[]
): TPointInfo | undefined {
	return oneDiffPointList.find(
		point => point.xPx === position.xPx && point.yPx === position.yPx
	)
}

export function updateOneDiffLayout(
	pointInfo: TPointInfo,
	oneDiffPointList: TPointInfo[]
): TPointInfo[] {
	oneDiffPointList[pointInfo._index].pointStatus = pointInfo.pointStatus
	return oneDiffPointList
}

export function updateTwoDiffLayout(
	pointInfo: TPointInfo,
	twoDiffPointList: TPointInfo[][]
): TPointInfo[][] {
	twoDiffPointList[pointInfo._x][pointInfo._y].pointStatus =
		pointInfo.pointStatus
	return twoDiffPointList
}

// 下棋 -> 更新layout 的棋子信息
export function playChess(
	player: 'WHITE' | 'BLACK',
	position: BasePxPosition,
	oneDiffPointList: TPointInfo[],
	twoDiffPositionList: TPointInfo[][]
) {
	const nearPoint = getClickNearPosition(position, oneDiffPointList)
	if (!nearPoint.point) {
		console.log('不存在最近的点')
		return
	}
	const playPoint = getLayoutPointByPosition(nearPoint.point, oneDiffPointList)
	if (!playPoint) {
		console.log('该点不存在', position)
		throw new Error('改点不存在')
	}
	const whetherCanPlay = checkPointCanChess(playPoint)
	if (!whetherCanPlay) {
		console.log('改点不可下棋', playPoint)

		throw new Error('改点不可下棋')
	}
	playPoint.pointStatus = player // 设置该点的选手颜色
	return [oneDiffPointList, twoDiffPositionList] as const
}

export function getCheckRowLine(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const { _x, _y } = checkPoint
	return twoDiffPointList[_y].filter((_, index) => index > _x)
}

export function getCheckColLine(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const { _x, _y } = checkPoint
	const checkColLine: TPointInfo[] = []
	for (let i = _y + 1; i < twoDiffPointList.length; i++) {
		checkColLine.push(twoDiffPointList[i][_x])
	}
	return checkColLine
}

export function getCheckRightDiagLine(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const { _x, _y } = checkPoint
	const checkDiagLine: TPointInfo[] = []
	for (let i = _x + 1; i < twoDiffPointList.length; i++) {
		for (let j = _y + 1; j < twoDiffPointList[i].length; j++) {
			if (j - i === _y - _x) {
				const checkItem = twoDiffPointList[j][i]
				if (checkItem) {
					checkDiagLine.push(twoDiffPointList[j][i])
				} else {
					console.log('该坐标无数据', i, j)
				}
			}
		}
	}
	return checkDiagLine
}

export function getCheckLeftDiagLine(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const { _x, _y } = checkPoint
	const checkDiagLine: TPointInfo[] = []
	let j = _y + 1
	for (let i = _x - 1; i >= 0; i--) {
		if (j > 15) {
			break
		}
		const item = twoDiffPointList[j][i]
		checkDiagLine.push(item)
		j++
	}
	return checkDiagLine
}

export function whetherRowSuccess(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const checkRowLine = getCheckRowLine(checkPoint, twoDiffPointList)
	return checkHasSuccessLine(checkPoint, checkRowLine)
}

export function whetherColSuccess(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const checkColLine = getCheckColLine(checkPoint, twoDiffPointList)
	if (checkHasSuccessLine(checkPoint, checkColLine)) {
		console.log(checkColLine)
	}
	return checkHasSuccessLine(checkPoint, checkColLine)
}

export function whetherRightDiagSuccess(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const checkRightLine = getCheckRightDiagLine(checkPoint, twoDiffPointList)
	return checkHasSuccessLine(checkPoint, checkRightLine)
}

export function whetherLeftDiagSuccess(
	checkPoint: TPointInfo,
	twoDiffPointList: TPointInfo[][]
) {
	const checkLeftLine = getCheckLeftDiagLine(checkPoint, twoDiffPointList)
	if (checkHasSuccessLine(checkPoint, checkLeftLine)) {
		console.log(checkLeftLine, checkPoint)
	}
	return checkHasSuccessLine(checkPoint, checkLeftLine)
}

export function checkHasSuccessLine(
	point: TPointInfo,
	checkLine: TPointInfo[]
) {
	if (checkLine.length < 4) {
		return false
	}
	let successCount = 1
	for (let i = 0; i < checkLine.length; i++) {
		if (
			checkLine[i].pointStatus === point.pointStatus &&
			checkLine[i].pointStatus !== 'EMPTY'
		) {
			successCount += 1
		} else {
			break
		}
	}

	return successCount >= 5
}

// check 检查是否有赢
export function checkSuccess(twoDiffPointList: TPointInfo[][]) {
	let flag = false
	for (let i = 0; i < twoDiffPointList.length; i++) {
		for (let j = 0; j < twoDiffPointList[i].length; j++) {
			const checkPoint = twoDiffPointList[i][j]
			const rowSuccess = whetherRowSuccess(checkPoint, twoDiffPointList)
			const colSuccess = whetherColSuccess(checkPoint, twoDiffPointList)
			// 捺
			const diagRightSuccess = whetherRightDiagSuccess(
				checkPoint,
				twoDiffPointList
			)
			// 撇
			const diagLeftSuccess = whetherLeftDiagSuccess(
				checkPoint,
				twoDiffPointList
			)
			if (rowSuccess || colSuccess || diagRightSuccess || diagLeftSuccess) {
				flag = true
				break
			}
		}
	}

	return flag
}
