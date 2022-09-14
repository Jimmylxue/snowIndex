import { fanyiCommand } from '@core/execute/fanyi'
import { memo } from 'react'
import { languageMap } from 'types/TBaiduFanyi'

export default memo(() => {
	return (
		<div className="mt-1 mb-2">
			<div className=" mt-2">⭐️ 翻译帮助：</div>
			<div className="text-gray-400">basic usage: {fanyiCommand.hint}</div>
			<div className="my-2">支持语言列表:</div>
			<div>
				{Object.entries(languageMap).map((value, index) => (
					<div className=" flex" key={index}>
						<div>{value[0]}</div>
						<div className=" mx-2"> {'=>'} </div>
						<div>{value[1]}</div>
					</div>
				))}
				...
			</div>
			<div className="mt-2">
				更多语种列表请查询百度翻译API：
				<a className="text-blue-500" href="https://fanyi-api.baidu.com/doc/21">
					传送门
				</a>
			</div>
		</div>
	)
})
