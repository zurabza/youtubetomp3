import React, { useState } from "react";

import { apicall } from "./API/apicall";
import { getYTVideoID } from "./getYTVideoID";

import styles from "./Converter.module.css";
import DownArrow from "./down-arrow.png";

function Converter() {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const reset = () => {
    setUserInput("");
    setDownloadLink("");
    setDownloadName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let videoID = getYTVideoID(userInput);

    await apicall(videoID).then((res) => {
      setDownloadLink(res.link);
      setDownloadName(res.title);
      setLoading(false);
    });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.FirstRow}>
        {!downloadName && (
          <>
            <div style={{ marginBottom: "0.5rem" }}>
              <label className={styles.Label}>შეიყვანე ბმული</label>
              <img className={`${styles.arrow} lightIMG`} src={DownArrow} alt="Arrow" />
            </div>

            <input
              className={userInput ? `${styles.Input} ${styles.Opacity1}` : styles.Input}
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
          </>
        )}
        <button className={styles.Button} onClick={downloadName ? reset : (e) => handleSubmit(e)}>
          {downloadName ? "დააკონვერტირე ხელახლა" : "კონვერტირება"}
        </button>
      </div>

      {downloadLink && <button className={styles.Download}><a href={downloadLink}><b>გადმოწერე</b> <br />{downloadName}</a></button>}

      {loading && (
        <p style={{ color: "white" }}>
          <br /> მიმდინარეობს კონვერტაცია...
        </p>
      )}
    </div>
  );
}

export default Converter;
