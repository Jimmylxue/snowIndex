export type TUser = {
  socketId: string;
  name: string;
  avatar: string;
  /**
   * 最近的一条聊天记录
   */
  preChatRecordText?: string;
};

export enum MESSAGE_TYPE {
  '登录消息',
  '登出消息',
  '系统消息',
  '个人消息',
}

export type TMessage = {
  type: MESSAGE_TYPE;
  text: string;
  createTime: string;
  memberInfo: TUser;
  userList: TUser[];
};

export type TSomeOneMessage = {
  type: MESSAGE_TYPE.个人消息;
  text: string;
  createTime: number;
  toSocketId: string;
  fromSocketId: string;
};
