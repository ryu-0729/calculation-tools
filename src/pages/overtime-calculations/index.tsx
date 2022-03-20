import { NextPage } from 'next';
import Head from 'next/head'

import styles from './index.module.css'

const OvertimeCalculations: NextPage = () => {
  return (
    /* TODO: 残業時間計算コンポーネントの実装 */
    <div className={styles.container}>
      <Head>
        <title>残業時間計算</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          残業時間計算
        </h1>

        <p className={styles.description}>
          1.30時間や1.45時間を1.50hや1.75表記に変換します！
        </p>
        {/* TODO: 入力フォームの実装 */}
      </main>
    </div>
  );
};

export default OvertimeCalculations;