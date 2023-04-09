//fetchLongitudeAndLatitude(query: string): Promise<{ lon: number, lat: number }>
export function fetchLongitudeAndLatitude(query) {
  const searchUrl = new URL("https://geocode-cache.herokuapp.com/search");
  searchUrl.searchParams.append("q", query);
  let finURL = searchUrl.toString();
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(finURL);
      let resp = await response.json();
      if (resp.length === 0) {
        reject(new Error("No results found for query."));
      } else if ("lat" in resp[0] && "lon" in resp[0]) {
        resolve({ lat: +resp[0]["lat"], lon: +resp[0]["lon"] });
      } else {
        reject(new Error("No results found for query."));
      }
    } catch (err) {
      reject(new Error("No results found for query."));
    }
  }); // TODO
}
