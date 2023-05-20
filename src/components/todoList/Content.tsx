import React from 'react';
import { Button } from 'antd';
import { TaskItem } from './Task';
import { TaskItem as Task } from '@/api/todolist/type';

type TProps = {
  onEditTask: () => void;
  taskData: Task[];
};

export function Content({ onEditTask, taskData }: TProps) {
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
        {/* {data?.result?.result?.map((task, index) => ( */}
        {taskData?.map((task, index) => (
          <TaskItem
            isComplete={1}
            key={index}
            taskName={task.taskName}
            taskType={task.typeMessage?.typeName}
            desc={task.taskContent}
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
