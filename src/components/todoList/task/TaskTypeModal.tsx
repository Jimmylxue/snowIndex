import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTodoList } from '@/hooks/todolist/useTodolist';

type TProps = {
  show: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export function TaskTypeModal({ show, onOk, onCancel }: TProps) {
  const [form] = Form.useForm();

  const { taskType } = useTodoList();

  console.log('dddd', taskType);

  return (
    <Modal
      title='添加任务类型'
      open={show}
      okText={'添加类型'}
      cancelText={'取消'}
      onOk={onOk}
      onCancel={onCancel}>
      <Form form={form} name='horizontal_login' onFinish={() => {}}>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='类型名称'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='类型描述'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
