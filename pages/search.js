import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);
  const [mouseHover, setMouseHover] = useState(false);
  const [resultList, setResultList] = useState();
  const [searchInput, setSearchInput] = useState();
  const handleSearch = async (e) => {
    const term = e.currentTarget.value;
    if (term.length > 2) {
      const getSearchResult = await fetch(`/api/searching/${term}`);
      const getSearchResultJson = await getSearchResult.json();
      if (getSearchResultJson.length > 0) {
        setResultList(getSearchResultJson);
      } else {
        setResultList();
      }
      console.log("getSearchResultJson", getSearchResultJson);
    } else {
      setResultList();
    }
  };
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
              <input
                type="text"
                className={styles.searchInput}
                onChange={(e) => handleSearch(e)}
              />
              <button
                className={
                  mouseHover ? styles.buttonHover : styles.searchButton
                }
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
            {resultList && resultList.length !== 0 ? (
              <div className={styles.searchRelateResult}>
                {resultList &&
                  resultList.map((item, index) => {
                    return (
                      <div
                        className={styles.searchRelateResultItem}
                        key={index}
                      >
                        {item.home_team}
                      </div>
                    );
                  })}
              </div>
            ) : null}
            <div className={styles.searchResultContainer}></div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
