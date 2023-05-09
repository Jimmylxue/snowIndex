import { NavBar } from '@/components/todoList';
import './index.css';
export function TodoList() {
  return (
    <div className=' w-screen h-screen'>
      <NavBar />
      <div className=' w-full h-full'>
        <div className='sliderBar whitespace-nowrap overflow-hidden'>
          <div className='w-full'>收件箱</div>
        </div>
        <div className='content'></div>
      </div>
    </div>
  );
}
