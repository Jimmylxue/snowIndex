import { useEffect } from 'react'

export function usePosition() {
	const getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(position => {
				// console.log('value', value)
				console.log('纬度：', position.coords.latitude)
				console.log('经度：', position.coords.longitude)
			})
		} else {
			alert('该浏览器不支持获取地理位置。')
		}
	}

	useEffect(() => {
		getLocation()
	}, [])
}
