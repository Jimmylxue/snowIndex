import { useMemo } from 'react'
import { TInputRecord } from 'types/TSnowTerminal'

type TProps = {
	history: TInputRecord[]
	index: number
}

export default function History({ history, index }: TProps) {
	const record = useMemo(() => {
		const recordAll = history.filter(
			struct => struct.type === 'INSTRUCT' && struct.instruct
		)
		return recordAll.slice(0, index)
	}, [index])

	return (
		<div className="mt-1 mb-2">
			{record.map((instruct, index) => (
				<p key={instruct.id}>
					<span className=" mr-3">{index + 1}</span>
					{instruct.instruct}
				</p>
			))}
		</div>
	)
}
