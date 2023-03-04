import { TBackgroundAction } from '@/stores/consts';
import { Action } from 'redux';

export type TBackgroundType = {
  background: string;
  autoChange: boolean;
  today: string;
};

// store中数据的默认值
const defaultState: TBackgroundType = {
  background: '',
  autoChange: true,
  today: '',
};
const backgroundReducer = ((
  state = defaultState,
  action: Action<TBackgroundAction> & { data: TBackgroundType },
) => {
  const { type, data } = action;

  switch (type) {
    case 'set_background':
      return {
        ...state,
        background: data.background || '',
      };

    case 'set_auto_bg_change':
      return {
        ...state,
        autoChange: !!data.autoChange,
      };

    case 'set_today':
      return {
        ...state,
        today: data.today || '',
      };

    default:
      return {
        ...state,
      };
  }
}) as () => TBackgroundType;
export default backgroundReducer;
