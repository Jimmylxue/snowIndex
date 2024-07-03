import { TSomeOneMessage, TUserV2 } from '@/types/TSocket';
import { parseJson } from './util';
import { cloneDeep } from 'lodash';

/**
 * 拼装系统特有的key
 */
export function getChatKey(userId: number) {
  return `snow-chat-${userId}`;
}

/**
 * 获取聊天记录
 */
export function getChatRecord(userId: number) {
  return (
    parseJson<TSomeOneMessage[]>(
      localStorage.getItem(getChatKey(userId)) || '',
    ) || []
  );
}

/**
 * 存储聊天记录
 */
export function saveChatRecord(userId: number, record: TSomeOneMessage) {
  const historyRecord =
    parseJson<TSomeOneMessage[]>(
      localStorage.getItem(getChatKey(userId)) || '',
    ) || [];
  historyRecord.push(record);
  localStorage.setItem(getChatKey(userId), JSON.stringify(historyRecord));
}

export function getNearChatRecord(userId: number) {
  const chatRecord = getChatRecord(userId);
  return chatRecord?.slice(-1)?.[0]?.text;
}

/**
 * 匹配用户的最新一条聊天记录
 */
export function matchUserChatRecord(userList: TUserV2[]) {
  const _userList = cloneDeep(userList);
  _userList.map((user) => {
    const nearRecord = getNearChatRecord(user.userId);
    user.preChatRecordText = nearRecord;
    return user;
  });
  return _userList;
}
