import { useEffect } from 'react'
import { uploadError } from '../utils'

export function useCatchError() {
	useEffect(() => {
		const fn = (args: any) => {
			if (args.lineno) {
				uploadError(args)
			}
		}
		const promiseError = (args: PromiseRejectionEvent) => {
			const info = {
				lineno: 0,
				colno: 0,
				error: {
					stack: args.reason.stack,
				},
				timeStamp: args.timeStamp,
				message: args.reason.message,
				filename: 'unknow',
			}
			uploadError(info)
		}
		window.addEventListener('error', fn)
		window.addEventListener('unhandledrejection', promiseError)
		return () => {
			window.removeEventListener('error', fn)
			window.removeEventListener('unhandledrejection', promiseError)
		}
	}, [])
}
