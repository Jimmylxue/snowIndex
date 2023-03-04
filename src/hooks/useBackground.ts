import store from '@/stores/store';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToday } from '../utils';
import { get } from '@/api/index';
import { TSnowTerminal } from '@/types/TSnowTerminal';

type TProps = {
  terminal: TSnowTerminal;
};

export function useBackground({ terminal }: TProps) {
  const state = store.getState();
  const storeDispatch = useDispatch();
  const { background } = useSelector<typeof state, typeof state>(
    (state) => state,
  );

  const changeBingBg = useCallback(async () => {
    const res = await get<string>(`bingBg/today?UHD=true`);
    terminal.changeBackGround(res?.result!);
  }, [terminal]);

  useEffect(() => {
    const today = getToday();

    if (background.today !== today) {
      console.log('保存时间');
      storeDispatch({
        type: 'set_today',
        data: {
          today: today,
        },
      });
      if (background.autoChange) {
        changeBingBg();
      }
    } else {
      console.log('今天已经登陆过了');
    }
  }, []);
}
