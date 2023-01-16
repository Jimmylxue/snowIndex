import { TMessage } from '@/types/TSocket';
import { memo } from 'react';

type TProps = {
  message: TMessage;
};

export default memo(({ message }: TProps) => {
  return (
    <div className='message flex items-center my-5'>
      <img
        src={message?.memberInfo?.avatar}
        alt='user'
        style={{
          width: 50,
          height: 50,
        }}
      />
      <div
        className='flex items-center px-4 ml-3'
        style={{
          backgroundColor: '#2980b9',
          minHeight: 50,
        }}>
        {message.text}
      </div>
    </div>
  );
});
