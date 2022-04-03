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

type BodyInfo = {
  height: number
  weight: number
};

type Bmi = {
  height: number
  weight: number
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

  const weightCalculation = useCallback(
    (param: BodyInfo) => {
      const {
        height,
        weight
      } = param;

      const meterHeight = height / 100;
      const exponentiation = meterHeight ** 2;

      const bmi = weight / exponentiation;
      const standardWeight = exponentiation * 22;
      const cinderellaWeight = exponentiation * 18;
      const beautyWeight = exponentiation * 20;

      return {
        bmi: bmi.toFixed(1),
        standardWeight: standardWeight.toFixed(1),
        cinderellaWeight: cinderellaWeight.toFixed(1),
        beautyWeight: beautyWeight.toFixed(1),
      };
    },
    [],
  );

  return {
    timeDifference,
    weightCalculation,
  };
};
