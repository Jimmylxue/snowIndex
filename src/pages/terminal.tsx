import { useTerminal } from '@/components/useTerminal';
import { useShotCut } from '@/hooks/useShotCut';
import { memo } from 'react';
import { Setting } from '@/components/Setting';

export default memo(() => {
  const terminal = useTerminal();
  const { terminalNode } = terminal;
  useShotCut(terminal);
  return (
    <div className=' h-full overflow-hidden'>
      {terminalNode}
      <Setting />
    </div>
  );
});
