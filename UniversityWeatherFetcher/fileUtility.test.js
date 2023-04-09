import assert from "node:assert";
import { writeToJSONFile, readFromJSONFile } from "./fileUtility.js";

test("writeToJSONFile and readFromJSONFile follow type specification", () => {
  const promise1 = writeToJSONFile("message.txt", {
    message: "hello",
    isData: true,
  });
  const promise2 = promise1.then(() => readFromJSONFile("message.txt"));
  assert(typeof promise2 === "object" && typeof promise2.then === "function");

  return promise2.then((result) => {
    assert(typeof result === "object");
    assert(typeof result.message === "string");
    assert(typeof result.isData === "boolean");
    assert(Object.keys(result).length === 2);
  });
});
