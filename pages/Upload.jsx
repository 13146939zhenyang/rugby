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
  useEffect(() => {
    if (uploadFile) {
      console.log("uploadFile", uploadFile);
    }
  }, [uploadFile]);

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
