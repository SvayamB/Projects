"use strict";

const { parseProgram, parseExpression } = require("../include/parser.js");
const { interpProgram, interpExpression } = require("./interpreter.js");
const { interpStatement } = require("./interpreter.js");

const program = `
  let n = 2;

  let a = 1;
  while (n > 0) {
    let a = a + 5;
    n = n - 1;
    b=6;
  }
  print(a);
`;

const result = parseProgram(program);

if (result.ok) {
  try {
    const state = interpProgram(result.value);
    console.log(`Program successfully terminated: ${JSON.stringify(state)}`);
  } catch (e) {
    console.log("Runtime Error: " + e);
  }
} else {
  console.log("Parsing Error: " + result.message);
}
const st = `
let x = 0;
while(x < 5) {
  x = x + 1;
  let x = 3;
}
`;
const e = interpProgram(parseProgram(st).value);
console.log(e);
