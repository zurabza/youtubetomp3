// API - https://rapidapi.com/ytjar/api/youtube-mp36/
import { options } from "./options";

export const apicall = (userInput) => {
  // Get only ID from whole youtube video link
  const regex = /(?<=[\v=]).*?(?=[\&])/;
  const userInputToID = userInput.match(regex);
  const api = `https://youtube-mp36.p.rapidapi.com/dl?id=${userInputToID}`;

  return fetch(api, options)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((err) => console.error(err));
};
