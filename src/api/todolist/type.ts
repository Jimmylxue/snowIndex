export type TaskType = {
  typeId: number;
  userId: number;
  typeName: string;
  desc: string;
  createTime: string;
  updateTime: string;
};

export type TaskItem = {
  taskId: number;
  userId: number;
  typeId: number;
  status: 1 | 0;
  taskName: string;
  taskContent: string;
  completeTime: string;
  createTime: string;
  updateTime: string;
  typeMessage: TaskType;
};
