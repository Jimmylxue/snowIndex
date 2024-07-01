import { useSocketContext } from '@/hooks/chatRoom/useChatRooV2';
import User from './User';
import classNames from 'classnames';

export function UserList() {
  const { userList, currentChatUser, setCurrentChatUser, loginUser } =
    useSocketContext();
  return (
    <div className=' overflow-auto h-fit px-2 flex-grow'>
      {userList.map(
        (user, index) =>
          user.socketId !== loginUser?.socketId && (
            <div
              key={index}
              className={classNames(' px-2 box-border', {
                ' bg-[#437eb4]': user.socketId === currentChatUser?.socketId,
              })}
              onClick={() => {
                setCurrentChatUser?.(user);
              }}>
              <User showChatRecord user={user} />
            </div>
          ),
      )}
    </div>
  );
}
