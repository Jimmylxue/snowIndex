let UID = {
	_nextID: 0,
	get() {
		return this._nextID++
	},
}

export const uuid = () => UID.get()
