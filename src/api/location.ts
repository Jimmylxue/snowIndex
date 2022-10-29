import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import { TLocationByIp } from 'types/TLocation'
import { get } from '.'

export type ClientError = {
	code: number
	message: string
}

export function useUserPosition(
	queryKey: QueryKey,
	config?: UseQueryOptions<
		{
			code: number
			result?: TLocationByIp
		},
		ClientError
	>
) {
	return useQuery<
		{
			code: number
			result?: TLocationByIp
		},
		ClientError
	>(queryKey, () => get('/location/ipTransform'), config)
}
