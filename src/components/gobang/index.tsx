import { Button } from 'antd';
import { useEffect } from 'react';
import { Layout, RenderChess } from './component';
import { useGame } from './core/useGame';

export function Gobang() {
  const { twoDiffPointList, playChess, winner, rePlay } = useGame();
  const clickFn: JSX.IntrinsicElements['div']['onClick'] = (e) => {
    const clickPosition = {
      xPx: e.nativeEvent.offsetX,
      yPx: e.nativeEvent.offsetY,
    };
    // @ts-ignore
    if ([...e.target.classList].includes('absolute')) {
      // @ts-ignore
      clickPosition.xPx = e.nativeEvent.layerX;
      // @ts-ignore
      clickPosition.yPx = e.nativeEvent.layerY;
    }

    console.log({ x: clickPosition.xPx, y: clickPosition.yPx });
    playChess(clickPosition);
  };

  useEffect(() => {
    if (winner) {
      alert(`${winner}赢了`);
      rePlay();
    }
  }, [winner]);

  return (
    <div className='flex items-center'>
      <div
        className='relative'
        style={{
          width: 750,
          height: 750,
          marginTop: 50,
          marginLeft: 100,
          zIndex: 100,
        }}>
        <div className=' w-full h-full' onClick={clickFn}>
          <Layout />
          <RenderChess pointList={twoDiffPointList} />
        </div>
      </div>
      <div className='ml-10'>
        <Button type='primary' onClick={rePlay}>
          replay
        </Button>
        <h4 className=' text-white mt-3'>
          如果觉得不错 👍，给个{' '}
          <a href='https://github.com/Jimmylxue/daily-store/tree/master/packages/snowweb/src/components/gobang'>
            star
          </a>{' '}
          ⭐ 吧，你的认可是我最大的动力 ！
        </h4>
      </div>
    </div>
  );
}
