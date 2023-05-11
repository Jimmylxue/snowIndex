import {
  UnorderedListOutlined,
  HomeOutlined,
  PlusOutlined,
  ChromeOutlined,
  SearchOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { SButton } from './Button';
import './index.css';
import { TaskModal } from './Task';

type TProps = {
  onMenuClick: () => void;
};

export function NavBar({ onMenuClick }: TProps) {
  const [addTaskShow, setAddTaskShow] = useState<boolean>(false);
  const [form] = Form.useForm();
  return (
    <div
      className='w-full px-5'
      style={{
        height: 45,
        backgroundColor: '#db4c3f',
      }}>
      <div className='w-full h-full flex items-center justify-between text-white'>
        <div className='flex items-center'>
          <SButton
            icon={
              <UnorderedListOutlined className=' flex text-xl flex-shrink-0' />
            }
            onClick={onMenuClick}
          />
          <SButton
            className='ml-2'
            icon={<HomeOutlined className=' flex text-xl flex-shrink-0' />}
          />
          <Input
            className='ml-4 border-r-2'
            placeholder='default size'
            prefix={<SearchOutlined />}
          />
        </div>
        <div className='flex items-center'>
          <SButton
            className='ml-2'
            icon={<PlusOutlined className=' flex text-xl flex-shrink-0' />}
            onClick={() => {
              setAddTaskShow(true);
            }}
          />
          <SButton
            className='ml-2'
            icon={<ChromeOutlined className=' flex text-xl flex-shrink-0' />}
          />
          <div className='ml-2'>
            <Avatar />
          </div>
        </div>
      </div>
      <TaskModal
        show={addTaskShow}
        onOk={() => {
          setAddTaskShow(false);
        }}
        onCancel={() => {
          setAddTaskShow(false);
        }}
      />
    </div>
  );
}
