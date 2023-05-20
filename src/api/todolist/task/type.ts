export type TAddTaskParams = {
  userId?: number;
  typeId: number;
  taskName: string;
  taskContent: string;
};

export type TUpdateTaskParams = {
  userId?: number;
  taskId: number;
  status: number;
};
