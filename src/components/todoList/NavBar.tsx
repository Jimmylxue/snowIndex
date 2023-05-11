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
      <Modal
        title='添加任务'
        open={addTaskShow}
        okText={'添加任务'}
        cancelText={'取消'}
        onOk={() => {
          setAddTaskShow(false);
        }}
        onCancel={() => {
          setAddTaskShow(false);
        }}>
        <Form form={form} name='horizontal_login' onFinish={() => {}}>
          <Form.Item
            name='username'
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='任务名称'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='描述'
            />
          </Form.Item>
          <Form.Item
            name='password3'
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <DatePicker />
          </Form.Item>
          <Form.Item
            name='password3'
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Select>
              <Select.Option value='demo'>Demo</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
