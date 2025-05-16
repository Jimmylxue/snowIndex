import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToday } from '../utils';
import { get } from '@/api/index';
import { TSnowTerminal } from '@/types/TSnowTerminal';
import { useStore } from './useStore';

type TProps = {
  terminal: TSnowTerminal;
};

export function useBackground({ terminal }: TProps) {
  const storeDispatch = useDispatch();
  const {
    stores: { background },
  } = useStore();

  const changeBingBg = useCallback(async () => {
    const res = await get<string>(`bingBg/today?UHD=true`);
    terminal.changeBackGround(res!);
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
