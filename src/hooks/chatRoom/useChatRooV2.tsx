import { TMessageV2, TSomeOneMessage, TUser, TUserV2 } from '@/types/TSocket';
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
import {
  getChatRecord,
  matchUserChatRecord,
  saveChatRecord,
} from './core/chatHistory';

type TSocketContext = {
  loginUser?: TUserV2;
  messageList: TSomeOneMessage[];
  userList: TUserV2[];
  /**
   * 当前正在聊的用户
   */
  currentChatUser?: TUserV2;
  setCurrentChatUser?: (user: TUserV2) => void;
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
  const [loginUser, setLoginUser] = useState<TUserV2>();
  const [currentChatUser, setChatUser] = useState<TUserV2>();
  const [messageList, setMessageList] = useState<TSomeOneMessage[]>([]);
  const [userList, setUserList] = useState<TUserV2[]>([]);
  const loginRef = useRef<boolean>(false);

  const socket = useSocket();

  useEffect(() => {
    const handleLogInAndOutMessage = (payload: TMessageV2) => {
      if (!loginUser?.socketId) {
        setLoginUser(payload.memberInfo);
      }
      const _userList = matchUserChatRecord(payload.userList);
      setUserList(_userList || []);
    };

    const handleSomeOneMessage = (socketData: TSomeOneMessage) => {
      console.log('payload', socketData);
      const _userList = handleReceivePreChatRecordText(socketData, userList);
      if (_userList) {
        setUserList(_userList);
      }
      setMessageList((preList) => [...preList, socketData]);
      saveChatRecord(socketData.fromUserId, socketData);
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
    // setUserList(_userList);
  }, [userList]);

  useEffect(() => {
    if (socket && !loginRef.current) {
      socket.emit('login');
    }
    return () => {
      loginRef.current = true;
    };
  }, [socket]);

  useEffect(() => {
    if (currentChatUser?.userId) {
      const historyChatRecord = getChatRecord(currentChatUser?.userId);
      setMessageList(historyChatRecord);
    }
  }, [currentChatUser]);

  useEffect(() => {
    if (document!.getElementById('content')) {
      document!.getElementById('content')!.scrollTop =
        document!.getElementById('content')!.scrollHeight;
    }
  }, [messageList.length]);

  const setCurrentChatUser = (user: TUserV2) => {
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
