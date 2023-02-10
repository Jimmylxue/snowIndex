import {
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
  Checkbox,
  Drawer,
  Space,
  TimePicker,
  Divider,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/stores/store';
import moment from 'moment';
import { parseStoreParams } from '../stores';

type TProps = {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export function SettingModal({ visible, onOk, onCancel }: TProps) {
  const [form] = Form.useForm();
  const state = store.getState();
  const storeDispatch = useDispatch();
  const onFormLayoutChange = () => {};
  const handleSave = () => {
    form.validateFields();
    const setObj = form.getFieldsValue();
    console.log(setObj, state);
    storeDispatch({
      type: 'FULL_SETTING',
      data: parseStoreParams(state, setObj),
    });
    // console.log(moment(setObj.workingHour[0]).format('HH:mm:ss'));
    // console.log(moment(setObj.workingHour[1]).format('HH:mm:ss'));
    // console.log(form.getFieldsValue());
  };

  return (
    <Drawer
      title='设置'
      placement='right'
      onClose={onCancel}
      open={visible}
      width={600}
      extra={
        <Space>
          <Button onClick={handleSave} type='primary'>
            保存
          </Button>
        </Space>
      }>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        onValuesChange={onFormLayoutChange}
        style={{ maxWidth: 600 }}>
        <Form.Item
          label='工作时间'
          name='workingHour'
          rules={[
            {
              required: true,
              message: '请选择活动日期',
            },
          ]}>
          <Space align='center'>
            <Form.Item noStyle label='上班时间' name='workingHour'>
              <TimePicker.RangePicker onChange={() => {}} />
            </Form.Item>
            <Form.Item noStyle name='is996' valuePropName='checked'>
              <Checkbox>996</Checkbox>
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item
          label='薪资'
          name='salary'
          rules={[
            {
              required: true,
              message: '请选择新客礼包',
            },
          ]}>
          <InputNumber addonAfter='¥' />
        </Form.Item>

        <Form.Item
          label='欢迎语'
          name='welcomeText'
          rules={[
            {
              required: true,
              message: '请选择新客礼包',
            },
          ]}>
          <Input.TextArea
            rows={6}
            placeholder='请输入'
            style={{ width: 520 }}
            maxLength={500}
          />
        </Form.Item>

        <Form.Item label='时间显示' valuePropName='checked' name='timeShow'>
          <Switch checkedChildren='开启' unCheckedChildren='关闭' />
        </Form.Item>

        <Form.Item label='指令提示' valuePropName='checked' name='hintShow'>
          <Switch checkedChildren='开启' unCheckedChildren='关闭' />
        </Form.Item>
      </Form>
      <Divider plain>
        <span className=' text-gray-400 text-xs'>
          推荐使用 命令行 方式进行个性化配置
        </span>
      </Divider>
    </Drawer>
  );
}
