import { getFullToday } from '@/utils/index'
import { memo } from 'react'

export default memo(() => {
	return <p className="my-1">当前时间：{getFullToday()}</p>
})
