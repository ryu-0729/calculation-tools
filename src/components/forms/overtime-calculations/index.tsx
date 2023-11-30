import {
  ChangeEvent,
  useCallback,
  useState,
  VFC,
} from 'react';

import { useGetTimeDifference, GetTimeDifferenceParam } from '../../../clients/api/overtime';
import { TimeDifferenceHour, TimeDifferenceMinute } from '../../../types/axios';

import styles from './index.module.css';

type Option = {
  label: string
  value: string
};

const initialTimeDifferenceParam: GetTimeDifferenceParam = {
  startHour: "18",
  startMinute: "30",
  endHour: "19",
  endMinute: "0",
};

const hourObject = TimeDifferenceHour as Object
const timeObject = TimeDifferenceMinute as Object

const hourOptions: Option[] = [];
for (const value of Object.values(hourObject)) {
  hourOptions.push({ label: value, value });
}

const timeOptions: Option[] = [];
for (const value of Object.values(timeObject)) {
  timeOptions.push({ label: value, value });
}

export const OvertimeCalculationsForm: VFC = () => {
  const [param, setParam] = useState<GetTimeDifferenceParam>(initialTimeDifferenceParam);
  const { data, mutate } = useGetTimeDifference(param);

  const onChangeHoursHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParam({ ...param, [name]: value });
  }, [param]);

  return (
    <div className={styles.formField}>
      <div>
        <label htmlFor="">
          開始時刻：
        </label>
        <select
          name="startHour"
          id="startHour"
          defaultValue={param.startHour}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
          {hourOptions.map((startHour) => (
            <option key={startHour.value} value={startHour.value}>{startHour.label}</option>
          ))}
        </select>：
        <select
          name="startMinute"
          id="startMinute"
          defaultValue={param.startMinute}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
          {timeOptions.map((startMinute) => (
            <option key={startMinute.value} value={startMinute.value}>{startMinute.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="">
          終了時間：
        </label>
        <select
          name="endHour"
          id="endHour"
          defaultValue={param.endHour}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
          {hourOptions.map((endHour) => (
            <option key={endHour.value} value={endHour.value}>{endHour.label}</option>
          ))}
        </select>：
        <select
          name="endMinute"
          id="endMinute"
          defaultValue={param.endMinute}
          className={styles.selectForm}
          onChange={onChangeHoursHandler}
        >
            {timeOptions.map((endMinute) => (
              <option key={endMinute.value} value={endMinute.value}>{endMinute.label}</option>
            ))}
        </select>
        <div className={styles.buttonField}>
          <button
            onClick={() => mutate()}
          >
            時間差分計算
          </button>
        </div>
        <h2>
          時間差分：{data?.overTime}
        </h2>
      </div>
    </div>
  );
};
