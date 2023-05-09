import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/stores/store';
import { SocketProvider } from './hooks/useSocket';
import ChatRoom from './pages/chatRoom';
import { TodoList } from './pages/todoList';
import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import './index.css';

const Root = function () {
  return (
    <React.StrictMode>
      {/* // react 18 版本 useEffect 会执行两次 不需要可以先注释掉 */}
      <Provider store={store}>
        <SocketProvider>
          <Router>
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='/chatRoom' element={<ChatRoom />} />
              <Route path='/todoList' element={<TodoList />} />
              {/* <Route path='*' element={<App />}></Route> */}
            </Routes>
          </Router>
        </SocketProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
