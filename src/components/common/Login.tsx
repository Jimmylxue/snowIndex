import { useUserLogin } from '@/api/login';
import { Button, Form, Input, Modal } from 'antd';

type TProps = {
  show: boolean;
  onClose: () => void;
};

export function Login({ show, onClose }: TProps) {
  const { mutateAsync } = useUserLogin();
  const [form] = Form.useForm();
  return (
    <Modal title='用户登录' open={show} onCancel={onClose} footer={null}>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={async () => {
          const params = form.getFieldsValue();
          const res = await mutateAsync({
            phone: params.phone,
            password: params.password,
          });
          console.log('res', res);
        }}
        autoComplete='off'>
        <Form.Item
          label='手机号'
          name='phone'
          rules={[{ required: true, message: '请输入手机号!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
