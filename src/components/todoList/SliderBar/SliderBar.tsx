import React, { useCallback, useRef } from 'react';
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
import { message, DatePicker } from 'antd';
import {
  getStatusByIndex,
  getTaskTypeByIndex,
  getTimeByIndex,
  getTimeStringByDate,
} from './core';
import dayjs from 'dayjs';
import { useTodoList } from '@/hooks/todolist/useTodolist';

const { RangePicker } = DatePicker;

export type TSearchTaskParams = {
  taskType: number;
  status: number;
  startTime: number;
  endTime: number;
  timeIndex: number;
};

type TProps = {
  menuShow: boolean;
  onSearchChange: (params: TSearchTaskParams) => void;
};

export function SliderBar({ menuShow, onSearchChange }: TProps) {
  const { taskType: taskTypeList } = useTodoList();

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
      text: '近7天',
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
      text: '自定义',
      message: 2,
    },
  ];

  const [timeIndex, setTimeIndex] = useState<number>(0);
  const [taskTypeIndex, setTaskTypeIndex] = useState<number>(0);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);
  const [taskTypeModalShow, setTaskTypeModalShow] = useState<boolean>(false);
  const timeStr = useRef<number[]>([0, 0]);
  // const [] = useState()

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

  const paramsChangeFn = () => {
    const [startTime, endTime] = getTimeByIndex(timeIndex);
    const { status } = getStatusByIndex(taskStatusIndex);
    const { taskType } = getTaskTypeByIndex(taskTypeIndex, taskTypeList!);

    const params = {
      taskType,
      status,
      startTime,
      endTime,
      timeIndex,
    };

    if (timeIndex === 3 && !timeStr.current?.[0]) {
      console.log('未选时间，不请求');
      return;
    }

    if (timeIndex === 3 && timeStr.current[0]) {
      // 自定义
      params.startTime = timeStr.current[0];
      params.endTime = timeStr.current[1];
    }
    onSearchChange(params);
  };

  useEffect(() => {
    paramsChangeFn();
  }, [timeIndex, taskStatusIndex, taskTypeIndex]);

  const onTaskTypeOk = useCallback(() => {
    setTaskTypeModalShow(false);
    message.success('任务添加成功');
  }, []);

  const onTaskTypeCancel = useCallback(() => {
    setTaskTypeModalShow(false);
  }, []);

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
            message={<></>}
            onClick={() => {
              setTimeIndex(index);
            }}
          />
        ))}
        {timeIndex === 3 && (
          <div className='mt-2'>
            <RangePicker
              format={'YYYY/MM/DD'}
              onChange={(date) => {
                const res = date?.map((info) => info?.format('YYYY/MM/DD'));
                const tempStr = [
                  getTimeStringByDate(res?.[0]!, 'start'),
                  getTimeStringByDate(res?.[1]!, 'end'),
                ];
                timeStr.current = tempStr;
                paramsChangeFn();
              }}
            />
          </div>
        )}
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
            message={<></>}
            onClick={() => {
              setTaskStatusIndex(index);
            }}
          />
        ))}
      </div>

      <div className='px-3 py-3'>
        <div className=' flex justify-between items-center'>
          <div className=' font-bold text-base mb-1'>任务类型</div>
          <SButton
            className='ml-2 cursor-pointer'
            icon={<PlusOutlined className=' flex text-sm flex-shrink-0' />}
            onClick={() => {
              setTaskTypeModalShow(true);
            }}
          />
        </div>
        <div>
          {taskTypeList?.map((taskType, index) => (
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
              message={<></>}
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
        onOk={onTaskTypeOk}
        onCancel={onTaskTypeCancel}
      />
    </div>
  );
}
