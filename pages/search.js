import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(true);
  const [mouseHover, setMouseHover] = useState(false);
  const [resultList, setResultList] = useState();
  const handleDynamicSearch = async (e) => {
	setSearchResult()
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
  const handleSearch = () =>{
	setResultList();
	setSearchResult(resultList);
  }
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
                onChange={(e) => handleDynamicSearch(e)}
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
                onClick={() => handleSearch()}
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
            {searchResult && searchResult.length !== 0 ? (
              <div className={styles.searchResultContainer}>
                <table className={styles.tableContainer}>
                  <tr key="title">
                    <th key="fixture_mid">Fixture Mid</th>
                    <th key="season">Season</th>
                    <th key="competition_name">Competition Name</th>
                    <th key="fixture_datetime">Fixture Datetime</th>
                    <th key="fixture_round">Fixture Round</th>
                    <th key="home_team">Home Team</th>
                    <th key="away_team">Away Team</th>
                  </tr>
                  {searchResult.map((item, index) => {
                    //   ['fixture_mid', 'season', 'competition_name', 'fixture_datetime', 'fixture_round', 'home_team', 'away_team']
                    return (
                      <tr key={index}>
                        <td>{item.fixture_mid}</td>
                        <td>{item.season}</td>
                        <td>{item.competition_name}</td>
                        <td>{item.fixture_datetime}</td>
                        <td>{item.fixture_round}</td>
                        <td>{item.home_team}</td>
                        <td>{item.away_team}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
