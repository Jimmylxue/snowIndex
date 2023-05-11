import { config } from '@/config/react-query';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useCatchError } from './hooks/useCatchError';
import TerminalPage from './pages/terminal';

function App() {
  useCatchError();
  const { queryClient, QueryClientProvider } = config();

  useEffect(() => {
    window.oncontextmenu = function () {
      return import.meta.env.VITE_APP_OPEN_CONTEXT_MENU === 'false'
        ? false
        : true;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-black h-screen overflow-auto p-5 relative font-sans'>
        <TerminalPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
