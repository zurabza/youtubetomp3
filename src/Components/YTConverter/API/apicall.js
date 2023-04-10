// API - https://rapidapi.com/ytjar/api/youtube-mp36
import { options } from "./options";

export const apicall = async (id) => {
  const api = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;

  try {
    const response = await fetch(api, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
