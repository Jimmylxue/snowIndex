import { useSocketContext } from '@/hooks/chatRoom/useChatRooV2';
import { MESSAGE_TYPE, TSomeOneMessage } from '@/types/TSocket';
import moment from 'moment';
import { memo } from 'react';

type TProps = {
  message: TSomeOneMessage;
};

export default memo(({ message }: TProps) => {
  const { type } = message;
  const { loginUser, currentChatUser } = useSocketContext();

  /**
   * 是否是自己发的信息
   */
  const isMe = message.fromSocketId === loginUser?.socketId;

  if ([MESSAGE_TYPE.登录消息, MESSAGE_TYPE.登出消息].includes(type)) {
    return (
      <div className=' flex justify-center items-center my-2 text-gray-500'>
        {message.text}
      </div>
    );
  }

  return isMe ? (
    <div className='message flex items-start my-5 justify-end'>
      <div className=' flex flex-col items-end mr-3'>
        <div
          className=' ml-3 text-xs mb-1'
          style={{
            color: '#e9e9ef',
          }}>
          {loginUser?.name}
        </div>
        <div
          className='flex items-center px-4 ml-3 w-fit py-2 rounded'
          style={{
            backgroundColor: '#2980b9',
            // minHeight: 50,
          }}>
          {message.text}
        </div>
        <p className='ml-3 text-xs mt-1'>
          {moment(message.createTime).format('YYYY-MM-DD, h:mm:ss a')}
        </p>
      </div>
      <img
        className=' rounded'
        src={loginUser?.avatar}
        alt='user'
        style={{
          width: 50,
          height: 50,
        }}
      />
    </div>
  ) : (
    <div className='message flex items-start my-5'>
      <img
        className=' rounded'
        src={currentChatUser?.avatar}
        alt='user'
        style={{
          width: 50,
          height: 50,
        }}
      />
      <div>
        <div
          className=' ml-3 text-xs mb-1'
          style={{
            color: '#e9e9ef',
          }}>
          {currentChatUser?.name}
        </div>
        <div
          className='flex items-center px-4 ml-3 w-fit py-2 rounded'
          style={{
            backgroundColor: '#2980b9',
            // minHeight: 50,
          }}>
          {message.text}
        </div>
        <p className='ml-3 text-xs mt-1'>
          {moment(message.createTime).format('YYYY-MM-DD, h:mm:ss a')}
        </p>
      </div>
    </div>
  );
});
