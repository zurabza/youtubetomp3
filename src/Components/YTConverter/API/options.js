// API - https://rapidapi.com/ytjar/api/youtube-mp36

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_KEY,
    "X-RapidAPI-Host": process.env.REACT_APP_HOST,
  },
};
