import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/stores/store';
import { SocketProvider } from './hooks/useSocket';
import ChatRoom from './pages/chatRoom';
import 'antd/dist/antd.css';
import './index.css';

function Home() {
  return <div>hello world</div>;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/home' element={<Home />} />
            <Route path='/chatRoom' element={<ChatRoom />} />
            <Route path='*' element={<App />}></Route>
          </Routes>
        </Router>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
