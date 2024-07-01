import { TSomeOneMessage } from '@/types/TSocket';
import { parseJson } from './util';

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
