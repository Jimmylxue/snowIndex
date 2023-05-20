import { ClientError } from '@/api/location';
import { UseMutationOptions, useMutation } from 'react-query';
import { post } from '../..';
import { TAddTaskParams, TUpdateTaskParams } from './type';

export function useAddTask(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskParams
  >((data) => post('task/add', data), options);
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
