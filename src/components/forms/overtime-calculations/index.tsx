import {
  ChangeEvent,
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
  startMinuteAt: string
  endHourAt: string
  endMinuteAt: string
  overtimeHour: number
  overtimeMinute: number
  isCalculationFlg: boolean
};

const initialHours: Hours = {
  startHourAt: '18',
  startMinuteAt: '30',
  endHourAt: '19',
  endMinuteAt: '00',
  overtimeHour: 0,
  overtimeMinute: 0,
  isCalculationFlg: false,
};

export const OvertimeCalculationsForm: VFC = () => {
  const [hours, setHours] = useState<Hours>(initialHours);
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

  const onChangeHoursHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setHours({ ...hours, [name]: value });
  }, [hours]);

  const onClickOvertimeCalculationButtonHandler = useCallback(() => {
    setHours({
      ...hours,
      overtimeHour: 0,
      overtimeMinute: 0,
      isCalculationFlg: false,
    });
    const diffTime = timeDifference({
      startHourAt: Number(hours.startHourAt),
      startMinuteAt: Number(hours.startMinuteAt),
      endHourAt: Number(hours.endHourAt),
      endMinuteAt: Number(hours.endMinuteAt),
    });

    if (diffTime && 'error' in diffTime) return;

    setHours({
      ...hours,
      overtimeHour: diffTime.hour,
      overtimeMinute: diffTime.minute / 60 * 100,
      isCalculationFlg: true,
    });
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
          defaultValue={hours.startHourAt}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
          {startHourAtOptions.map((startHour) => (
            <option key={startHour.value} value={startHour.value}>{startHour.label}</option>
          ))}
        </select>：
        <select
          name="startMinuteAt"
          id="startMinuteAt"
          defaultValue={hours.startMinuteAt}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
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
          defaultValue={hours.endHourAt}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
          {endHourAtOptions.map((endHour) => (
            <option key={endHour.value} value={endHour.value}>{endHour.label}</option>
          ))}
        </select>：
        <select
          name="endMinuteAt"
          id="endMinuteAt"
          defaultValue={hours.endMinuteAt}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
            {minuteAtOptions.map((endMinute) => (
              <option key={endMinute.value} value={endMinute.value}>{endMinute.label}</option>
            ))}
        </select>
        <div className={styles.buttonField}>
          <button
            onClick={onClickOvertimeCalculationButtonHandler}
          >
            残業時間変換
          </button>
        </div>
        {hours.isCalculationFlg && (
          <h2>
            {/* TODO: ポケモンの画像の表示も行いたい */}
            残業時間：{hours.overtimeHour}.{hours.overtimeMinute}h
          </h2>
        )}
      </div>
    </div>
  );
};
