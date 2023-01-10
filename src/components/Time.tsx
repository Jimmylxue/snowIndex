import { memo, useMemo } from 'react';
import { Progress, Statistic } from 'antd';
import { useTimeInfo } from '@/hooks/useTimeInfo';

const { Countdown } = Statistic;

export default memo(() => {
  const {
    weekStart,
    workProgress,
    outWork,
    endWork,
    nowHour,
    nowMinutes,
    nowWeak,
    weekProgress,
  } = useTimeInfo({
    workStartTime: '9:00:00',
    workEndTime: '18:00:00',
  });

  const isWorkDay = useMemo(() => {
    return nowWeak <= 5;
  }, [nowWeak]);

  const showOffWork = useMemo(() => {
    if (isWorkDay && nowHour < 18) {
      return (
        <Countdown
          valueStyle={{
            color: '#fff',
          }}
          style={{
            color: '#fff',
          }}
          title={<div className=' text-white -mb-2'>距离下班：</div>}
          value={endWork}
          format='HH:mm:ss:SSS'
        />
      );
    } else {
      return <p className='mb-1'>下班时间，该学习啦~</p>;
    }
  }, [nowWeak, nowHour, nowMinutes]);

  const getMakeMoney = useMemo(() => {
    const oneDayMoney = Number(13000 / 30).toFixed(2);
    if (!isWorkDay) {
      return oneDayMoney;
    }
    if (workProgress <= 100) {
      return ((+oneDayMoney * weekProgress) / 100).toFixed(2);
    }
    return oneDayMoney;
  }, [isWorkDay, workProgress]);

  return (
    <div className='my-1' id='timeNode'>
      <div className='flex items-center'>
        <div className=' flex-grow'>
          {isWorkDay ? (
            <Progress
              percent={workProgress}
              status='active'
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
              format={() => '💴'}
            />
          ) : (
            <Progress
              percent={weekProgress}
              status='active'
              strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
            />
          )}
        </div>
        <div>income：￥{getMakeMoney}</div>
      </div>

      {showOffWork}
      {nowWeak <= 5 ? (
        <Countdown
          valueStyle={{
            color: '#fff',
          }}
          style={{
            color: '#fff',
          }}
          title={<div className=' text-white -mb-2'>距离周末：</div>}
          value={outWork}
          format='D 天 H 时 m 分 s 秒'
        />
      ) : (
        <Countdown
          valueStyle={{
            color: '#fff',
          }}
          style={{
            color: '#fff',
          }}
          title={<div className=' text-white'>周末体验卡剩余时间：</div>}
          value={weekStart}
          format='D 天 H 时 m 分 s 秒'
        />
      )}
    </div>
  );
});
