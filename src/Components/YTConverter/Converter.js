import React, { useState } from "react";

import { apicall } from "./API/apicall";

import styles from "./Converter.module.css";

function Converter() {
  const [userInput, setUserInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  const [loading, setLoading] = useState(false);

  function handleSubmition(e) {
    e.preventDefault();
    setLoading(true);

    apicall(userInput).then((res) => {
      setDownloadLink(res.link);
      setLoading(false);
    });
  }

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Youtube-დან MP3-ში კონვერტაცია</h1>

      <form className={styles.FirstRow} onSubmit={(e) => handleSubmition(e)}>
        <label className={styles.Label}>შეიყვანე ბმული</label>
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
          <a target="_blank" href={downloadLink}>
            გადმოწერე{" "}
          </a>
        </button>
      )}

      {loading && "მიმდინარეობს კონვერტაცია..."}
    </div>
  );
}

export default Converter;
