// store中数据的默认值
const defaultState = {
	value: 'default',
}
const reducer = (state = defaultState, action: any) => {
	const newState = JSON.parse(JSON.stringify(state))
	// ... 根据action对newState做修改，并返回
	return newState
}
export default reducer
