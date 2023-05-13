import { Checkbox, Popconfirm, notification } from 'antd';
import { FC, HTMLAttributes } from 'react';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import './index.less';

interface TProps extends HTMLAttributes<HTMLDivElement> {
  taskName: string;
  desc: string;
  taskType: string;
  isComplete: 1 | 0;
}

export const TaskItem: FC<TProps> = ({
  taskName,
  desc,
  taskType,
  isComplete,
  onClick,
}) => {
  return (
    <div className='snow-task-item relative px-2 py-2 rounded-md'>
      <div>
        <Checkbox
          checked={isComplete === 1}
          onChange={() => {
            // todo 完成任务
            notification.info({
              message: `任务已完成`,
              description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
              placement: 'bottomLeft',
              icon: <BellOutlined />,
            });
          }}></Checkbox>
        <span onClick={onClick} className=' text-base ml-2 cursor-pointer'>
          {taskName}
        </span>
      </div>
      <div className='px-6 text-xs'>{desc}</div>
      <div className=' flex justify-end'>
        <div className='text-xs'>{taskType}</div>
      </div>
      <Popconfirm
        okText='确定'
        cancelText='取消'
        title='确定删除该任务吗？'
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
        <DeleteOutlined
          className='snow-delete-btn absolute right-2 top-1/2 -translate-y-1/2 text-base cursor-pointer'
          onClick={() => {}}
        />
      </Popconfirm>
    </div>
  );
};
