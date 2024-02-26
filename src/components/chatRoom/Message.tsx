import { MESSAGE_TYPE, TMessage, TUser } from '@/types/TSocket';
import moment from 'moment';
import { memo } from 'react';

type TProps = {
  message: TMessage;
  loginUser?: TUser;
};

export default memo(({ message, loginUser }: TProps) => {
  const { type } = message;

  const isMe = message.memberInfo.socketId === loginUser?.socketId;

  if (type === MESSAGE_TYPE.登录登出消息) {
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
          {message.memberInfo?.name}
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
        src={message?.memberInfo?.avatar}
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
        src={message?.memberInfo?.avatar}
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
          {message.memberInfo?.name}
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
