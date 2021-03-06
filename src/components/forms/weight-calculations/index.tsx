import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  VFC,
} from 'react';
import Image from 'next/image';

import { Pokemon } from 'pokenode-ts';
import { useCalculationFuncs } from '../../../hooks/useCalculationFuncs';

import styles from './index.module.css';

type Props = {
  kabigonData: Pokemon
  inteleonData: Pokemon
};

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

export const WeightCalculationsForm: VFC<Props> = ({
  kabigonData,
  inteleonData,
}) => {
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

  const kabigonImage = useMemo(() => (
    <Image
      alt="kabigon"
      src={kabigonData.sprites.front_default ?? ''}
      width={200}
      height={200}
      objectFit="contain"
    />
  ), [kabigonData])

  const inteleonImage = useMemo(() => (
    <Image
      alt="inteleon"
      src={inteleonData.sprites.front_default ?? ''}
      width={200}
      height={200}
      objectFit="contain"
    />
  ), [inteleonData]);

  return (
    <div className={styles.formField}>
      <div>
        <label htmlFor="height">
          ?????????
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
      </div>
      <div>
        <label htmlFor="weight">
          ?????????
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
      </div>
      <button
        onClick={onClickWeightCalculationButtonHandler}
      >
        ????????????
      </button>

      <div>
        {bodyInfo.bmi && Number(bodyInfo.bmi) > 22 && (
          kabigonImage
        )}
        {bodyInfo.bmi && Number(bodyInfo.bmi) < 22 && (
          inteleonImage
        )}
        <h2>BMI???{bodyInfo.bmi}</h2>
        {bodyInfo.bmi && Number(bodyInfo.bmi) > 22 && (
          <p className={styles.alert}>
            ???BMI=22????????????????????????????????????????????????????????????<br />
            ?????????????????????????????????BMI???22.1??????????????????????????????????????????
          </p>
        )}
        <h2>
          ???????????????
          {bodyInfo.standardWeight && (
            `${bodyInfo.standardWeight}kg`
          )}
        </h2>
        <h2>
          ????????????????????????
          {bodyInfo.cinderellaWeight && (
            `${bodyInfo.cinderellaWeight}kg`
          )}
        </h2>
        <h2>
          ???????????????
          {bodyInfo.beautyWeight && (
            `${bodyInfo.beautyWeight}kg`
          )}
        </h2>
      </div>
    </div>
  );
};
