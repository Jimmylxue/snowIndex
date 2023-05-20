import { Button, notification } from 'antd';
import { TaskItem } from './Task';
import { TaskItem as Task } from '@/api/todolist/type';
import { TSearchTaskParams } from './SliderBar/SliderBar';
import { getFullTimeByIndex, getTimeTextByIndex } from './utils';
import { useUpdateTask } from '@/api/todolist/task';
import { BellOutlined } from '@ant-design/icons';

type TProps = {
  onEditTask: (type: 'ADD' | 'EDIT') => void;
  taskData: Task[];
  searchParams?: TSearchTaskParams;
  refetchList: () => void;
};

export function Content({
  onEditTask,
  taskData,
  searchParams,
  refetchList,
}: TProps) {
  const { mutateAsync } = useUpdateTask();

  return (
    <div className='content w-full h-full flex justify-center'>
      <div
        className=' h-full'
        style={{
          width: 800,
        }}>
        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {getTimeTextByIndex(searchParams?.timeIndex)}
            </span>
          </div>
        </div>

        <div className=' flex justify-between items-center py-1'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {getFullTimeByIndex(searchParams?.timeIndex)}
            </span>
          </div>
        </div>

        <div className=' flex justify-between items-center py-1 mb-2'>
          <div className='flex items-center'>
            <span className=' text-lg font-bold'>
              {searchParams?.status === 1 ? '已完成' : '未完成'}
            </span>
          </div>
        </div>
        {/* 任务项 */}
        {/* {data?.result?.result?.map((task, index) => ( */}
        {taskData?.map((task, index) => (
          <TaskItem
            isComplete={task.status}
            key={index}
            taskName={task.taskName}
            taskType={task.typeMessage?.typeName}
            desc={task.taskContent}
            onClick={() => onEditTask('EDIT')}
            onCompleteTask={async (status) => {
              const res = await mutateAsync({
                userId: 1001,
                status: !!status ? 1 : 0,
                taskId: task.taskId,
              });
              refetchList();
              if (res.code === 200) {
                notification.info({
                  message: `任务已完成`,
                  description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                  placement: 'bottomLeft',
                  icon: <BellOutlined />,
                });
              }
            }}
          />
        ))}
        <Button
          type='primary'
          className='mt-3'
          // loading={true}
          onClick={() => {
            onEditTask('ADD');
          }}>
          添加任务
        </Button>
      </div>
    </div>
  );
}
