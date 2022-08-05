import { useCallback, useState } from 'react'
import { isFunction } from '.'

type _Storage = Pick<Storage, 'setItem' | 'getItem' | 'removeItem'>

export const createUseStorageState = (storage: _Storage) =>
	function <T>(key: string, defaultValue?: T | (() => T)) {
		const [state, setState] = useState<T>(() => {
			try {
				const localValue = JSON.parse(storage.getItem(key)!)
				if (![null, void 0].includes(localValue)) return localValue
			} catch (error) {}
			// @ts-ignore
			return isFunction(defaultValue) ? defaultValue() : defaultValue
		})

		const updateState: typeof setState = useCallback(value => {
			const valueType = typeof value
			if (valueType === 'function') {
				setState(v => {
					const nextValue = (value as (value: T) => T)(v)
					storage.setItem(key, JSON.stringify(nextValue))
					return nextValue
				})
				return
			}
			if (valueType === undefined) {
				setState(value)
				storage.removeItem(key)
				return
			}

			setState(value)
			storage.setItem(key, JSON.stringify(value))
		}, [])
		return [state, updateState] as const
	}
