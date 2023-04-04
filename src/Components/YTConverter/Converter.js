import React, { useState } from "react";

import { apicall } from "./API/apicall";

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

      {downloadLink ||
        (loading && (
          <button>
            <a target="_blank" href={downloadLink}>
              გადმოწერა
            </a>

            {loading ? "მიმდინარეობს კონვერტაცია" : "გადმოწერა"}
          </button>
        ))}
    </div>
  );
}

export default Converter;
