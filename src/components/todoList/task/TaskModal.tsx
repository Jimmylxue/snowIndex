import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

type TProps = {
  show: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export function TaskModal({ show, onOk, onCancel }: TProps) {
  const [form] = Form.useForm();

  return (
    <Modal
      title='添加任务'
      open={show}
      okText={'添加任务'}
      cancelText={'取消'}
      onOk={onOk}
      onCancel={onCancel}>
      <Form form={form} name='horizontal_login' onFinish={() => {}}>
        <Form.Item
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='任务名称'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='描述'
          />
        </Form.Item>
        <Form.Item
          name='password3'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <DatePicker
            style={{
              width: 150,
            }}
            placeholder='任务时间'
          />
        </Form.Item>
        <Form.Item
          name='password3'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Select
            placeholder='任务类型'
            style={{
              width: 150,
            }}>
            <Select.Option value='demo'>Demo</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
