/**
 * NOTE: 計算処理系のロジックを定義する
 */

import { useCallback } from 'react';

export type TimeDifferenceType = {
  startHourAt: number
  startMinuteAt: number
  endHourAt: number
  endMinuteAt: number
};

export const useCalculationFuncs = () => {
  const timeDifference = useCallback(
    (param: TimeDifferenceType) => {
      const {
        startHourAt,
        startMinuteAt,
        endHourAt,
        endMinuteAt,
      } = param;

      const startTime = (startHourAt * 3600) + (startMinuteAt * 60);
      const endTime = (endHourAt * 3600) + (endMinuteAt * 60);

      if (startTime >= endTime) return { error: 'error' };

      const diffTime = endTime - startTime;
      const diffHour = Math.floor(diffTime / 3600);
      const diffMinute = Math.floor(diffTime % 3600 / 60);

      return { hour: diffHour, minute: diffMinute };
    },
    [],
  );

  return { timeDifference };
};
