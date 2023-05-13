export type TaskType = {
  typeId: number;
  userId: number;
  typeName: string;
  desc: string;
  createTime: string;
  updateTime: string;
};

export type TaskItem = {
  task_taskId: number;
  task_userId: number;
  task_typeId: number;
  task_status: 1 | 0;
  task_taskName: string;
  task_taskContent: string;
  task_completeTime: string;
  task_createTime: string;
  task_updateTime: string;
  taskType_typeName: string;
};
