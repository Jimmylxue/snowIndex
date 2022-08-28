type TFuture = {
	date: string
	temperature: string // 温度，最低温/最高温
	weather: string // 天气情况
	wid: {
		day: string
		night: string
	}
	direct: string // 风向
}

export type TWeatherInfo = {
	city: string
	realtime: {
		temperature: string // 天气情况，如：晴、多云
		humidity: string // 天气标识id，可参考小接口2
		info?: string // 温度，可能为空
		wid?: string //	湿度，可能为空
		direct?: string // 风向，可能为空
		power?: string //	风力，可能为空
		aqi?: string // 空气质量指数，可能为空
	}
	future: TFuture[]
}

export type TBackWeatherInfo = {
	reason: string
	result: TWeatherInfo
	error_code: number // 0为成功
}
