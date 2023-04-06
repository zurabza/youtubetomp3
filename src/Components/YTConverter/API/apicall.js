// API - https://rapidapi.com/ytjar/api/youtube-mp3-download1/
import { options } from "./options";

export const apicall = (id) => {
  const api = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${id}`;

  return fetch(api, options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
};
