import { commandList } from '@core/hint'
import { memo } from 'react'

export default memo(() => {
	return (
		<div className="mt-1 mb-2">
			<div className=" mb-2">⭐️ 命令列表：</div>
			{/* <p className="mb-2">
				⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
			</p> */}
			<div className=" border-dashed border-white border-t border-l border-r">
				{commandList.map((command, index) => (
					<div key={index} className="flex border-dashed border-white border-b">
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
})

type THelpProps = {
	helpKey: string
}

export function HelpInstructNode({ helpKey }: THelpProps) {
	const command = commandList.find(str => str.start === helpKey)

	return (
		<div>
			<div className=" mt-2">⭐️ {command?.start}帮助：</div>
			<div className="text-gray-400">basic usage: {command?.hint}</div>
			<div>
				<p>参数：</p>
				{command?.params.map(param => (
					<p>
						·{param.key} {param.isRequire ? '必填' : '非必填'} {param.desc}
					</p>
				))}
			</div>
			<div>
				<p>选项：</p>
				{command?.options.map(opt => (
					<p>
						·{opt.alias?.join(' ')} --{opt.key} {opt.desc} 默认
						{JSON.stringify(opt.default)}
					</p>
				))}
			</div>
		</div>
	)
}
