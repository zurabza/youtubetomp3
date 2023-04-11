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

  const reset = () => {
    setError("");
    setUserInput("");
    setDownloadLink("");
    setDownloadName("");
  };

  const CallAndSet = async () => {
    if (isYTLinkValid(userInput)) {
      setLoading(true);

      let videoID = getYTVideoID(userInput);
      let response = await apicall(videoID);

      if (response.status == "fail") {
        setError(response.msg)
        setLoading(false)
      }

      if (response.status == "processing") {
        setTimeout(async () => {
          CallAndSet();
        }, 1000);
      }

      if (response.status == "ok") {
        setDownloadLink(response.link);
        setDownloadName(response.title);

        setUserInput("");
        setError("");
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    CallAndSet();

    if (userInput && !isYTLinkValid(userInput)) setError("ბმული არავალიდურია");
  };


  useEffect(() => {
    userInput == "" && setError("");
    isYTLinkValid(userInput) && setError("");
  }, [userInput]);

  return (
    <div className={styles.Container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.FirstRow}>
        {!downloadLink && (
          <>
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
          </>
        )}
        <button className={styles.Button} onClick={downloadName ? reset : (e) => handleSubmit(e)}>
          {downloadName ? "დააკონვერტირე ხელახლა" : "კონვერტირება"}
        </button>
      </form>

      {downloadLink && 
        <button className={styles.Download}>
          <a href={downloadLink}>
            <b>გადმოწერე</b> <br />
            {downloadName}
          </a>
        </button>
      }

      <p style={loading || error ? { visibility: "visible" } : {}} className={styles.message}>
        {loading && <span className="loading">მუშავდება</span>}

        {error && error}
      </p>
    </div>
  );
}

export default Converter;
