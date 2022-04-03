import {
  ChangeEvent,
  useCallback,
  useState,
  VFC,
} from 'react';

import { useCalculationFuncs } from '../../../hooks/useCalculationFuncs';

import styles from './index.module.css';

type BodyInfo = {
  height: string
  weight: string
  bmi?: string
  standardWeight?: string
  cinderellaWeight?: string
  beautyWeight?: string
};

const initialBodyInfo: BodyInfo = {
  height: '',
  weight: '',
  bmi: undefined,
  standardWeight: undefined,
  cinderellaWeight: undefined,
  beautyWeight: undefined,
};

export const WeightCalculationsForm: VFC = () => {
  const [bodyInfo, setBodyInfo] = useState<BodyInfo>(initialBodyInfo);
  const { weightCalculation } = useCalculationFuncs();

  const onChangeBodyInfoInputHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBodyInfo({ ...bodyInfo, [name]: value });
  }, [bodyInfo]);

  const onClickWeightCalculationButtonHandler = useCallback(() => {
    setBodyInfo({
      ...bodyInfo,
      bmi: undefined,
      standardWeight: undefined,
      cinderellaWeight: undefined,
      beautyWeight: undefined,
    });
    if (!bodyInfo.height || !bodyInfo.weight) return;

    const weight = weightCalculation({
      height: Number(bodyInfo.height),
      weight: Number(bodyInfo.weight),
    });

    const {
      bmi,
      standardWeight,
      cinderellaWeight,
      beautyWeight,
    } = weight;

    setBodyInfo({
      ...bodyInfo,
      bmi,
      standardWeight,
      cinderellaWeight,
      beautyWeight,
    });
  }, [bodyInfo, weightCalculation]);

  return (
    <div className={styles.formField}>
      <div>
        <label htmlFor="height">
          身長：
        </label>
        <input
          name="height"
          id="height"
          type="number"
          value={bodyInfo.height}
          min={0}
          placeholder="176"
          onChange={onChangeBodyInfoInputHandler}
        />
        <span>cm</span>
        <label htmlFor="weight">
          体重：
        </label>
        <input
          name="weight"
          id="weight"
          type="number"
          value={bodyInfo.weight}
          min={0}
          placeholder="76"
          onChange={onChangeBodyInfoInputHandler}
        />
        <span>kg</span>
        <button
          onClick={onClickWeightCalculationButtonHandler}
        >
          体重測定
        </button>
      </div>

      <div>
        <h2>BMI：{bodyInfo.bmi}</h2>
        {bodyInfo.bmi && Number(bodyInfo.bmi) > 22 && (
          <p className={styles.alert}>
            ※BMI=22が最も健康的な数値となるらしいです。。。<br />
            ちなみにこのアラートはBMIが22.1以上の方のみ表示しています！
          </p>
        )}
        <h2>標準体重：{bodyInfo.standardWeight}</h2>
        <h2>シンデレラ体重：{bodyInfo.cinderellaWeight}</h2>
        <h2>美容体重：{bodyInfo.beautyWeight}</h2>
      </div>
    </div>
  );
};
