import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalStorageState } from 'ahooks';
import { TStoreType } from './store';

export function useSystemState() {
  const [background, setBackground] = useLocalStorageState('snowIndex_bg', {
    defaultValue: '',
  });

  const [welcome, setWelcome] = useLocalStorageState('snowIndex_welcome', {
    defaultValue: {
      authorShow: true,
      welcomeText: 'Welcome to SnowIndex, This is awesome!',
    },
  });

  const reset = () => {
    setBackground('');
    setWelcome({
      authorShow: true,
      welcomeText: 'Welcome to SnowIndex, This is awesome!',
    });
  };

  return {
    background,
    setBackground,
    welcome,
    setWelcome,
    reset,
  };
}

type TParams = {
  hintShow: boolean;
  is996: boolean;
  timeShow: boolean;
  welcomeText: string;
  workingHour: [number, number];
};

export function parseStoreParams(
  initState: TStoreType,
  params: TParams,
): TStoreType {
  const tempData = { ...initState };
  if (!params) {
    return { ...initState };
  }

  tempData.baseConfig.hintShow = params.hintShow;
  tempData.baseConfig.timeShow = params.timeShow;
  tempData.welcome.welcomeText = params.welcomeText;

  return tempData;
}
