import { useMutation, UseMutationOptions } from 'react-query';
import { post } from '../api';

type ClientError = {};

type requestParams = {
  background: string;
  date: string;
};

export function useSaveBackground(
  options?: UseMutationOptions<
    {
      code: number;
      msg: string;
      result: string;
    },
    ClientError,
    requestParams
  >,
) {
  return useMutation<
    {
      code: number;
      msg: string;
      result: string;
    },
    ClientError,
    requestParams
  >((data) => post('background/save', data), options);
}
