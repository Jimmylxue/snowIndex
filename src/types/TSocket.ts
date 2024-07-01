export type TUser = {
  socketId: string;
  name: string;
  avatar: string;
};

export type TUserV2 = {
  socketId: string;
  name: string;
  avatar: string;
  userId: number;
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

export type TMessageV2 = {
  type: MESSAGE_TYPE;
  text: string;
  createTime: string;
  memberInfo: TUserV2;
  userList: TUserV2[];
};

export type TSomeOneMessage = {
  type: MESSAGE_TYPE.个人消息;
  text: string;
  createTime: number;
  toUserId: number;
  fromUserId: number;
};
