import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { PokemonClient, Pokemon } from 'pokenode-ts';
import { WeightCalculationsForm } from '../../components/forms/weight-calculations';

import styles from './index.module.css';

type Props = {
  kabigonData: Pokemon
  inteleonData: Pokemon
};

const WeightCalculations: NextPage<Props> = ({
  kabigonData,
  inteleonData,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>理想の体重測定</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          理想の体重測定
        </h1>

        <p className={styles.description}>
          身長、体重からBMI、標準体重、シンデレラ体重、美容体重を測定します！<br />
          <Link href="https://fasme.asia/diet/body-weight-fasme4114/">
            <a>※シンデレラ体重、美容体重についてはこちら</a>
          </Link>
        </p>
        {/* TODO: 計算フォームの実装 */}
        <WeightCalculationsForm
          kabigonData={kabigonData}
          inteleonData={inteleonData}
        />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemonApis = new PokemonClient();
  const kabigonData = await pokemonApis.getPokemonById(143);
  const inteleonData = await pokemonApis.getPokemonById(818);

  return {
    props: {
      kabigonData,
      inteleonData,
    },
  };
};

export default WeightCalculations;
