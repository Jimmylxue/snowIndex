import { memo, useState } from 'react';
import { Input } from 'antd';
import { useSocket } from '@/hooks/useSocket';
import { MESSAGE_TYPE, TUser } from '@/types/TSocket';
const { Search } = Input;

type TProps = {
  user?: TUser;
};

export default memo(({ user }: TProps) => {
  const [text, setText] = useState('');
  const socket = useSocket();

  return (
    <div className=' w-3/4 mt-5'>
      <Search
        placeholder='input search text'
        allowClear
        enterButton='发送'
        size='large'
        value={text}
        onSearch={(text) => {
          if (!text) {
            return;
          }
          const textItem = {
            type: MESSAGE_TYPE.个人消息,
            text,
            createTime: +Date.now(),
            memberInfo: user,
          };
          socket.emit('sendMessage', textItem);
          setText('');
        }}
        onInput={(e) => {
          // @ts-ignore
          setText(e.nativeEvent.value);
        }}
      />
    </div>
  );
});
