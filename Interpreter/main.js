import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchUniversities } from "./fetchUniversities.js";
import { writeToJSONFile } from "./fileUtility.js";

export async function putExtremeWeatherToFile(path, college) {
  try {
    let collegeCoord = await fetchLongitudeAndLatitude(college);
    let weather = await fetchCurrentWeather(collegeCoord.lon, collegeCoord.lat);
    let counter = 0;
    let maxVal = 0;
    let minVal = 0;
    let tempArr = weather.temperature_2m;
    let hourArr = weather.time;
    tempArr.reduce((acc, curr) => {
      let x = Math.max(acc, curr);
      if (x === curr) {
        maxVal = counter;
      }
      counter = counter + 1;
      return x;
    }, -Infinity);
    counter = 0;
    weather.temperature_2m.reduce((acc, curr) => {
      let x = Math.min(acc, curr);
      if (x === curr) {
        minVal = counter;
      }
      counter = counter + 1;
      return x;
    }, Infinity);
    let data = {
      max: "Daily High of " + tempArr[maxVal] + "F at " + hourArr[maxVal],
      min: "Daily Low of " + tempArr[minVal] + "F at " + hourArr[minVal],
    };
    return writeToJSONFile(path, data);
  } catch (err) {
    return Promise.reject(err);
  }
}
