import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import store from '@/stores/store';

const staticList = [
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/d11101af738c4a3c0fa477d8334f1101.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/a1cf5b9c073cb78e2d6d865bedbd32d1.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/a0d655280147a0f83bb883122908afb9.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/6ef30f088d41e43f13ee9672313d28a7.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/3177a704f05ebecd38e3df9fb2d733a4.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/ee3f12a1381d0ae4c2c72ce022654c1a.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/ff495022f62abdcc2225295018ba1cea.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/430101752e1c23146ba545543ad10e36.jpeg',
  'https://www.dreamplan.cn/baidu-rmb-video-cover-1/bab86b65a4048631a91028ff8d3b0b5d.jpeg',
];

interface TProps {
  onClose: () => void;
}

export const SelectPicture: FC<TProps> = ({ onClose }) => {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const storeDispatch = useDispatch();
  const state = store.getState();
  const { background } = useSelector<typeof state, typeof state>(
    (state) => state,
  );
  const [bgImageList, setBgImgList] = useState(staticList);

  useEffect(() => {
    if (background.background && !bgImageList.includes(background.background)) {
      setBgImgList((imgList) => [background.background, ...imgList]);
    }
  }, [background.background, bgImageList]);

  return (
    <div
      className=' fixed z-10 w-full h-full left-0 top-0 flex justify-center items-center'
      style={{
        backgroundColor: '#00000073',
      }}>
      <div className=' relative w-2/3 h-1/4 flex justify-center '>
        <CloseOutlined
          className=' absolute right-3 top-3 z-20'
          style={{
            fontSize: 18,
          }}
          onClick={onClose}
        />
        <div className=' absolute w-full h-full  bg-white opacity-10'></div>
        <div
          className=' relative h-full flex items-center overflow-auto'
          style={{
            width: '97%',
          }}>
          {bgImageList.map((item, index) => (
            <div
              className={classNames(' mx-1 flex-shrink-0', {
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
                  height: 112,
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
