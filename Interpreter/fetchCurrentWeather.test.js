import assert from "node:assert";
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";

test("fetchCurrentWeather follows type specification", () => {
  const promise = fetchCurrentWeather(42.36, -71.05);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); // Assert the result is an object
    assert(Array.isArray(result.time)); // Assert the result has an array time field
    assert(result.time.every((x) => typeof x === "string")); // Assert each element in that time is a sting
    assert(Array.isArray(result.temperature_2m)); // Assert the result as an array temperature_2m field
    assert(result.temperature_2m.every((x) => typeof x === "number")); // Assert each element in that time is a number
  });
});
test("fetchCurrentWeather returns accurate info", () => {
  const promise = fetchCurrentWeather(-71.05, 42.36);
  const info = fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=42.36&longitude=-71.05&hourly=temperature_2m&temperature_unit=fahrenheit"
  );

  return promise.then((result) => {
    info
      .then((res) => res.json())
      .then((result2) => {
        assert(result.time === result2.hourly.time);
        assert(result.temperature_2m === result2.hourly.temperature_2m);
      });
  });
});
