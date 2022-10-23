import Head from "next/head";
import styles from "../styles/Search.module.css";

export default function Search() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ZHEN YANG | RUGBY CODING</title>
        <meta name="description" content="ZHEN YANG | RUGBY CODING | SEARCHING PAGE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" className={styles.logo} />
        </div>
        <div className={styles.pageSection}>
			search
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
