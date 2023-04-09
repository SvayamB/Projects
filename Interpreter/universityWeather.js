import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";

//fetchUniversityWeather(universityQuery: string): Promise<{ [key: string]: number }>
export async function fetchUniversityWeather(query) {
  const Universities = await fetchUniversities(query);
  if (Universities.length === 0) {
    return Promise.reject(new Error("No results found for query."));
  }
  let obj = {};
  let bool = true;
  let pr = [];
  Universities.every((univ) => {
    if (bool === true) {
      pr.push(
        new Promise(async (resolve, reject) => {
          try {
            const resp = await fetchLongitudeAndLatitude(univ);
            const weath = await fetchCurrentWeather(resp.lon, resp.lat);
            resolve(
              weath.temperature_2m.reduce((acc, curr) => acc + curr, 0) /
                weath.temperature_2m.length
            );
          } catch (err) {
            bool = false;
          }
        })
      );
      return true;
    } else {
      return false;
    }
  });

  return Promise.all(pr).then((arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum = sum + arr[i];
      obj[Universities[i]] = arr[i];
    }
    obj["totalAverage"] = sum / arr.length;
    return obj;
  });
}
export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts"); // TODO
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
  // TODO
}
