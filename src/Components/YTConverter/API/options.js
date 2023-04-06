// API - https://rapidapi.com/ytjar/api/youtube-mp3-download1/

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
  },
};
