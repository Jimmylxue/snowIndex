import { DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTodoList } from '@/hooks/todolist/useTodolist';
import { useAddTask } from '@/api/todolist/task';

type TProps = {
  show: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export function TasksModal({ show, onOk, onCancel }: TProps) {
  const [form] = Form.useForm();

  const { taskType } = useTodoList();

  const { mutateAsync } = useAddTask();

  const confirm = () => {
    form.submit();
  };

  return (
    <Modal
      title='添加任务'
      open={show}
      okText={'添加任务'}
      cancelText={'取消'}
      onOk={confirm}
      onCancel={onCancel}>
      <Form
        form={form}
        name='horizontal_login'
        onFinish={async () => {
          const params = form.getFieldsValue();
          const res = await mutateAsync({ ...params, userId: 1001 });
          if (res.code === 200) {
            message.success('任务添加成功');
          } else {
            message.error('任务添加失败');
          }
          onOk();
        }}>
        <Form.Item
          name='taskName'
          rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='任务名称'
          />
        </Form.Item>
        <Form.Item
          name='taskContent'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='描述'
          />
        </Form.Item>
        {/* <Form.Item
          name='password3'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <DatePicker
            style={{
              width: 150,
            }}
            placeholder='任务时间'
          />
        </Form.Item> */}
        <Form.Item
          name='typeId'
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Select
            placeholder='任务类型'
            style={{
              width: 150,
            }}>
            {taskType?.map((taskType) => (
              <Select.Option key={taskType.typeId} value={taskType.typeId}>
                {taskType.typeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
