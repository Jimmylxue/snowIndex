import { FC, HTMLAttributes, ReactNode } from 'react';
import './index.less';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
  text: string | ReactNode;
  message: number;
  checked?: boolean;
}

export const MenuItem: FC<TProps> = ({
  icon,
  text,
  message,
  className,
  checked,
  ...args
}) => {
  return (
    <>
      <div
        {...args}
        className='snow_project_menuItem_hover flex justify-between items-center px-2 py-2 rounded-md cursor-pointer '
        style={{
          backgroundColor: checked ? '#eee' : '',
        }}>
        <div className='flex items-center'>
          {icon}
          <span className='ml-2'>{text}</span>
        </div>
        <div>
          <span
            className=' text-xs '
            style={{
              color: '#b1b1b1',
            }}>
            {message}
          </span>
        </div>
      </div>
    </>
  );
};
