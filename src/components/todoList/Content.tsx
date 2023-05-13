import { taskListConst } from '@/pages/todoList/mock/const';
import { Button } from 'antd';
import { TaskItem, TaskModal } from './Task';
import { useUserTask } from '@/api/todolist';

type TProps = {
  onEditTask: () => void;
};

export function Content({ onEditTask }: TProps) {
  const { data } = useUserTask('userTask', {
    userId: 1001,
    page: 1,
    pageSize: 15,
  });

  return (
    <div className='content w-full h-full flex justify-center'>
      <div
        className=' h-full'
        style={{
          width: 800,
        }}>
        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>今天</span>
          </div>
          <div>
            {/* <Button
              ghost
              className=' text-gray-500!'
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button>
            <Button
              ghost
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button>
            <Button
              ghost
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button> */}
          </div>
        </div>

        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>5月10号</span>
          </div>
          <div>
            {/* <Button
              ghost
              className=' text-gray-500!'
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button>
            <Button
              ghost
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button>
            <Button
              ghost
              size='small'
              style={{
                color: 'grey',
              }}>
              Default
            </Button>
            <Button type='primary' size='small'>
              Default
            </Button> */}
          </div>
        </div>
        {/* 任务项 */}
        {data?.result?.result?.map((task, index) => (
          <TaskItem
            isComplete={1}
            key={index}
            taskName={task.task_taskName}
            taskType={task.taskType_typeName}
            desc={task.task_taskContent}
            onClick={onEditTask}
          />
        ))}
        <Button
          type='primary'
          className='mt-3'
          loading={true}
          onClick={() => {}}>
          添加任务
        </Button>
      </div>
    </div>
  );
}
