import { get } from '@api/index'
import { TSnowTerminal } from 'types/TSnowTerminal'
import { TWeatherInfo } from 'types/TWeather'

export async function weatherExecute(
	instruct: string,
	terminal: TSnowTerminal,
	fullInstruct: string
) {
	const res = await get<TWeatherInfo>(
		`weather/base?cityName=${instruct.trim() || '福州'}`
	)
	terminal.addInstructRecord({
		type: 'WEATHER',
		instruct: fullInstruct,
		result: res.result,
	})
}

export const weatherCommand = {
	start: 'weather',
	hint: 'weather [城市名称（不填则查询定位城市）]',
	desc: '查询天气',
}
