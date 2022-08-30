import useLocalStorage from '@hooks/useLocalStorage'
import { useLocalStorageState } from 'ahooks'

export function useSystemState() {
	const [background, setBackground] = useLocalStorageState('snowIndex_bg', {
		defaultValue: '',
	})

	const [welcome, setWelcome] = useLocalStorageState('snowIndex_welcome', {
		defaultValue: {
			authorShow: true,
			welcomeText: 'Welcome to SnowIndex, This is awesome!',
		},
	})

	const reset = () => {
		setBackground('')
		setWelcome({
			authorShow: true,
			welcomeText: 'Welcome to SnowIndex, This is awesome!',
		})
	}

	return {
		background,
		setBackground,
		welcome,
		setWelcome,
		reset,
	}
}
