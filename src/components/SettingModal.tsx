import { Button, Modal } from 'antd';
import { useState } from 'react';

export function SettingModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Modal
      title='Basic Modal'
      open={isModalOpen}
      onOk={() => {}}
      onCancel={() => {}}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
