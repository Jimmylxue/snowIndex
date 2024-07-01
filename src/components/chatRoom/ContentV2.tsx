import { useSocketContext } from '@/hooks/chatRoom/useChatRooV2';
import React, { memo } from 'react';
import MessageV2 from './MessageV2';
import { Divider, Empty } from 'antd';

export default memo(() => {
  const { messageList, currentChatUser } = useSocketContext();
  return (
    <div id='content' className='h-5/6 w-3/4  px-5 overflow-auto relative'>
      {!currentChatUser?.socketId ? (
        <Empty
          style={{
            marginTop: 200,
          }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <div className=''>
          <div className=' sticky w-full left-0 top-0 bg-[#2e2f37]'>
            {/* <img
            className=' rounded'
            src={currentChatUser?.avatar}
            alt='user'
            style={{
              width: 50,
              height: 50,
            }}
          /> */}
            <div className=' mb-2'>{currentChatUser?.name}</div>
            <Divider className=' bg-white' style={{ margin: 'auto' }} />
          </div>
          {messageList.map((message, index) => (
            <MessageV2 message={message} key={index}></MessageV2>
          ))}
        </div>
      )}
    </div>
  );
});
