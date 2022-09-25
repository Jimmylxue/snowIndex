import { memo } from 'react'
import { shortcutList } from '@hooks/const'
import { divide } from 'lodash'

export default memo(() => {
	return (
		<div>
			<div>快捷键：</div>
			{shortcutList.map((cut, index) => (
				<div className="flex" key={index}>
					<div className="w-24 mr-24">{cut.keyDesc}</div>
					<div>{cut.desc}</div>
				</div>
			))}
		</div>
	)
})
