import classNames from 'classnames';
import { menuListConst } from '@/pages/todoList/mock/const';
import { MenuItem } from './MenuItem';
import { useState } from 'react';

type TProps = {
  menuShow: boolean;
};

export function SliderBar({ menuShow }: TProps) {
  const [menuIndex, setMenuIndex] = useState<number>(0);

  return (
    <div
      className={classNames('whitespace-nowrap overflow-hidden flex-shrink-0', {
        sliderBarShow: menuShow,
        sliderBarClose: !menuShow,
      })}>
      <div className='w-full px-3 py-3'>
        {menuListConst.map((menu, index) => (
          <MenuItem
            key={index}
            checked={index === menuIndex}
            icon={menu.icon}
            text={menu.text}
            message={menu.message}
            onClick={() => {
              setMenuIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
