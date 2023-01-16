import { memo } from 'react';
import { Input } from 'antd';
import { useSocket } from '@/hooks/useSocket';
import { MESSAGE_TYPE, TUser } from '@/types/TSocket';
const { Search } = Input;

type TProps = {
  user?: TUser;
};

export default memo(({ user }: TProps) => {
  const socket = useSocket();

  return (
    <div className=' w-3/4 mt-5'>
      <Search
        placeholder='input search text'
        allowClear
        enterButton='send'
        size='large'
        onSearch={(text) => {
          const textItem = {
            type: MESSAGE_TYPE.个人消息,
            text,
            createTime: +Date.now(),
            memberInfo: user,
          };
          socket.emit('sendMessage', textItem);
          console.log(textItem);
        }}
      />
    </div>
  );
});
