import { ClientError } from '@/api/location';
import { UseMutationOptions, useMutation } from 'react-query';
import { TUpdateTaskParams, TUserLoginParams } from './type';
import { post } from '..';

export function useUserLogin(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserLoginParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUserLoginParams
  >((data) => post('user/login', data), options);
}

export function useUpdateTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskParams
  >((data) => post('task/update', data), options);
}
