import React, { useState } from "react";

import { apicall } from "./API/apicall";

function Converter() {
  const [userInput, setUserInput] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  function handleSubmition(e) {
    e.preventDefault();

    apicall(userInput).then((res) => {
      setDownloadLink(res.link);
    });
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmition(e)} className="App">
        <div>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        <input type="submit" />
      </form>

      {downloadLink && (
        <button>
          <a target="_blank" href={downloadLink}>
            გადმოწერა
          </a>
        </button>
      )}
    </div>
  );
}

export default Converter;
