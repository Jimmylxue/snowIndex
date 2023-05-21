export type TUserLoginParams = {
  phone: number;
  password: number;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status: number;
};
