import { TMessage, TSomeOneMessage, TUser } from '@/types/TSocket';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSocket } from '../useSocket';
import {
  handleReceivePreChatRecordText,
  handleSelfSendPreChatRecordText,
} from './core/chatSomeOne';

type TSocketContext = {
  loginUser?: TUser;
  messageList: TSomeOneMessage[];
  userList: TUser[];
  /**
   * 当前正在聊的用户
   */
  currentChatUser?: TUser;
  setCurrentChatUser?: (user: TUser) => void;
  updateChatMessageList?: (message: TSomeOneMessage) => void;
};

const SocketContext = createContext<TSocketContext>({
  messageList: [],
  userList: [],
});

export function SocketContextProvider({ children }: { children: ReactNode }) {
  const {
    loginUser,
    messageList,
    userList,
    currentChatUser,
    setCurrentChatUser,
    updateChatMessageList,
  } = useChatRoom();

  return (
    <SocketContext.Provider
      value={{
        loginUser,
        messageList,
        userList,
        currentChatUser,
        setCurrentChatUser,
        updateChatMessageList,
      }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  return useContext(SocketContext);
}

export function useChatRoom() {
  const [loginUser, setLoginUser] = useState<TUser>();
  const [currentChatUser, setChatUser] = useState<TUser>();
  const [messageList, setMessageList] = useState<TSomeOneMessage[]>([]);
  const [userList, setUserList] = useState<TUser[]>([]);
  const loginRef = useRef<boolean>(false);

  const socket = useSocket();

  useEffect(() => {
    const handleLogInAndOutMessage = (payload: TMessage) => {
      if (!loginUser?.socketId) {
        setLoginUser(payload.memberInfo);
      }
      setUserList(payload.userList || []);
    };

    const handleSomeOneMessage = (socketData: TSomeOneMessage) => {
      console.log('payload', socketData);
      const _userList = handleReceivePreChatRecordText(socketData, userList);
      if (_userList) {
        setUserList(_userList);
      }
      setMessageList((preList) => [...preList, socketData]);
    };
    if (socket) {
      socket.on('loginAndLogOut', handleLogInAndOutMessage); // 监听消息
      socket.on('someOneMessage', handleSomeOneMessage); // 监听消息
      return () => {
        socket.off();
      };
    }
  }, [socket, loginUser, userList]);

  useEffect(() => {
    if (socket && !loginRef.current) {
      socket.emit('login');
    }
    return () => {
      loginRef.current = true;
    };
  }, [socket]);

  // useEffect(() => {
  //   if (socket && !loginRef.current) {
  //     socket.emit('login');
  //   }
  // }, []);

  useEffect(() => {
    if (document!.getElementById('content')) {
      document!.getElementById('content')!.scrollTop =
        document!.getElementById('content')!.scrollHeight;
    }
  }, [messageList.length]);

  const setCurrentChatUser = (user: TUser) => {
    setChatUser(user);
  };

  const updateChatMessageList = (message: TSomeOneMessage) => {
    const _userList = handleSelfSendPreChatRecordText(message, userList);
    if (_userList) {
      setUserList(_userList);
    }
    setMessageList((preList) => [...preList, message]);
  };

  return {
    loginUser,
    messageList,
    userList,
    currentChatUser,
    setCurrentChatUser,
    updateChatMessageList,
  };
}
