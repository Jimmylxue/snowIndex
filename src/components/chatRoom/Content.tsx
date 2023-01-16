import React, { memo, ReactNode } from 'react';

type TProps = {
  children: ReactNode;
};

export default memo(({ children }: TProps) => {
  return (
    <div id='content' className='h-5/6 w-3/4  px-5 overflow-auto'>
      {children}
    </div>
  );
});
