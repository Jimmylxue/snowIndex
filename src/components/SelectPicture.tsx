import classNames from 'classnames';
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';

const imgList = [
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/d11101af738c4a3c0fa477d8334f1101.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/a1cf5b9c073cb78e2d6d865bedbd32d1.jpeg',
];

interface TProps {
  onClose: () => void;
}

export const SelectPicture: FC<TProps> = ({ onClose }) => {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const storeDispatch = useDispatch();
  return (
    <div
      className=' fixed z-10 w-full h-full left-0 top-0 flex justify-center items-center'
      style={{
        backgroundColor: '#00000073',
      }}>
      <div className=' relative w-2/3 h-1/4 '>
        <div className=' absolute w-full h-full  bg-white opacity-10'></div>
        <div className=' relative w-full h-full flex items-center'>
          <CloseOutlined
            className=' absolute right-3 top-3'
            style={{
              fontSize: 18,
            }}
            onClick={onClose}
          />
          {imgList.map((item, index) => (
            <div
              className={classNames('ml-2', {
                'border-blue-300 border-2 ': index === selectIndex,
                'border-transparent': index !== selectIndex,
              })}
              onClick={() => {
                storeDispatch({
                  type: 'set_background',
                  data: {
                    background: item,
                  },
                });
                setSelectIndex(index);
              }}
              key={index}>
              <img
                style={{
                  width: 200,
                }}
                src={item}
                alt=''
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
