import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { ClientError, get } from '..';

export type TBingBgItem = {
  bot: number;
  copyright: string;
  copyrightlink: string;
  drk: number;
  enddate: string;
  fullstartdate: string;
  hs: any[];
  hsh: string;
  quiz: string;
  startdate: string;
  title: string;
  top: number;
  url: string;
  urlbase: string;
  wp: boolean;
};

export function useBingBgWeekList(
  queryKey: QueryKey,
  config?: UseQueryOptions<
    {
      images: TBingBgItem[];
    },
    ClientError
  >,
) {
  return useQuery<
    {
      images: TBingBgItem[];
    },
    ClientError
  >(queryKey, () => get('/bingBg/weekList'), config);
}
