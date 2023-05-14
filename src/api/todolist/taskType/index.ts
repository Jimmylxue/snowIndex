import { ClientError } from '@/api/location';
import { UseMutationOptions, useMutation } from 'react-query';
import { TAddTaskTypeParams } from './type';
import { post } from '../..';

export function useAddTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TAddTaskTypeParams
  >((data) => post('taskType/add', data), options);
}
