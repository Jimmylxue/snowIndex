import { useState } from 'react'

export function useHelp() {
	const [show, setShow] = useState(true)

	const helpNode = (
		<div>
			<div>命令列表</div>
			<div>
				<div>
					<div>search</div>
					<div>网页搜索</div>
					<div>支持不同平台搜索</div>
				</div>
				<div>
					<div>search</div>
					<div>网页搜索</div>
					<div>支持不同平台搜索</div>
				</div>
			</div>
		</div>
	)

	return { helpNode }
}
