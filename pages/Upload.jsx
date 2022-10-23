import React, { useState, useEffect } from "react";
import styles from "../styles/Upload.module.css";

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";

export default function Upload() {
  const { CSVReader } = useCSVReader();
  const [uploadFile, setUploadFile] = useState(null);
  const [mouseHover, setMouseHover] = useState(false);
  const [saveMouseHover, setSaveMouseHover] = useState(false);
  const [insertArray, setInsertArray] = useState();
  useEffect(() => {
    if (uploadFile) {
      const insertUploadFile = uploadFile.slice(1);
      console.log("insertUploadFile", insertUploadFile);
      //   ['fixture_mid', 'season', 'competition_name', 'fixture_datetime', 'fixture_round', 'home_team', 'away_team']
      let currentArray = [];
      insertUploadFile.map((item) => {
        const insertItem = {
          fixture_mid: item[0],
          season: item[1],
          competition_name: item[2],
          fixture_datetime: item[3],
          fixture_round: item[4],
          home_team: item[5],
          away_team: item[6],
        };
        currentArray.push(insertItem);
      });
      setInsertArray(currentArray);
    }
  }, [uploadFile]);
  useEffect(() => {
    if (insertArray) {
      console.log("insertArray", insertArray);
    }
  }, [insertArray]);

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        setUploadFile(results.data);
        // alert("File uploaded successfully");
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <>
          <div {...getRootProps()} className={styles.upLoading}>
            {acceptedFile ? (
              <>
                <div className={styles.upLoadFile}>
                  <div className={styles.upLoadInfomation}>
                    <span className={styles.upLoadSize}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                    <span className={styles.upLoadName}>
                      {acceptedFile.name}
                    </span>
                  </div>
                  <div className={styles.upLoadProgressBar}>
                    <ProgressBar
                      style={{ backgroundColor: "rgb(23, 23, 114)" }}
                    />
                    {/* <div className={styles.upLoadProgress}></div> */}
                  </div>
                </div>
              </>
            ) : (
              "Drop CSV file here or click to upload"
            )}
          </div>
          <div className={styles.buttonContainer}>
            <button
              {...getRemoveFileProps()}
              className={mouseHover ? styles.buttonHover : styles.button}
              onMouseDown={(e) => {
                e.preventDefault();
                setMouseHover(true);
                setUploadFile(null);
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                setMouseHover(false);
              }}
            >
              Remove
            </button>
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setSaveMouseHover(true);
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                setSaveMouseHover(false);
              }}
              onClick={
                uploadFile ? () => console.log("yes") : () => console.log("no")
              }
              className={saveMouseHover ? styles.buttonHover : styles.button}
            >
              Save
            </button>
          </div>
        </>
      )}
    </CSVReader>
  );
}
