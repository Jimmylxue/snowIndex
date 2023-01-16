import React, { memo, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export default memo(({ children }: TProps) => {
  return <div className='content h-5/6 w-3/4 bg-red-200 px-5'>{children}</div>;
});
