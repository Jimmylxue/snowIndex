export type TUserLoginParams = {
  phone: string;
  password: string;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status: number;
};
