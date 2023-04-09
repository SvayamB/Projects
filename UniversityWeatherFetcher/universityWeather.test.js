import assert from "node:assert";
import {
  fetchUCalWeather,
  fetchUMassWeather,
  fetchUniversityWeather,
} from "./universityWeather.js";

test("fetchUCalWeather follows type specification", () => {
  const promise = fetchUCalWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
  });
});

test("fetchUMassWeather follows type specification", () => {
  const promise = fetchUMassWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
    assert("totalAverage" in result);
  });
});

test("Invalid University", async () => {
  try {
    const result = await fetchUniversityWeather("ffjbaksbfakbsakbasfj");
  } catch (err) {
    assert(err.name === "Error");
  }
});
