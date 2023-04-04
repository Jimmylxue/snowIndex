import { memo, useEffect } from 'react';
import { EnvironmentOutlined, LoadingOutlined } from '@ant-design/icons';
import { useLocation } from '@/hooks/useLocation';
import { useStore } from '../hooks';

export default memo(() => {
  const {
    stores: {
      welcome: { welcomeText, authorShow },
    },
  } = useStore();
  const location = useLocation();
  useEffect(() => {
    if (location?.city) {
      localStorage.setItem('snowIndex-location', JSON.stringify(location));
    }
  }, [location]);
  return (
    <div className=' text-white z-10 relative' id='welcomeNode'>
      <div className='flex justify-between items-center'>
        <p>{welcomeText}</p>
        <p className='flex justify-center items-center'>
          {location?.city ? (
            <EnvironmentOutlined className='mr-1' />
          ) : (
            <LoadingOutlined className='mr-1' />
          )}

          {location?.city || '定位中'}
        </p>
      </div>
      {authorShow && (
        <p>
          Author{' '}
          <a
            className=' text-blue-500 ml-1'
            href='https://github.com/Jimmylxue'>
            Jimmyxuexue
          </a>
          , github{' '}
          <a
            href='https://github.com/Jimmylxue/snowIndex'
            className=' text-blue-500 ml-1'>
            SnowIndex
          </a>
          ,{' '}
          <span className='text-gray-400'>
            you can input "authorShow off" to hide it ☀️ enter chatroom to
            experience new features 🎉
          </span>
        </p>
      )}
    </div>
  );
});
