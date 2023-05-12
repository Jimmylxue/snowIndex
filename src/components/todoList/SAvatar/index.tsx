import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import { getUserFirstName } from './core';

interface Props extends HTMLAttributes<HTMLDivElement> {
  avatar?: string;
  userName: string;
}

export const Avatar: FC<Props> = ({ avatar, userName, ...args }) => {
  /**
   * todo:
   *  替换成 判断 链接 是否是一个 可访问的链接
   */
  return (
    <div
      {...args}
      style={{
        width: 28,
        height: 28,
      }}
      className={classNames(
        'rounded-full overflow-hidden  flex justify-center items-center flex-shrink-0 cursor-pointer',
        {
          'bg-green-600': !avatar,
        },
      )}>
      {avatar ? (
        <img src={avatar} alt='' className=' w-full h-full' />
      ) : (
        <span>{getUserFirstName(userName)}</span>
      )}
    </div>
  );
};
