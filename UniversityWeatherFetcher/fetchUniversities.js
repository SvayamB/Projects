export function fetchUniversities(query) {
  const searchUrl = new URL("https://university-web-api.herokuapp.com/search");
  searchUrl.searchParams.append("name", query);
  let finURL = searchUrl.toString();
  let uniNames = [];
  return new Promise(async (resolve) => {
    const response = await fetch(finURL);
    let resp = await response.json();
    if (resp.length === 0) {
      resolve(uniNames);
    } else {
      for (let i = 0; i < resp.length; ++i) {
        if ("name" in resp[i]) {
          uniNames.push(resp[i].name);
        }
      }
      resolve(uniNames);
    }
  });
}
