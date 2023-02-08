import { SettingOutlined, PictureOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { SettingModal } from './SettingModal';

export function Setting() {
  return (
    <div className=' text-white w-full flex justify-end relative'>
      <PictureOutlined
        className=' mr-3'
        onClick={() => {
          message.info('敬请期待');
        }}
      />
      <SettingOutlined
        onClick={() => {
          message.info('敬请期待');
        }}
      />
      {/* <SettingModal /> */}
    </div>
  );
}
