// 引入createStore方法
import { createStore, combineReducers, compose } from 'redux';
import backgroundReducer from './reducer/background';
import welcomeReducer from './reducer/welcome';
import { throttle } from 'lodash';
import { loadState, saveState } from '@/utils/localStroage';
import baseConfigReducer from './reducer/baseConfig';

export type TStoreType = {
  background: {
    background: string;
  };
  baseConfig: {
    hintShow: boolean;
    hostname: string;
    jumpList: { name: string; url: string }[];
    timeShow: boolean;
  };
  welcome: {
    authorShow: boolean;
    welcomeText: string;
  };
};

const persistedState = loadState();

const baseReducer = combineReducers({
  background: backgroundReducer,
  welcome: welcomeReducer,
  baseConfig: baseConfigReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = undefined;
  }
  if (action.type === 'FULL_SETTING') {
    return { ...state };
  }
  return baseReducer(state, action);
};
// const store = createStore(baseReducer, persistedState)
const store = createStore(rootReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000),
);

export default store;
