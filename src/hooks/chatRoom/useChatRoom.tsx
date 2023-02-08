import { MESSAGE_TYPE, TMessage, TUser } from '@/types/TSocket';
import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../useSocket';

export function useChatRoom() {
  const [loginUser, setLoginUser] = useState<TUser>();
  const [messageList, setMessageList] = useState<TMessage[]>([]);
  const [userList, setUserList] = useState<TUser[]>([]);
  const loginRef = useRef<boolean>(false);

  const socket = useSocket();

  useEffect(() => {
    const handleMessage = (payload: TMessage) => {
      const { type } = payload;
      switch (type) {
        case MESSAGE_TYPE.登录登出消息:
          if (!loginUser?.socketId) {
            setLoginUser(payload.memberInfo);
          }
      }
      setMessageList((list) => [...list, payload]);
      setUserList(payload.userList || []);
    };
    if (socket) {
      socket.on('message', handleMessage); // 监听消息
      return () => {
        socket.off('message', handleMessage);
      };
    }
  }, [socket, loginUser]);

  useEffect(() => {
    if (socket && !loginRef.current) {
      socket.emit('login');
    }
    return () => {
      loginRef.current = true;
    };
  }, [socket]);

  useEffect(() => {
    document!.getElementById('content')!.scrollTop =
      document!.getElementById('content')!.scrollHeight;
  }, [messageList.length]);

  return {
    loginUser,
    messageList,
    userList,
  };
}
