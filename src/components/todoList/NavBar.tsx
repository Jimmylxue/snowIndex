import {
  UnorderedListOutlined,
  HomeOutlined,
  PlusOutlined,
  ChromeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Form, Input } from 'antd';
import { Avatar } from './SAvatar';
import { SButton } from './Button';
import './index.css';

type TProps = {
  onMenuClick: () => void;
  onAddTask: () => void;
};

export function NavBar({ onMenuClick, onAddTask }: TProps) {
  const [form] = Form.useForm();
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
          <SButton
            className='ml-2'
            icon={<ChromeOutlined className=' flex text-xl flex-shrink-0' />}
          />
          <div className='ml-2'>
            <Avatar
              onClick={() => {
                console.log('hello world');
              }}
              userName='Jimmy'
              // avatar='https://vitepress-source.oss-cn-beijing.aliyuncs.com/typoraimage-20220326203849385.png'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
