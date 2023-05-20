import { Content, NavBar, TaskModal } from '@/components/todoList';
import { useState } from 'react';
import './index.less';
import {
  SliderBar,
  TSearchTaskParams,
} from '@/components/todoList/SliderBar/SliderBar';
import { TodoListProvider } from '@/hooks/todolist/useTodolist';
import { useUserTask } from '@/api/todolist';

export function TodoList() {
  const [menuShow, setMenuShow] = useState<boolean>(true);
  const [taskModalShow, setTaskModalShow] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<TSearchTaskParams>();

  const { data, refetch } = useUserTask(
    ['userTask', searchParams],
    {
      userId: 1001,
      page: 1,
      pageSize: 15,
      status: searchParams?.status,
      startTime: searchParams?.startTime,
      endTime: searchParams?.endTime,
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!searchParams?.startTime,
    },
  );

  return (
    <TodoListProvider>
      <div className=' w-screen h-screen flex flex-col'>
        <NavBar
          onMenuClick={() => {
            setMenuShow((status) => !status);
          }}
          onAddTask={() => {
            setTaskModalShow(true);
          }}
        />
        <div className=' w-full flex flex-grow'>
          <SliderBar
            menuShow={menuShow}
            onSearchChange={(searchParams) => {
              setSearchParams(searchParams);
              // refetch();
            }}
          />
          <Content
            searchParams={searchParams}
            taskData={data?.result?.result || []}
            onEditTask={() => {
              setTaskModalShow(true);
            }}
            refetchList={refetch}
          />
        </div>
        <TaskModal
          show={taskModalShow}
          onCancel={() => {
            setTaskModalShow(false);
          }}
          onOk={() => {
            refetch();
            setTaskModalShow(false);
          }}
        />
      </div>
    </TodoListProvider>
  );
}
