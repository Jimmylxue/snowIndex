import { TUser } from '@/types/TSocket';
import { memo } from 'react';

type TProps = {
  user: TUser;
};

export default memo(({ user }: TProps) => {
  return (
    <div className=' flex items-center my-3'>
      <img
        src={user.avatar}
        alt=''
        style={{
          width: 40,
          height: 40,
        }}
        className='border-r-2 overflow-hidden'
      />
      <span className='ml-2'>{user.name}</span>
    </div>
  );
});
