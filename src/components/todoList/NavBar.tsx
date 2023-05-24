import {
  UnorderedListOutlined,
  HomeOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Dropdown, Form, Input, MenuProps } from 'antd';
import { Avatar } from './SAvatar';
import { SButton } from './Button';
import './index.css';
import { useUser } from '@/hooks/todolist/useAuth';
import { observer } from 'mobx-react-lite';

type TProps = {
  onMenuClick: () => void;
  onAddTask: () => void;
};

export const NavBar = observer(({ onMenuClick, onAddTask }: TProps) => {
  const { user, logOut, showLoginModal } = useUser();

  const loginItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' onClick={logOut}>
          退出登录
        </a>
      ),
    },
  ];

  const logoutItem: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' onClick={showLoginModal}>
          立即登录
        </a>
      ),
    },
  ];

  return (
    <div
      className='w-full px-5'
      style={{
        height: 45,
        backgroundColor: '#db4c3f',
      }}>
      <div className='w-full h-full flex items-center justify-between text-white'>
        <div className='flex items-center'>
          <SButton
            icon={
              <UnorderedListOutlined className=' flex text-xl flex-shrink-0' />
            }
            onClick={onMenuClick}
          />
          <SButton
            className='ml-2'
            icon={<HomeOutlined className=' flex text-xl flex-shrink-0' />}
          />
          <Input
            className='dz-input ml-4 border-r-2'
            placeholder='请输入'
            prefix={<SearchOutlined />}
          />
        </div>
        <div className='flex items-center'>
          <SButton
            className='ml-2'
            icon={<PlusOutlined className=' flex text-xl flex-shrink-0' />}
            onClick={onAddTask}
          />
          {/* <SButton
            className='ml-2'
            icon={<ChromeOutlined className=' flex text-xl flex-shrink-0' />}
          /> */}
          <div className='ml-2'>
            <Dropdown menu={{ items: user ? loginItems : logoutItem }}>
              <Avatar
                onClick={() => {
                  console.log('hello world');
                }}
                userName={user?.username!}
                avatar={user?.avatar}
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
});
