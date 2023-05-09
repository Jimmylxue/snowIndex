import {
  UnorderedListOutlined,
  HomeOutlined,
  PlusOutlined,
  ChromeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input } from 'antd';
import { Avatar } from './Avatar';
import './index.css';

export function NavBar() {
  return (
    <div
      className='w-full px-5'
      style={{
        height: 45,
        backgroundColor: '#cb5647',
      }}>
      <div className='w-full h-full flex items-center justify-between text-white'>
        <div className='flex items-center'>
          <UnorderedListOutlined className=' text-lg' />
          <HomeOutlined className=' text-lg ml-4' />
          <Input
            className='ml-4 border-r-2'
            placeholder='default size'
            prefix={<SearchOutlined />}
          />
        </div>
        <div className='flex items-center'>
          <PlusOutlined className=' text-lg' />
          <ChromeOutlined className=' text-lg ml-4' />
          <div className='ml-4'>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
}
