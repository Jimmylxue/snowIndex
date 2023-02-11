import { useTerminal } from '@/components/useTerminal';
import { memo } from 'react';
import { Setting } from '@/components/Setting';

export default memo(() => {
  const terminal = useTerminal();
  const { terminalNode } = terminal;
  return (
    <div className=' h-full'>
      {terminalNode}
      <Setting terminal={terminal} />
    </div>
  );
});
