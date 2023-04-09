export async function fetchCurrentWeather(longitude, latitude) {
  const weatherAPI = "https://api.open-meteo.com/v1/forecast";
  let lat = "latitude=" + latitude.toString();
  let long = "longitude=" + longitude.toString();

  let url =
    weatherAPI +
    "?" +
    lat +
    "&" +
    long +
    "&hourly=temperature_2m&temperature_unit=fahrenheit";

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      return Array.isArray(json.hourly.time) && json.hourly.time.length > 0
        ? Promise.resolve(json.hourly)
        : Promise.reject(new Error("No results found."));
    });
}

//fetchCurrentWeather(88,99).then(console.log).catch(console.log)
