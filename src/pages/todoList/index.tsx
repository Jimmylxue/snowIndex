import { MenuItem, NavBar, TaskItem } from '@/components/todoList';
import { Button } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { CarryOutOutlined } from '@ant-design/icons';
import './index.less';
import { menuListConst } from './mock/const';

export function TodoList() {
  const [menuShow, setMenuShow] = useState<boolean>(true);
  const [menuIndex, setMenuIndex] = useState<number>(0);
  return (
    <div className=' w-screen h-screen flex flex-col'>
      <NavBar
        onMenuClick={() => {
          setMenuShow((status) => !status);
        }}
      />
      <div className=' w-full flex flex-grow'>
        <div
          className={classNames(
            'whitespace-nowrap overflow-hidden flex-shrink-0',
            {
              sliderBarShow: menuShow,
              sliderBarClose: !menuShow,
            },
          )}>
          <div className='w-full px-3 py-3'>
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
        </div>
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
                <Button
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
              </div>
            </div>

            <div className=' flex justify-between items-center py-1'>
              <div className='flex items-center'>
                <span className=' text-lg font-bold'>5月10号</span>
              </div>
              <div>
                <Button
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
              </div>
            </div>
            {/* 任务项 */}
            <TaskItem />
            <TaskItem />
            <TaskItem />
            {/* <Divider className='my-1' /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
