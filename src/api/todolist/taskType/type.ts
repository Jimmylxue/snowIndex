export type TAddTaskTypeParams = {
  typeName: string;
  desc: string;
};

export type TDelTaskTypeParams = {
  typeId: number;
};

export type TUpdateTaskTypeParams = TAddTaskTypeParams & TDelTaskTypeParams;
