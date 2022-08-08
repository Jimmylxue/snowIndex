import { commandList } from '@core/hint'
// import { useState } from 'react'

export function useHelp() {
	const helpNode = (
		<div className="mt-1">
			<div className=" mb-2">⭐️ 命令列表：</div>
			{/* <p className="mb-2">
				⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
			</p> */}
			<div className=" border-dashed border-white border-t border-l border-r">
				{commandList.map(command => (
					<div className="flex border-dashed border-white border-b">
						<div className=" w-1/5 border-r border-dashed border-white p-2">
							{command.start}
						</div>
						<div className=" w-1/4 border-r border-dashed border-white p-2">
							{command.desc}
						</div>
						<div className="p-2">{command.hint}</div>
					</div>
				))}
			</div>
		</div>
	)

	return { helpNode }
}
