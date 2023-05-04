import { BasePxPosition } from './type'

// 获取两个点之间的距离
export function getTwoPointInstance(
	point1: BasePxPosition,
	point2: BasePxPosition
): number {
	let dep = Math.sqrt(
		Math.pow(point1.xPx - point2.xPx, 2) + Math.pow(point1.yPx - point2.yPx, 2)
	)
	return dep
}
