import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ZHEN YANG | RUGBY CODING</title>
        <meta name="description" content="ZHEN YANG | RUGBY CODING" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" className={styles.logo} />
        </div>
		<div className={styles.pageSection}>
			
		</div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
