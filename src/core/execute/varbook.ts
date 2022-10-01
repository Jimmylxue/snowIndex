import { TSnowTerminal } from 'types/TSnowTerminal'

export async function varbookExecute(
	instruct: string,
	terminal: TSnowTerminal
) {}

export const varbookCommand = {
	start: 'varbook',
	hint: '变量命名工具',
	desc: '变量命名工具',
	params: [],
	options: [],
}
