export type TAddTaskParams = {
  userId?: number;
  typeId: number;
  taskName: string;
  taskContent: string;
};

export type TUpdateTaskStatusParams = {
  userId?: number;
  taskId: number;
  status?: number;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status?: number;
  taskName?: string;
  taskContent?: string;
  typeId?: number;
};

export type TDelTaskParams = {
  taskId: number;
};
