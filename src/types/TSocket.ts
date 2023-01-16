export type TUser = {
  socketId: string;
  name: string;
  avatar: string;
};

export enum MESSAGE_TYPE {
  '登录登出消息',
  '系统消息',
  '个人消息',
}

export type TMessage = {
  type: MESSAGE_TYPE;
  text: string;
  createTime: string;
  memberInfo: TUser;
};
