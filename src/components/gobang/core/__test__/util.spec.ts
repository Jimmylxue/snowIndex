import { getTwoPointInstance } from '../util'

describe('>>> getTwoPointInstance', () => {
	it(' point1 {100,100} and point2 {120,100} distance is 20', () => {
		const point1 = {
			xPx: 100,
			yPx: 100,
		}
		const point2 = {
			xPx: 120,
			yPx: 100,
		}
		expect(getTwoPointInstance(point1, point2)).toBe(20)
	})

	it(' point1 {100,100} and point2 {70,60} distance is 50', () => {
		const point1 = {
			xPx: 100,
			yPx: 100,
		}
		const point2 = {
			xPx: 70,
			yPx: 60,
		}
		expect(getTwoPointInstance(point1, point2)).toBe(50)
	})
})

export {}
