import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

export function useScan(start = false) {
	const [value, setValue] = useState('')
	const temp = useRef('')
	const timer = useRef<any>()
	const clear = () => {
		console.log('do clear~~~~~~~~~~')
		temp.current = ''
		clearTimeout(timer.current)
		setValue('')
	}
	useEffect(() => {
		if (start) {
			let lastTime = -1
			document.onkeydown = e => {
				console.log(temp.current, e.key)
				clearTimeout(timer.current)
				const current = dayjs().valueOf()
				console.log(current, lastTime, current - lastTime)
				const isKeyboard = lastTime > 0 && current - lastTime > 100
				lastTime = current
				if (isKeyboard) {
					lastTime = -1
					temp.current = ''
					return
				}
				const str = e.key
				if (temp.current.length && str === 'Enter') {
					setValue(temp.current)
					lastTime = -1
					temp.current = ''
					return
				}
				if (str.length > 1) {
					return
				}
				temp.current = `${temp.current}${str}`
				timer.current = setTimeout(() => {
					if (temp.current.length >= 2) {
						setValue(temp.current)
					}
					lastTime = -1
					temp.current = ''
				}, 300)
			}
		} else {
			clearTimeout(timer.current)
			document.onkeydown = null
			temp.current = ''
			setValue('')
		}
	}, [start])

	return { code: value, clear }
}
