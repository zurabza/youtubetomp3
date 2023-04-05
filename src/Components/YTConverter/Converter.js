import React, { useState } from "react";

import { apicall } from "./API/apicall";

import styles from "./Converter.module.css";
import DownArrow from "./../../Images/down-arrow.png";

function Converter() {
  const [userInput, setUserInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const [loading, setLoading] = useState(false);

  function getYTLinkID(url) {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      // Error
    }
  }

  const handleSubmition = async (e) => {
    e.preventDefault();
    setLoading(true);

    let videoID = getYTLinkID(userInput);

    await apicall(videoID).then((res) => {
      setDownloadLink(res.link);
      setDownloadName(res.title);
      setLoading(false);
    });
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Youtube-დან MP3-ში კონვერტაცია</h1>

      <form className={styles.FirstRow} onSubmit={(e) => handleSubmition(e)}>
        <div style={{marginBottom: '0.5rem'}}>
          <label className={styles.Label}>შეიყვანე ბმული</label>{" "}
          <img className={styles.arrow} src={DownArrow} />
        </div>
        <div>
          <input
            className={styles.Input}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <input className={styles.Button} type="submit" value="კონვერტირება" />
      </form>

      {downloadLink && (
        <button className={styles.Download}>
          <a href={downloadLink}>
            გადმოწერე <br />
            {downloadName}
          </a>
        </button>
      )}

      {loading && `${(<br />)} მიმდინარეობს კონვერტაცია...`}
    </div>
  );
}

export default Converter;
