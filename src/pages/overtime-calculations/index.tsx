import { NextPage } from 'next';
import Head from 'next/head';

import { OvertimeCalculationsForm } from '../../components/forms/overtime-calculations';

import styles from './index.module.css';

const OvertimeCalculations: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>時間差分計算</title>
      </Head>

      <main className={styles.main}>
        <div>
          <h2>時間差分計算</h2>
        </div>

        <p className={styles.description}>
          1:30や1:45を1.5hや1.75hなどの10進法表記に変換します！
        </p>
        <OvertimeCalculationsForm />
      </main>
    </div>
  );
};

export default OvertimeCalculations;
