import classNames from 'classnames';
import { MenuItem } from './MenuItem';
import { useEffect, useState } from 'react';
import { SButton } from '../Button';
import {
  PlusOutlined,
  SlackOutlined,
  CarryOutOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { TaskTypeModal } from '../Task/TaskTypeModal';
import { useAddTaskType } from '@/api/todolist/taskType';
import { message } from 'antd';
import { getStatusByIndex, getTaskTypeByIndex, getTimeByIndex } from './core';
import dayjs from 'dayjs';

export type TSearchTaskParams = {
  taskType: number;
  status: number;
  startTime: number;
  endTime: number;
};

type TProps = {
  menuShow: boolean;
  onSearchChange: (params: TSearchTaskParams) => void;
};

export function SliderBar({ menuShow, onSearchChange }: TProps) {
  const taskTypeListConst = [
    {
      typeName: '工作',
      taskType: 1001,
    },
    {
      typeName: '家庭',
      taskType: 1002,
    },
    {
      typeName: '健身',
      taskType: 1003,
    },
  ];

  const taskStatusListConst = [
    {
      statusName: '未完成',
    },
    {
      statusName: '已完成',
    },
  ];

  const menuListConst = [
    {
      icon: (
        <CarryOutOutlined
          className='text-lg flex flex-shrink-0'
          style={{
            color: '#3a8335',
          }}
        />
      ),
      text: '今天',
      message: 3,
    },
    {
      icon: (
        <CarryOutOutlined
          className='text-lg flex flex-shrink-0'
          style={{
            color: '#3a8335',
          }}
        />
      ),
      text: '昨天',
      message: 2,
    },
    {
      icon: (
        <CarryOutOutlined
          className='text-lg flex flex-shrink-0'
          style={{
            color: '#3a8335',
          }}
        />
      ),
      text: '近7天',
      message: 2,
    },
  ];

  const [timeIndex, setTimeIndex] = useState<number>(0);
  const [taskTypeIndex, setTaskTypeIndex] = useState<number>(0);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);
  const [taskTypeModalShow, setTaskTypeModalShow] = useState<boolean>(false);

  const { data, mutateAsync } = useAddTaskType();

  useEffect(() => {
    if (data?.code === 200) {
      message.success('任务添加成功');
    }
  }, [data]);

  useEffect(() => {
    console.log('aaaaa', dayjs().subtract(1, 'day').startOf('D').valueOf());
    // console.log('aaaaa', dayjs().endOf('D').valueOf());
  }, []);

  useEffect(() => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const { status } = getStatusByIndex(taskStatusIndex);
    const { taskType } = getTaskTypeByIndex(taskTypeIndex, taskTypeListConst);

    const params = {
      taskType,
      status,
      startTime,
      endTime,
    };

    onSearchChange(params);
    // getTimeByIndex(timeIndex);
  }, [timeIndex, taskStatusIndex, taskTypeIndex]);

  return (
    <div
      className={classNames('whitespace-nowrap overflow-hidden flex-shrink-0', {
        sliderBarShow: menuShow,
        sliderBarClose: !menuShow,
      })}>
      <div className='w-full px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-base mb-1'>日期</div>
          {/* <SButton
            className='ml-2 cursor-pointer'
            icon={<PlusOutlined className=' flex text-sm flex-shrink-0' />}
            onClick={() => {
              setTaskTypeModalShow(true);
            }}
          /> */}
        </div>
        {menuListConst.map((menu, index) => (
          <MenuItem
            key={index}
            checked={index === timeIndex}
            icon={menu.icon}
            text={menu.text}
            message={menu.message}
            onClick={() => {
              setTimeIndex(index);
            }}
          />
        ))}
      </div>

      <div className='w-full px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-base mb-1'>状态</div>
          {/* <SButton
            className='ml-2 cursor-pointer'
            icon={<PlusOutlined className=' flex text-sm flex-shrink-0' />}
            onClick={() => {
              setTaskTypeModalShow(true);
            }}
          /> */}
        </div>
        {taskStatusListConst.map((status, index) => (
          <MenuItem
            key={index}
            checked={index === taskStatusIndex}
            icon={
              <BulbOutlined
                className='text-lg '
                style={{
                  color: '#3a8335',
                }}
              />
            }
            text={status.statusName}
            message={2}
            onClick={() => {
              setTaskStatusIndex(index);
            }}
          />
        ))}
      </div>

      <div className='px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-base mb-1'>项目</div>
          <SButton
            className='ml-2 cursor-pointer'
            icon={<PlusOutlined className=' flex text-sm flex-shrink-0' />}
            onClick={() => {
              setTaskTypeModalShow(true);
            }}
          />
        </div>
        <div>
          {taskTypeListConst.map((taskType, index) => (
            <MenuItem
              key={index}
              showEdit={true}
              checked={index === taskTypeIndex}
              icon={
                <SlackOutlined
                  className='text-lg '
                  style={{
                    color: '#3a8335',
                  }}
                />
              }
              text={taskType.typeName}
              message={3}
              onClick={() => {
                setTaskTypeIndex(index);
                // setMenuIndex(index);
              }}
              onEdit={() => {
                setTaskTypeModalShow(true);
              }}
            />
          ))}
        </div>
      </div>

      <TaskTypeModal
        show={taskTypeModalShow}
        onOk={async () => {
          setTaskTypeModalShow(false);
          // await mutateAsync({
          //   typeName: '111',
          //   desc: '222',
          //   userId: 1001,
          // });
          message.success('任务添加成功');
        }}
        onCancel={() => {
          setTaskTypeModalShow(false);
        }}
      />
    </div>
  );
}
