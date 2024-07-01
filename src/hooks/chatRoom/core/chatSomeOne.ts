import { TSomeOneMessage, TUser } from '@/types/TSocket';
import { cloneDeep } from 'lodash';

function findUserItemByFromSocketId(socketId: string, userList: TUser[]) {
  const index = userList.findIndex((user) => user.socketId === socketId);
  return { user: userList[index], userIndex: index };
}

/**
 * 接受到socket消息时 处理 用户列表的最近聊天记录
 */
export function handleReceivePreChatRecordText(
  socketData: TSomeOneMessage,
  userList: TUser[],
) {
  const fromSocketId = socketData.fromSocketId;

  const { user, userIndex } = findUserItemByFromSocketId(
    fromSocketId,
    userList,
  );

  if (user) {
    const _userList = cloneDeep(userList);
    _userList[userIndex].preChatRecordText = socketData.text;
    return _userList;
  }
}

/**
 * 自己发送socket消息时 处理 用户列表的最近聊天记录
 */
export function handleSelfSendPreChatRecordText(
  socketData: TSomeOneMessage,
  userList: TUser[],
) {
  const toSocketId = socketData.toSocketId;

  const { user, userIndex } = findUserItemByFromSocketId(toSocketId, userList);

  if (user) {
    const _userList = cloneDeep(userList);
    _userList[userIndex].preChatRecordText = socketData.text;
    return _userList;
  }
}
