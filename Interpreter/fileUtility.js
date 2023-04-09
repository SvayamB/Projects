import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  let json = JSON.stringify(data);
  return writeFile(path, json);
}

export function readFromJSONFile(path) {
  return readFile(path).then((result) => JSON.parse(result));
}
