import Content from '@/components/chatRoom/Content';
import Message from '@/components/chatRoom/Message';
import SendBox from '@/components/chatRoom/SendBox';
import User from '@/components/chatRoom/User';
import { useSocket } from '@/hooks/useSocket';
import { MESSAGE_TYPE, TMessage, TUser } from '@/types/TSocket';
import { memo, useEffect, useState } from 'react';

export default memo(() => {
  const socket = useSocket();
  const [loginUser, setLoginUser] = useState<TUser>();
  const [messageList, setMessageList] = useState<TMessage[]>([]);

  useEffect(() => {
    const handleMessage = (payload: TMessage) => {
      const { type } = payload;
      switch (type) {
        case MESSAGE_TYPE.登录登出消息:
          if (!loginUser?.socketId) {
            console.log('sdssddd');
            setLoginUser(payload.memberInfo);
          }
          return;
      }
      setMessageList((list) => [...list, payload]);
    };
    if (socket) {
      socket.on('message', handleMessage); // 监听消息
      return () => {
        // componentWillUnmount
        socket.off('message', handleMessage);
      };
    }
  }, [socket, loginUser]);

  useEffect(() => {
    if (socket) {
      socket.emit('login');
    }
  }, [socket]);

  return (
    <div
      className=' w-full h-screen flex text-white'
      style={{
        backgroundColor: '#343540',
      }}>
      <div className='slider w-1/5'>
        <div className=' flex flex-col justify-center items-center m-1'>
          <img
            src='https://img1.baidu.com/it/u=4050463138,1499422748&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1673974800&t=db34835adc90ef962e8848d96deb5683'
            alt=''
          />
          <span className=' text-lg my-2'>吉米小黑屋</span>
        </div>
        <User></User>
        <User></User>
        <User></User>
      </div>
      <div className='context w-full bg-yellow-50 flex flex-col items-center justify-center'>
        <Content>
          {messageList.map((message, index) => (
            <Message message={message} key={index}></Message>
          ))}
        </Content>
        <SendBox user={loginUser}></SendBox>
      </div>
    </div>
  );
});
