"use strict";

const assert = require("assert");
//const { test } = require("parsimmon");
const { parseExpression, parseProgram } = require("../include/parser.js");
const {
  interpExpression,
  interpProgram,
  interpStatement,
} = require("./interpreter.js");

test("interpExpression interprets multiplication with a variable", () => {
  const r = interpExpression({ x: 10 }, parseExpression("x * 2").value);
  assert(r === 20);
});
test("interpStatement interprets some statements", () => {
  let states = {};
  let stmts = parseProgram("let x=1;");
  interpStatement(states, parseProgram("let x=1;").value[0]);
  assert(states.x === 1);
});

test("interpProgram interprets basic declaration then assignment", () => {
  const st = interpProgram(parseProgram("let x = 10; x = 20;").value);
  assert(st.x === 20);
});

test("4", () => {
  const st = `
  let x = 0;
  while(x < 5) {
    let z = 0;
    x = x + 1;
    let x = 3;
  }
  `;
  const e = interpProgram(parseProgram(st).value);
  console.log(e);
  assert(e.x === 5);
});

test("fibonacci", () => {
  const st = interpProgram(
    parseProgram(
      "let x = 10; let current = 1; let prev = 0; while(x > 0){current = current+prev; prev = current - prev; x = x-1;}"
    ).value
  );
  assert(st.prev === 55);
});
