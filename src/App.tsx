import { useEffect } from 'react';
import { useCatchError } from './hooks/useCatchError';
import TerminalPage from './pages/terminal';

function App() {
  useCatchError();

  useEffect(() => {
    window.oncontextmenu = function () {
      return import.meta.env.VITE_APP_OPEN_CONTEXT_MENU === 'false'
        ? false
        : true;
    };
  }, []);

  return (
    <div className='bg-black h-screen overflow-auto p-5 relative font-sans'>
      <TerminalPage />
    </div>
  );
}

export default App;
