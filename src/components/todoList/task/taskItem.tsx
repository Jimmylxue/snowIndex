import { Checkbox } from 'antd';

export function TaskItem() {
  return (
    <div>
      <div>
        <Checkbox onChange={() => {}}>
          <span className=' text-base'>打扫所有房间</span>
        </Checkbox>
      </div>
      <div className='px-6 text-xs'>将房间都好好打扫一下</div>
      <div className=' flex justify-end'>
        <div className='text-xs'>日常</div>
      </div>
    </div>
  );
}
