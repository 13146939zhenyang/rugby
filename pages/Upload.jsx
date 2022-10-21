import React, { useState, useEffect } from "react";
import styles from "../styles/Upload.module.css";

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from "react-papaparse";

const GREY = "#CCC";
const GREY_LIGHT = "rgba(255, 255, 255, 0.4)";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);

const style = {
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  },
};

export default function Upload() {
  const { CSVReader } = useCSVReader();
  const [uploadFile, setUploadFile] = useState(null);
  useEffect(() => {
    if (uploadFile) {
      console.log("uploadFile", uploadFile);
    }
  }, [uploadFile]);

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        console.log("result", results);
        setUploadFile(results.data);
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
            className={styles.button}
            onMouseOver={(event) => {
              event.preventDefault();
            }}
            onMouseOut={(event) => {
              event.preventDefault();
            }}
          >
            Remove
          </button>
          <button
            onClick={
              uploadFile ? () => console.log("yes") : () => console.log("no")
            }
			className={styles.button}
          >
            Save
          </button>
		  </div>
        </>
      )}
    </CSVReader>
  );
}
