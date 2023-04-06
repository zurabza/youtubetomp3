import React, { useEffect, useState } from "react";

import { apicall } from "./API/apicall";
import { isYTLinkValid, getYTVideoID } from "./functions";

import styles from "./Converter.module.css";
import DownArrow from "./images/down-arrow.png";

function Converter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [downloadName, setDownloadName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (isYTLinkValid(userInput)) {
      let videoID = getYTVideoID(userInput);

      await apicall(videoID).then((res) => {
        setDownloadLink(res.link);
        setDownloadName(res.title);
        setLoading(false);

        if (res.status == "ok") {
          setUserInput("")
          setError("")
        }

        if (res.message.includes("quota")) {
          // Rate Limit
          setError("გადმოწერის დღიური ლიმიტი ამოიწურა");
        }
      });
    }

    if (!isYTLinkValid(userInput)) {
      setError("ბმული არავალიდურია");
      setLoading(false);
    }
  };

  useEffect(() => {
    userInput == "" && setError("");
    isYTLinkValid(userInput) && setError("");
  }, [userInput]);

  return (
    <div className={styles.Container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.FirstRow}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label className={styles.Label}>შეიყვანე ბმული</label>
          <img className={`${styles.arrow} lightIMG`} src={DownArrow} alt="Arrow" />
        </div>

        <input
          style={error ? { borderBottomColor: "#7a0000" } : {}}
          className={userInput ? `${styles.Input} ${styles.Opacity1}` : styles.Input}
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <button className={styles.Button} onClick={(e) => handleSubmit(e)}>
          {downloadName ? "დააკონვერტირე ხელახლა" : "კონვერტირება"}
        </button>
      </form>

      {downloadLink && (
        <button className={styles.Download}>
          <a href={downloadLink}><b>გადმოწერე</b> <br />{downloadName}</a>
        </button>
      )}

      <p style={loading ? {visibility: "visible"} : {}} className={styles.message}>{loading && "მუშავდება..."}</p>

      <p style={error ? {visibility: "visible"} : {}} className={styles.message}>{error && error}</p>
    </div>
  );
}

export default Converter;
