import { ClientError } from '@/api/location';
import { UseMutationOptions, useMutation } from 'react-query';
import {
  TAddTaskTypeParams,
  TDelTaskTypeParams,
  TUpdateTaskTypeParams,
} from './type';
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

export function useUpdateTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TUpdateTaskTypeParams
  >((data) => post('taskType/update', data), options);
}

export function useDelTaskType(
  options?: UseMutationOptions<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskTypeParams
  >,
) {
  return useMutation<
    {
      code: number;
      result: string;
    },
    ClientError,
    TDelTaskTypeParams
  >((data) => post('taskType/del', data), options);
}
