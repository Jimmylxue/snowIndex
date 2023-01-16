import { memo } from 'react';

export default memo(() => {
  return (
    <div className=' flex items-center my-3'>
      <img
        src='https://img1.baidu.com/it/u=1946903352,2290082009&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1673974800&t=2dc80dbf094b7c98f33eed47b32b57d8'
        alt=''
        style={{
          width: 40,
          height: 40,
        }}
        className='border-r-2 overflow-hidden'
      />
      <span className='ml-2'>三岁就很酷</span>
    </div>
  );
});
