import { useShotCut } from '@/hooks/useShotCut';
import store from '@/stores/store';
import { TSnowTerminal } from '@/types/TSnowTerminal';
import {
  SettingOutlined,
  PictureOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSaveBackground } from '../service';
import { SettingModal } from './SettingModal';

type TProps = {
  terminal: TSnowTerminal;
};

export function Setting({ terminal }: TProps) {
  const state = store.getState();
  const [showSet, setShowSet] = useState<boolean>(false);
  const { background } = useSelector<typeof state, typeof state>(
    (state) => state,
  );
  const { mutateAsync } = useSaveBackground();

  useShotCut(terminal, !showSet);

  const saveImage = async () => {
    await mutateAsync({
      date: background.today,
      background: background.background,
    });
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
