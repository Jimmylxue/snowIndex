import { memo, useState } from 'react';
import { Input } from 'antd';
import { useSocket } from '@/hooks/useSocket';
import { MESSAGE_TYPE, TUser } from '@/types/TSocket';
import { useSocketContext } from '@/hooks/chatRoom/useChatRooV2';
const { Search } = Input;

type TProps = {};

export default memo(({}: TProps) => {
  const { currentChatUser, loginUser, updateChatMessageList } =
    useSocketContext();
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
            type: MESSAGE_TYPE.个人消息 as any,
            text,
            createTime: +Date.now(),
            toSocketId: currentChatUser?.socketId!,
            fromSocketId: loginUser?.socketId!,
          };
          updateChatMessageList?.(textItem);
          socket.emit('sendSomeOneMessage', textItem);
          setText('');
        }}
        onInput={(e) => {
          // @ts-ignore
          setText(e.target.value);
        }}
      />
    </div>
  );
});
