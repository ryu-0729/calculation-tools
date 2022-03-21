import { useMemo, VFC } from 'react';

import styles from './index.module.css';

type Option = {
  label: string
  value: string
};

export const OvertimeCalculationsForm: VFC = () => {
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

  return (
    <form id='overCalculationsForm' className={styles.formField}>
      {/* MEMO: 残業開始時間 */}
      <div>
        <label htmlFor="">
          開始時刻：
        </label>
        <select
          name="startHourAt"
          id="startHourAt"
          defaultValue={startHourAtOptions[0].value}
          className={styles.selectForm}
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
        >
          {minuteAtOptions.map((startMinute) => (
            <option key={startMinute.value} value={startMinute.value}>{startMinute.label}</option>
          ))}
        </select>
      </div>
      {/* MEMO:残業終了時間 */}
      <div>
        <label htmlFor="">
          終了時間：
        </label>
        <select
          name="endHourAt"
          id="endHourAt"
          defaultValue={endHourAtOptions[1].value}
          className={styles.selectForm}
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
        >
            {minuteAtOptions.map((endMinute) => (
              <option key={endMinute.value} value={endMinute.value}>{endMinute.label}</option>
            ))}
        </select>
      </div>
    </form>
  );
};
