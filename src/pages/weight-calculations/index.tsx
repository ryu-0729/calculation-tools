import { NextPage } from 'next';
import Head from 'next/head';

import styles from './index.module.css';

const WeightCalculations: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>理想の体重計算</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          理想の体重計算
        </h1>
      </main>
    </div>
  );
};

export default WeightCalculations;
