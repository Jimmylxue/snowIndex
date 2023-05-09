import classNames from 'classnames';
import { TPointInfo } from '../core/type';

type TProps = {
  pointList: TPointInfo[][];
};

export function RenderChess({ pointList }: TProps) {
  return (
    <div className=' absolute'>
      {pointList.map((rowList, rowIndex) => {
        return rowList.map(
          (point, pointIndex) =>
            point.pointStatus !== 'EMPTY' && (
              <div
                className={classNames('rounded-full absolute', {
                  'bg-black': !!(point.pointStatus === 'BLACK'),
                  ' bg-white': !!(point.pointStatus === 'WHITE'),
                })}
                key={`${pointIndex}-${rowIndex}`}
                style={{
                  width: 40,
                  height: 40,
                  left: point.xPx - 40 / 2,
                  top: point.yPx - 40 / 2,
                  boxShadow: `0px 0px 9px ${
                    point.pointStatus === 'BLACK' ? '#fff' : '#eee'
                  }`,
                }}></div>
            ),
        );
      })}
    </div>
  );
}
