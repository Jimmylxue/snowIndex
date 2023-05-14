import { useTaskType } from '@/api/todolist';
import { TaskType } from '@/api/todolist/type';
import { FC, ReactNode, createContext, useContext, useState } from 'react';

type TodoListInfo = {
  taskType?: TaskType[];
};

export const TodoListContext = createContext<TodoListInfo>({});

type TProps = {
  children: ReactNode;
};

export const TodoListProvider: FC<TProps> = (props) => {
  const [taskListInfo, setTaskListInfo] = useState<TodoListInfo>({
    taskType: undefined,
  });

  useTaskType(
    'taskType',
    {
      userId: 1001,
      // todo: 将 写死的userId 替换成 真正的用户id
    },
    {
      refetchOnWindowFocus: false,
      onSuccess(data) {
        setTaskListInfo((info) => ({ ...info, taskType: data?.result }));
      },
    },
  );

  return (
    <TodoListContext.Provider value={taskListInfo!}>
      {props.children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => {
  return useContext(TodoListContext);
};
