import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [searchResult, setSearchResult] = useState();
  const [resultList, setResultList] = useState();
  const [loading, setLoading] = useState(true);
  const [mouseHover, setMouseHover] = useState(false);
  useEffect(() => {
    (async () => {
      const getResults = await fetch("/api/searching");
      const getResultsJson = await getResults.json();
      setSearchResult(getResultsJson);
      setLoading(false);
    })();
  }, []);
  useEffect(() => {
    if (searchResult) {
      console.log("searchResult", searchResult);
    }
  }, [searchResult]);
  return (
    <div className={styles.container}>
      <Head>
        <title>ZHEN YANG | RUGBY CODING</title>
        <meta
          name="description"
          content="ZHEN YANG | RUGBY CODING | SEARCHING PAGE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" className={styles.logo} />
        </div>
        <div className={styles.pageSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputContainer}>
              <input type="text" className={styles.searchInput} />
              <div className={styles.searchRelateResult}></div>
              <button
                className={mouseHover ? styles.buttonHover : styles.searchButton}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setMouseHover(true);
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  setMouseHover(false);
                }}
              >
                Search
              </button>
            </div>
            <div className={styles.searchResultContainer}></div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
