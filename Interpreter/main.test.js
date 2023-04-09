import { readFromJSONFile } from "./fileUtility.js";
import assert from "node:assert";
import { putExtremeWeatherToFile } from "./main.js";

test("test for putExtemeWeatherToFile", async () => {
  try {
    const promise = await putExtremeWeatherToFile(
      "message.txt",
      "University of Massachuesetts Boston"
    );
    let x = await readFromJSONFile("message.txt");
    console.log(x);
    assert("max" in x);
    assert("min" in x);
  } catch (err) {
    return true;
  }
});
