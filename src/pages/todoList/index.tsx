import { Content, NavBar, TaskModal } from '@/components/todoList';
import { useState } from 'react';
import './index.less';
import { SliderBar } from '@/components/todoList/SliderBar/SliderBar';
import { TodoListProvider } from '@/hooks/todolist/useTodolist';

export function TodoList() {
  const [menuShow, setMenuShow] = useState<boolean>(true);
  const [taskModalShow, setTaskModalShow] = useState<boolean>(false);

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
          <SliderBar menuShow={menuShow} />
          <Content
            onEditTask={() => {
              setTaskModalShow(true);
            }}
          />
        </div>
        <TaskModal
          show={taskModalShow}
          onCancel={() => {
            setTaskModalShow(false);
          }}
          onOk={() => {
            setTaskModalShow(false);
          }}
        />
      </div>
    </TodoListProvider>
  );
}
