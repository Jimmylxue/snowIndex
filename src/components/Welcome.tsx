import { TWelcomeType } from '@stores/reducer/welcome'
import { memo } from 'react'
import { useSelector } from 'react-redux'

export default memo(() => {
	const { welcomeText, authorShow } = useSelector<
		{
			welcome: TWelcomeType
		},
		TWelcomeType
	>(state => state.welcome)

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
