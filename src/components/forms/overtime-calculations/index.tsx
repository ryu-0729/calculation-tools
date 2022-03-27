import {
  useCallback,
  useMemo,
  useState,
  VFC,
} from 'react';

import { useCalculationFuncs } from '../../../hooks/useCalculationFuncs';

import styles from './index.module.css';

type Option = {
  label: string
  value: string
};

type Hours = {
  startHourAt: string
  endHourAt: string
  startMinuteAt: string
  endMinuteAt: string
};

const initialHours: Hours = {
  startHourAt: '18',
  endHourAt: '19',
  startMinuteAt: '45',
  endMinuteAt: '00',
};

type OverTime = {
  hour: number
  minute: number
};

const initialOverTime: OverTime = {
  hour: 0,
  minute: 0,
};

export const OvertimeCalculationsForm: VFC = () => {
  const [hours, setHours] = useState<Hours>(initialHours);
  const [overTime, setOverTime] = useState<OverTime>(initialOverTime);
  const [isCalculationFlg, setIsCalculationFlg] = useState<boolean>(false);
  const { timeDifference } = useCalculationFuncs();

  const startHourAtOptions: Option[] = useMemo(() => [
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
  ], []);

  const endHourAtOptions: Option[] = useMemo(() => [
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
  ], []);

  const minuteAtOptions: Option[] = useMemo(() => [
    { label: '00', value: '00' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ], []);

  const onClickOvertimeCalculationButtonHandler = useCallback(() => {
    const diffTime = timeDifference({
      startHourAt: Number(hours.startHourAt),
      startMinuteAt: Number(hours.startMinuteAt),
      endHourAt: Number(hours.endHourAt),
      endMinuteAt: Number(hours.endMinuteAt),
    });

    if (diffTime && 'error' in diffTime) return;

    setOverTime({ hour: diffTime.hour, minute: diffTime.minute / 60 * 100 });
    setIsCalculationFlg(true);
  }, [hours, timeDifference]);

  return (
    <div className={styles.formField}>
      <div>
        <label htmlFor="">
          開始時刻：
        </label>
        <select
          name="startHourAt"
          id="startHourAt"
          defaultValue={startHourAtOptions[0].value}
          className={styles.selectForm}
          onChange={(e) => setHours({ ...hours, startHourAt: e.target.value })}
        >
          {startHourAtOptions.map((startHour) => (
            <option key={startHour.value} value={startHour.value}>{startHour.label}</option>
          ))}
        </select>：
        <select
          name="startMinuteAt"
          id="startMinuteAt"
          defaultValue={minuteAtOptions[3].value}
          className={styles.selectForm}
          onChange={(e) => setHours({ ...hours, startMinuteAt: e.target.value })}
        >
          {minuteAtOptions.map((startMinute) => (
            <option key={startMinute.value} value={startMinute.value}>{startMinute.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">
          終了時間：
        </label>
        <select
          name="endHourAt"
          id="endHourAt"
          defaultValue={endHourAtOptions[1].value}
          className={styles.selectForm}
          onChange={(e) => setHours({ ...hours, endHourAt: e.target.value })}
        >
          {endHourAtOptions.map((endHour) => (
            <option key={endHour.value} value={endHour.value}>{endHour.label}</option>
          ))}
        </select>：
        <select
          name="endMinuteAt"
          id="endMinuteAt"
          defaultValue={minuteAtOptions[0].value}
          className={styles.selectForm}
          onChange={(e) => setHours({ ...hours, endMinuteAt: e.target.value })}
        >
            {minuteAtOptions.map((endMinute) => (
              <option key={endMinute.value} value={endMinute.value}>{endMinute.label}</option>
            ))}
        </select>
        <div className={styles.buttonField}>
          <button
            onClick={onClickOvertimeCalculationButtonHandler}
          >
            残業時間計算
          </button>
        </div>
        {isCalculationFlg && (
          <h2>
            残業時間：{overTime.hour}.{overTime.minute}h
          </h2>
        )}
      </div>
    </div>
  );
};
