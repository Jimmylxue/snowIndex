import { memo, useState } from 'react'
import { TSnowTerminal } from 'types/TSnowTerminal'

type TProps = {
	scheduler: TSnowTerminal
	welcome: {
		authorShow: boolean
		welcomeText: string
	}
}

export default memo(({ scheduler, welcome }: TProps) => {
	const { authorShow, welcomeText } = welcome
	return (
		<div className=" text-white z-10 relative">
			<p>{welcomeText}</p>
			{authorShow && (
				<p>
					Author{' '}
					<a
						className=" text-blue-500 ml-1"
						href="https://github.com/Jimmylxue"
					>
						Jimmyxuexue
					</a>
					, reference from coder_yupi, github:
					<a
						href="https://github.com/Jimmylxue/snowIndex"
						className=" text-blue-500 ml-1"
					>
						SnowIndex
					</a>
				</p>
			)}
		</div>
	)
})
