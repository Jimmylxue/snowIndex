export const SET_WELCOME = 'set_welcome'
export const SET_AUTHOR_SHOW = 'set_auth_show'
export const SET_HOSTNAME = 'set_hostname'

enum AUTHOR_SHOW_TYPE {
	AUTHOR_SHOW_ON,
	AUTHOR_SHOW_OFF,
}

export const SET_HINT_SHOW = 'set_hint_show'

enum HINT_SHOW_ON_TYPE {
	HINT_SHOW_ON,
	HINT_SHOW_OFF,
}

export const SET_TIME_SHOW = 'set_time_show'

enum TIME_SHOW_ON_TYPE {
	TIME_SHOW_ON,
	TIME_SHOW_OFF,
}

export type TWelcomeAction = typeof SET_WELCOME | typeof SET_AUTHOR_SHOW

export const SET_BACKGROUND = 'set_background'
export type TBackgroundAction = typeof SET_BACKGROUND

export type TSystemShow =
	| keyof typeof AUTHOR_SHOW_TYPE
	| keyof typeof HINT_SHOW_ON_TYPE
	| keyof typeof TIME_SHOW_ON_TYPE

export type TBaseConfigAction =
	| typeof SET_HOSTNAME
	| typeof SET_HINT_SHOW
	| typeof SET_TIME_SHOW
