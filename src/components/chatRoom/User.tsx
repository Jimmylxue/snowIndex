import { TUser } from '@/types/TSocket';
import { memo } from 'react';

type TProps = {
  user: TUser;
  showChatRecord?: boolean;
};

export default memo(({ user, showChatRecord = false }: TProps) => {
  return (
    <div className=' flex items-center py-2'>
      <img
        src={user.avatar}
        alt=''
        style={{
          width: 40,
          height: 40,
        }}
        className='border-r-2 overflow-hidden rounded flex-shrink-0'
      />
      <div className=''>
        <div className='ml-2 truncate w-[170px]'>{user.name}</div>
        {showChatRecord && user.preChatRecordText && (
          <div className='ml-2 truncate w-[170px]'>
            {user.preChatRecordText}
          </div>
        )}
      </div>
    </div>
  );
});
