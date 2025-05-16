import classNames from 'classnames';
import { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { TBingBgItem, useBingBgWeekList } from '@/api/background';

interface TProps {
  onClose: () => void;
}

export const SelectPicture: FC<TProps> = ({ onClose }) => {
  const { data } = useBingBgWeekList(['bingBgWeek'], {});
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const storeDispatch = useDispatch();
  const [bgImageList, setBgImgList] = useState<TBingBgItem[]>([]);

  useEffect(() => {
    setBgImgList(data?.images || []);
  }, [data?.images]);

  // 添加ESC关闭功能
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className='fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-70 font-mono'>
      <div className='relative w-4/5 max-w-5xl bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden'>
        {/* Terminal Header */}
        <div className='flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700'>
          <div className='flex items-center'>
            <div className='w-3 h-3 rounded-full bg-red-500 mr-2'></div>
            <div className='w-3 h-3 rounded-full bg-yellow-500 mr-2'></div>
            <div className='w-3 h-3 rounded-full bg-green-500 mr-2'></div>
            <span className='text-gray-300 ml-2 text-sm'>Select Wallpaper</span>
          </div>
          <CloseOutlined
            className='text-gray-400 hover:text-white cursor-pointer'
            onClick={onClose}
          />
        </div>

        {/* Terminal Body */}
        <div className='p-4'>
          <div className='mb-3 text-green-400 flex items-center'>
            <span className='text-yellow-300 mr-2'>❯</span>
            <span>Available Bing wallpapers ({bgImageList.length} found)</span>
          </div>

          <div className='overflow-x-auto pb-2 custom-scrollbar'>
            <div className='flex space-x-3 p-2'>
              {bgImageList.map((item, index) => {
                const imgSrc = 'https://cn.bing.com/' + item.url;
                return (
                  <div
                    key={index}
                    className={classNames(
                      'relative flex-shrink-0 transition-all duration-200 cursor-pointer group rounded',
                      {
                        'ring-2 ring-blue-400': index === selectIndex,
                        'opacity-90 hover:opacity-100': index !== selectIndex,
                      },
                    )}
                    onClick={() => {
                      storeDispatch({
                        type: 'set_background',
                        data: { background: imgSrc },
                      });
                      setSelectIndex(index);
                    }}>
                    <div className='relative overflow-hidden rounded'>
                      <img
                        className='w-48 h-28 object-cover transition-transform duration-300 group-hover:scale-105'
                        src={imgSrc}
                        alt={item.copyright}
                      />
                      <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70'></div>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 p-2 text-white text-xs truncate bg-black bg-opacity-50'>
                      {item.copyright.split('(')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='mt-3 text-gray-400 text-xs'>
            <div className='flex items-center mb-1'>
              <span className='inline-block w-3 h-3 bg-blue-500 mr-2'></span>
              <span>
                Selected:{' '}
                {bgImageList[selectIndex]?.copyright.split('(')[0] || 'None'}
              </span>
            </div>
            <div className='flex items-center text-gray-500 text-xs italic'>
              <span className='flex items-center mr-3'>
                <svg
                  className='w-3 h-3 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 9l4-4 4 4m0 6l-4 4-4-4'
                  />
                </svg>
                Scroll horizontally
              </span>
              <span className='flex items-center mr-3'>
                <svg
                  className='w-3 h-3 mr-1'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
                  />
                </svg>
                Click to select
              </span>
              <span className='flex items-center'>
                <kbd className='px-1 py-0.5 bg-gray-800 rounded text-xs mr-1'>
                  ESC
                </kbd>
                to close
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
