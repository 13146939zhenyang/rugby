import React, { useState, useEffect } from "react";
import styles from "../styles/Upload.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router'
import { useCSVReader, formatFileSize } from "react-papaparse";
import { Dna } from "react-loader-spinner";

export default function Upload() {
	const router = useRouter();
  const { CSVReader } = useCSVReader();
  const [uploadFile, setUploadFile] = useState(null);
  const [mouseHover, setMouseHover] = useState(false);
  const [saveMouseHover, setSaveMouseHover] = useState(false);
  const [searchMouseHover, setSearchMouseHover] = useState(false);
  const [insertArray, setInsertArray] = useState();
  const [uploadDisable, setUploadDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchButton, setSearchButton] = useState(false);
  const toastifyOptions = {
    position: "bottom-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    font: "20px",
  };
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
  const saveData = async () => {
    setLoading(true);
    const response = await fetch("/api/searching", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(insertArray),
    });
    setLoading(false);
    const responseJson = await response.json();
    if (responseJson.result === 200) {
      toast.success("Data saved successfully", toastifyOptions);
	  setSearchButton(true);
    }
  };
  const removeData = async () => {
    setLoading(true);
    const response = await fetch("/api/searching", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    const responseJson = await response.json();
    if (responseJson.result === 200) {
      toast.success("Data removed successfully", toastifyOptions);
      setUploadDisable(false);
	  setSearchButton(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {!loading ? (
        <div className={styles.loader}>
          <Dna
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
        ""
      )}
      <CSVReader
        onUploadAccepted={(results) => {
          setUploadFile(results.data);
          toast.success("File uploaded successfully", toastifyOptions);
          setUploadDisable(true);
        }}
        disabled={uploadDisable}
      >
        {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
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
                  if (uploadFile) {
                    setUploadFile(null);
                    removeData();
                  } else {
                    toast.error("No file to be removed", toastifyOptions);
                  }
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
                  uploadFile
                    ? () => saveData()
                    : () => toast.error("No file to be saved", toastifyOptions)
                }
                className={saveMouseHover ? styles.buttonHover : styles.button}
              >
                Save
              </button>
              {searchButton ? (
                <button
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setSearchMouseHover(true);
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                    setSearchMouseHover(false);
                  }}
                  onClick={() => router.push("/search")}
                  className={
                    searchMouseHover ? styles.buttonHover : styles.button
                  }
                >
                  Search
                </button>
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </CSVReader>
      <ToastContainer />
    </div>
  );
}
