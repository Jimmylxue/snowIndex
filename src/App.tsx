import { config } from '@/config/react-query';
import { useEffect } from 'react';
import { useCatchError } from './hooks/useCatchError';
import TerminalPage from './pages/terminal';

function App() {
  useCatchError();
  const { queryClient, QueryClientProvider } = config();

  return (
    <QueryClientProvider client={queryClient}>
      <div className='bg-black h-screen overflow-auto p-5 relative font-sans'>
        <TerminalPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
