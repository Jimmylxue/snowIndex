import { useMutation, UseMutationOptions } from 'react-query';
// import { ClientError } from '..'
// import { post } from '../request'
import { AddOrderParams, AddOrderResult } from './types';

type ClientError = {};

// export function useChangeBackground(
// 	options?: UseMutationOptions<
// 		{
// 			code: number
// 			msg: string
// 			result: AddOrderResult
// 			traceId: string
// 		},
// 		ClientError,
// 		AddOrderParams
// 	>
// ) {
// 	return useMutation<
// 		{
// 			code: number
// 			msg: string
// 			result: AddOrderResult
// 			traceId: string
// 		},
// 		ClientError,
// 		AddOrderParams
// 	>(data => get('background/base', data), options)
// }
