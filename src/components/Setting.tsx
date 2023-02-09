import { SettingOutlined, PictureOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { useState } from 'react';
import { SettingModal } from './SettingModal';

export function Setting() {
  const [showSet, setShowSet] = useState<boolean>(false);

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
          setShowSet(true);
        }}
      />
      <SettingModal
        visible={showSet}
        onOk={() => {
          setShowSet(false);
        }}
        onCancel={() => setShowSet(false)}
      />
    </div>
  );
}
