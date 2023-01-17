import { TMessage } from '@/types/TSocket';
import moment from 'moment';
import { memo } from 'react';

type TProps = {
  message: TMessage;
};

export default memo(({ message }: TProps) => {
  return (
    <div className='message flex items-start my-5'>
      <img
        src={message?.memberInfo?.avatar}
        alt='user'
        style={{
          width: 50,
          height: 50,
        }}
      />
      <div>
        <div
          className=' ml-3 text-xs mb-1'
          style={{
            color: '#e9e9ef',
          }}>
          {message.memberInfo?.name}
        </div>
        <div
          className='flex items-center px-4 ml-3'
          style={{
            backgroundColor: '#2980b9',
            minHeight: 50,
          }}>
          {message.text}
        </div>
        <p className='ml-3 text-xs mt-1'>
          {moment(message.createTime).format('YYYY-MM-DD, h:mm:ss a')}
        </p>
      </div>
    </div>
  );
});
