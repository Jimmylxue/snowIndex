import { TWelcomeType } from '@/stores/reducer/welcome'
import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons'
import { useLocation } from '@/hooks/useLocation'

export default memo(() => {
	const { welcomeText, authorShow } = useSelector<
		{
			welcome: TWelcomeType
		},
		TWelcomeType
	>(state => state.welcome)
	const location = useLocation()
	useEffect(() => {
		if (location?.city) {
			localStorage.setItem('snowIndex-location', JSON.stringify(location))
		}
	}, [location])
	return (
		<div className=" text-white z-10 relative" id="welcomeNode">
			<div className="flex justify-between items-center">
				<p>{welcomeText}</p>
				<p className="flex justify-center items-center">
					{location?.city ? (
						<EnvironmentOutlined className="mr-1" />
					) : (
						<LoadingOutlined className="mr-1" />
					)}

					{location?.city || '定位中'}
				</p>
			</div>
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
