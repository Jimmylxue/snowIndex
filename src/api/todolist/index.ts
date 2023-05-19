import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { post } from '..';
import { TaskItem, TaskType } from '../todolist/type';

export type ClientError = {
  code: number;
  message: string;
};

export function useTaskType(
  queryKey: QueryKey,
  variable: {
    userId: number;
  },
  config?: UseQueryOptions<
    {
      code: number;
      result?: TaskType[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      result?: TaskType[];
    },
    ClientError
  >(queryKey, () => post('/taskType/list', variable), config);
}

export function useUserTask(
  queryKey: QueryKey,
  variable: {
    userId: number;
    page: number;
    pageSize: number;
    typeId?: number;
    startTime?: number;
    endTime?: number;
    status?: number;
  },
  config?: UseQueryOptions<
    {
      code: number;
      message: number;

      result?: {
        page: number;
        result: TaskItem[];
        pageSize: number;
        typeId?: number;
      };
    },
    ClientError
  >,
) {
  return useQuery<
    {
      code: number;
      message: number;

      result?: {
        page: number;
        result: TaskItem[];
        pageSize: number;
      };
    },
    ClientError
  >(queryKey, () => post('/task/list', variable), config);
}
