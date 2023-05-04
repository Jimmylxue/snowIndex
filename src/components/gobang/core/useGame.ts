import { useCallback, useEffect, useRef, useState } from 'react'
import { checkSuccess, playChess } from './game'
import { getPositionPxList } from './position'
import { BasePxPosition, TGamePointInfo } from './type'

export function useGame() {
	const [pointInfo, setPointInfo] = useState<TGamePointInfo>({
		oneDiffPointList: [],
		twoDiffPointList: [],
	})
	const currentPlayer = useRef<'WHITE' | 'BLACK'>('BLACK')
	const [winner, setWinner] = useState<'WHITE' | 'BLACK'>()

	useEffect(() => {
		const layout = getPositionPxList(750, 15)
		setPointInfo({
			oneDiffPointList: layout[0],
			twoDiffPointList: layout[1],
		})
	}, [])

	const playChesses = useCallback(
		(clickPoint: BasePxPosition) => {
			const { oneDiffPointList, twoDiffPointList } = pointInfo
			const res = playChess(
				currentPlayer.current,
				{
					xPx: clickPoint.xPx,
					yPx: clickPoint.yPx,
				},
				oneDiffPointList,
				twoDiffPointList
			)
			if (res) {
				setPointInfo({
					oneDiffPointList: [...res[0]],
					twoDiffPointList: [...res[1]],
				})
				currentPlayer.current =
					currentPlayer.current === 'WHITE' ? 'BLACK' : 'WHITE'
			}
		},
		[pointInfo]
	)

	const rePlay = () => {
		const layout = getPositionPxList(750, 15)
		setPointInfo({
			oneDiffPointList: layout[0],
			twoDiffPointList: layout[1],
		})
	}

	useEffect(() => {
		const checkWin = checkSuccess(pointInfo.twoDiffPointList)
		if (checkWin) {
			const winner = currentPlayer.current === 'WHITE' ? 'BLACK' : 'WHITE'
			setWinner(winner)
		}
	}, [pointInfo.twoDiffPointList])

	return {
		playChess: playChesses,
		twoDiffPointList: pointInfo.twoDiffPointList,
		rePlay,
		winner,
	}
}
