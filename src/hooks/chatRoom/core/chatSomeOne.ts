import { TSomeOneMessage, TUserV2 } from '@/types/TSocket';
import { cloneDeep } from 'lodash';

function findUserItemByFromSocketId(userId: number, userList: TUserV2[]) {
  const index = userList.findIndex((user) => user.userId === userId);
  return { user: userList[index], userIndex: index };
}

/**
 * 接受到socket消息时 处理 用户列表的最近聊天记录
 */
export function handleReceivePreChatRecordText(
  socketData: TSomeOneMessage,
  userList: TUserV2[],
) {
  const fromUserId = socketData.fromUserId;

  const { user, userIndex } = findUserItemByFromSocketId(fromUserId, userList);

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
  userList: TUserV2[],
) {
  const toUserId = socketData.toUserId;

  const { user, userIndex } = findUserItemByFromSocketId(toUserId, userList);

  if (user) {
    const _userList = cloneDeep(userList);
    _userList[userIndex].preChatRecordText = socketData.text;
    return _userList;
  }
}
