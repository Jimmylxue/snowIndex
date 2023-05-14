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

type TProps = {
  menuShow: boolean;
};

export function SliderBar({ menuShow }: TProps) {
  const taskTypeListConst = [
    {
      typeName: '工作',
    },
    {
      typeName: '家庭',
    },
    {
      typeName: '健身',
    },
  ];

  const taskStatusListConst = [
    {
      statusName: '已完成',
    },
    {
      statusName: '未完成',
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

  const [menuIndex, setMenuIndex] = useState<number>(0);
  const [taskTypeIndex, setTaskTypeIndex] = useState<number>(0);
  const [taskStatusIndex, setTaskStatusIndex] = useState<number>(0);
  const [taskTypeModalShow, setTaskTypeModalShow] = useState<boolean>(false);

  const { data, mutateAsync } = useAddTaskType();

  useEffect(() => {
    if (data?.code === 200) {
      message.success('任务添加成功');
    }
  }, [data]);

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
            checked={index === menuIndex}
            icon={menu.icon}
            text={menu.text}
            message={menu.message}
            onClick={() => {
              setMenuIndex(index);
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
