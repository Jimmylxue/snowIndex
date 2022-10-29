enum STATUS {
	ERROR,
	SUCCESS,
}

export type TLocationByIp = {
	status: STATUS
	info: string
	infocode: number
	province: string
	city: string
	adcode: string
	rectangle: any
}
