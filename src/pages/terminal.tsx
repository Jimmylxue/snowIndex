import { useTerminal } from '@/components/useTerminal'
import { useShotCut } from '@/hooks/useShotCut'
import { memo } from 'react'

export default memo(() => {
	const terminal = useTerminal()
	const { terminalNode } = terminal
	useShotCut(terminal)
	return <div>{terminalNode}</div>
})
