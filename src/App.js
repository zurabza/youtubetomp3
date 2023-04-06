import React from "react";
import Converter from "./Components/YTConverter";

import YouTube from "./images/youtube-icon.png";
import MP3 from "./images/mp3.png";

function App() {
  return (
    <div className="App">
      <img className="Logo lightIMG" src={YouTube} alt="YouTube" /> 
      <img className="LogoMP3 lightIMG" src={MP3} alt="YouTube" />

      {/* <h1>Youtube-დან MP3-ში კონვერტაცია</h1> */}

      <Converter />
    </div>
  );
}

export default App;
