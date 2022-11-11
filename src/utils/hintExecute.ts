import { commandList } from '@/core/hint'

export function matchHint(instruct: string) {
	return commandList.find(command => command.start === instruct)?.hint
}

export function matchStartInstruct(instruct: string) {
	return commandList.find(command => command.start.startsWith(instruct))
}
