// 引入createStore方法
import { createStore, combineReducers, compose } from 'redux'
import reducer from './reducer/test'
import welcomeReducer from './reducer/welcome'
import { throttle } from 'lodash'
import { loadState, saveState } from '@utils/localStroage'

const persistedState = loadState()

const baseReducer = combineReducers({
	test: reducer,
	welcome: welcomeReducer,
})
const store = createStore(baseReducer, persistedState)

store.subscribe(
	throttle(() => {
		saveState(store.getState())
	}, 1000)
)

export default store
