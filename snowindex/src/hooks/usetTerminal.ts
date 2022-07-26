import { TSnowTerminal } from '../types/TSnowTerminal'

export function useTerminal(input: HTMLInputElement): TSnowTerminal {
	return {
		focusInput: () => {
			input?.focus()
		},
		clear: () => {
			input.value = ''
		},
	}
}
