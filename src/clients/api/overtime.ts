import useSWR from 'swr';
import { KeyedMutator } from 'swr';

import {
  TimeDifferenceApi,
  GetTimeDifferenceResponse,
  TimeDifferenceHour,
  TimeDifferenceMinute,
} from '../../types/axios';

import { config } from '../config';

type UseGetTimeDifferenceResponse = {
  data?: GetTimeDifferenceResponse
  error: any
  mutate: KeyedMutator<any>
};

const timeDifferenceApi = new TimeDifferenceApi(config);

export type GetTimeDifferenceParam = {
  startHour: TimeDifferenceHour
  startMinute: TimeDifferenceMinute
  endHour: TimeDifferenceHour
  endMinute: TimeDifferenceMinute
};

export const useGetTimeDifference = ({
  startHour, startMinute, endHour, endMinute
}: GetTimeDifferenceParam): UseGetTimeDifferenceResponse => {
  const fetcher = () => (
    timeDifferenceApi.getTimeDifferenceTimedifferenceGet(startHour, startMinute, endHour, endMinute)
      .then((res) => res.data)
      .catch((err) => err)
  );

  const { data, error, mutate } = useSWR("/timedifference/", fetcher);

  return {
    data,
    error,
    mutate,
  };
};
