import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/stores/store';
import { SocketProvider } from './hooks/useSocket';
import ChatRoom from './pages/chatRoom';
import 'tailwindcss/tailwind.css';
import './index.css';
import './var.less';
import { config } from './config/react-query';
import ChatRoomV2 from './pages/chatRoomV2';

const Root = function () {
  const { queryClient, QueryClientProvider } = config();
  return (
    <React.StrictMode>
      {/* // react 18 版本 useEffect 会执行两次 不需要可以先注释掉 */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SocketProvider>
            <Router>
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='/chatRoom' element={<ChatRoom />} />
                <Route path='/chatRoomV2' element={<ChatRoomV2 />} />
                {/* <Route path='*' element={<App />}></Route> */}
              </Routes>
            </Router>
          </SocketProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Root />,
);
