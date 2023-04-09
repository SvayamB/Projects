import assert from "node:assert";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";

test("fetchLongitudeAndLatitude follows type specification", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  console.log(typeof promise, typeof promise.then);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); //  Assert the result is an object
    assert(typeof result.lon === "number"); // Assert that the lon value is a number
    assert(typeof result.lat === "number"); // Assert that the lat value is a number
    assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
  });
});
test("UMass lat and long", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  console.log(typeof promise, typeof promise.then);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(result.lat === 42.3869382);
    assert(result.lon === -72.52991477067445);
  });
});

test("Invalid Name", () => {
  const promise = fetchLongitudeAndLatitude("afjicanaljsnvalsjaslblasjbalsb");
  console.log(typeof promise, typeof promise.then);
  assert(typeof promise === "object" && typeof promise.then === "function");
});
