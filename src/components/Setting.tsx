import { useShotCut } from '@/hooks/useShotCut';
import { TSnowTerminal } from '@/types/TSnowTerminal';
import {
  SettingOutlined,
  PictureOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import { useState } from 'react';
import { useStore } from '../hooks';
import { useSaveBackground } from '../service';
import { SelectPicture } from './SelectPicture';
import { SettingModal } from './SettingModal';

type TProps = {
  terminal: TSnowTerminal;
};

export function Setting({ terminal }: TProps) {
  const [showSet, setShowSet] = useState<boolean>(false);
  const [showChangePicture, setShowChangePicture] = useState<boolean>(false);

  const {
    stores: { background },
  } = useStore();
  const { mutateAsync } = useSaveBackground();

  useShotCut(terminal, !showSet);

  const saveImage = async () => {
    const data = await mutateAsync({
      date: background.today,
      background: background.background,
    });

    if (data.code === 200) {
      message.success('图片收藏成功');
    }
  };

  return (
    <div className=' text-white w-full flex justify-end relative'>
      <HeartOutlined
        className=' mr-3'
        onClick={() => {
          saveImage();
        }}
      />
      <PictureOutlined
        className=' mr-3'
        onClick={() => {
          setShowChangePicture(true);
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
      {showChangePicture && (
        <SelectPicture onClose={() => setShowChangePicture(false)} />
      )}
    </div>
  );
}
