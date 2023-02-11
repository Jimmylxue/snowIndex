import useLocalStorage from '@/hooks/useLocalStorage';
import { useLocalStorageState } from 'ahooks';
import moment from 'moment';
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
  workingHour: string[];
  salary: number;
};

export function parseStoreParams(
  initState: TStoreType,
  params: TParams,
): TStoreType {
  const tempData = { ...initState };
  if (!params) {
    return { ...initState };
  }
  tempData.baseConfig.hintShow = !!params.hintShow;
  tempData.baseConfig.timeShow = !!params.timeShow;
  tempData.welcome.welcomeText = params.welcomeText;
  tempData.baseConfig.workingHour = [
    moment(params?.workingHour?.[0]).format('HH:mm:ss'),
    moment(params?.workingHour?.[1]).format('HH:mm:ss'),
  ];
  tempData.baseConfig.is996 = !!params.is996;
  tempData.baseConfig.salary = params.salary;
  return tempData;
}

export function parseSettingParams(initState: TStoreType): TParams {
  const tempData: TParams = {
    hintShow: initState.baseConfig.hintShow,
    is996: initState.baseConfig.is996,
    timeShow: initState.baseConfig.timeShow,
    salary: initState.baseConfig.salary,
    // @ts-ignore
    workingHour: initState.baseConfig.workingHour.map((item) => {
      const [hour, min, second] = item?.split(':');
      return moment()
        .set('hour', +hour)
        .set('minute', +min)
        .set('second', +second);
    }),
    welcomeText: initState.welcome.welcomeText,
  };

  return tempData;
}
