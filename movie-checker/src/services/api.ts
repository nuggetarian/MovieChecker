const API_KEY: string = "";

export const searchDefaults = async (query: string) => {
  const url: string = `https://www.omdbapi.com/?i=${encodeURIComponent(
    query
  )}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const responseJson = await response.json();

  console.log(responseJson);
  if (responseJson) {
    return responseJson;
  }
};

export const searchRequest = async (query: string) => {
  const url: string = `https://www.omdbapi.com/?s=${encodeURIComponent(
    query
  )}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const responseJson = await response.json();

  console.log(responseJson.Search);
  if (responseJson.Search) {
    return responseJson.Search;
  }
};
