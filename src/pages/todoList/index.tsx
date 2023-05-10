import { NavBar, TaskItem } from '@/components/todoList';
import { Button, Checkbox, Divider, Radio } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import './index.less';
export function TodoList() {
  const [menuShow, setMenuShow] = useState<boolean>(false);

  return (
    <div className=' w-screen h-screen'>
      <NavBar
        onMenuClick={() => {
          setMenuShow((status) => !status);
        }}
      />
      <div className=' w-full h-full flex'>
        <div
          className={classNames(
            'whitespace-nowrap overflow-hidden flex-shrink-0',
            {
              sliderBarShow: menuShow,
              sliderBarClose: !menuShow,
            },
          )}>
          <div className='w-full'>收件箱</div>
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
