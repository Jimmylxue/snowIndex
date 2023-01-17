import Content from '@/components/chatRoom/Content';
import Message from '@/components/chatRoom/Message';
import SendBox from '@/components/chatRoom/SendBox';
import User from '@/components/chatRoom/User';
import { useSocket } from '@/hooks/useSocket';
import { MESSAGE_TYPE, TMessage, TUser } from '@/types/TSocket';
import { Button } from 'antd';
import { memo, useEffect, useState } from 'react';

export default memo(() => {
  useEffect(() => {
    console.log('mmm');
  }, []);

  const socket = useSocket();
  const [loginUser, setLoginUser] = useState<TUser>();
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const [userList, setUserList] = useState<TUser[]>([]);

  useEffect(() => {
    const handleMessage = (payload: TMessage) => {
      const { type } = payload;
      switch (type) {
        case MESSAGE_TYPE.登录登出消息:
          if (!loginUser?.socketId) {
            console.log('sdssddd');
            setLoginUser(payload.memberInfo);
          }
        // return;
      }
      setMessageList((list) => [...list, payload]);
      setUserList(payload.userList || []);
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
    console.log(socket);
    if (socket) {
      socket.emit('login');
    }
  }, []);

  useEffect(() => {
    const beforeunload = () => {
      localStorage.setItem('sss', 'abc~~');
      socket.emit('logout');
    };
    window.addEventListener('beforeunload', beforeunload);
  }, [socket]);

  useEffect(() => {
    document!.getElementById('content')!.scrollTop =
      document!.getElementById('content')!.scrollHeight;
  }, [messageList.length]);

  return (
    <div
      className=' w-full h-screen flex text-white'
      style={{
        backgroundColor: '#343540',
      }}>
      <div className='slider w-1/5 relative pb-14 overflow-hidden flex flex-col'>
        <div className=' flex flex-col justify-center items-center m-1'>
          <img
            src='https://img1.baidu.com/it/u=4050463138,1499422748&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1673974800&t=db34835adc90ef962e8848d96deb5683'
            alt=''
          />
          <span
            className=' text-lg my-2'
            onClick={() => {
              socket.emit('logout');
            }}>
            吉米小黑屋
          </span>
        </div>
        <div className=' overflow-auto h-fit'>
          {userList.map((user, index) => (
            <User user={user} key={index} />
          ))}
        </div>

        <Button
          type='link'
          className=' w-full absolute bottom-4'
          style={{
            background: 'none',
          }}>
          back snowIndex
        </Button>
      </div>
      <div
        className='context w-full  flex flex-col items-center justify-center'
        style={{
          backgroundColor: '#2e2f38',
        }}>
        <p className='-mt-4'>
          如果觉得不错 👍，给个{' '}
          <a
            className=' text-blue-500'
            href='https://github.com/Jimmylxue/snowIndex'>
            star
          </a>{' '}
          ⭐ 吧，你的认可是我最大的动力 ！
        </p>
        <Content>
          {messageList.map((message, index) => (
            <Message message={message} key={index}></Message>
          ))}
        </Content>
        <SendBox user={loginUser}></SendBox>
        <p className='mt-2'>吉米小黑屋 - 如有侵权联系我删除</p>
        <div className=' flex -mb-5'>
          <a className='mx-2' href='https://github.com/Jimmylxue/snowIndex'>
            github
          </a>
          <a className='mx-2' href='http://www.jimmyxuexue.top/'>
            知识星球
          </a>
        </div>
      </div>
    </div>
  );
});
