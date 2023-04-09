"use strict";

//findVar(state:state,varName:string):number || boolean
function findVar(state, varName) {
  if (varName in state) {
    return state[varName];
  }
  if ("$$PAR" in state) {
    return findVar(state.$$PAR, varName);
  } else {
    throw new Error("Variable " + varName + " does not exist");
  }
}

//assignVar(state:state,varName:string,expression: Expr):state
function assignVar(state, varName, expression) {
  if (varName in state) {
    state[varName] = interpExpression(state, expression);
    return state;
  }
  if ("$$PAR" in state) {
    return assignVar(state.$$PAR, varName, expression);
  } else {
    throw new Error("Variable " + varName + " does not exist");
  }
}

function interpExpression(state, expr) {
  if (expr.kind === "number" || expr.kind === "boolean") {
    return expr.value;
  }
  switch (expr.kind) {
    case "variable": {
      return findVar(state, expr.name);
    }
    case "operator": {
      let opt = expr.op;
      let ex1 = interpExpression(state, expr.e1);
      if (opt === "||" && ex1 === true && typeof ex1 === "boolean") {
        return ex1;
      }
      let ex2 = interpExpression(state, expr.e2);
      switch (opt) {
        case "+": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 + ex2;
          }
          throw new Error("Arithmetic only between numbers");
        }
        case "-": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 - ex2;
          }
          throw new Error("Arithmetic only between numbers");
        }
        case "*": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 * ex2;
          }
          throw new Error("Arithmetic only between numbers");
        }
        case "/": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 / ex2;
          }
          throw new Error("Arithmetic only between numbers");
        }
        case "&&": {
          if (typeof ex1 === "boolean" && typeof ex2 === "boolean") {
            return ex1 && ex2;
          }
          throw new Error("Logical only between booleans");
        }
        case "||": {
          if (typeof ex1 === "boolean" && typeof ex2 === "boolean") {
            return ex1 || ex2;
          }
          throw new Error("Logical only between booleans");
        }
        case ">": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 > ex2;
          }
        }
        case "<": {
          if (typeof ex1 === "number" && typeof ex2 === "number") {
            return ex1 < ex2;
          }
        }
        case "===": {
          if (
            (typeof ex1 === "number" || typeof ex1 === "boolean") &&
            (typeof ex2 === "number" || typeof ex2 === "boolean")
          ) {
            return ex1 === ex2;
          }
        }
        default:
          throw new Error("invalid");
      }
    }
  }
}
// type Stmt = { kind: "let"; name: string; expression: Expr }
//   | { kind: "assignment"; name: string; expression: Expr }
//   | { kind: "if"; test: Expr; truePart: Stmt[]; falsePart: Stmt[] }
//   | { kind: "while"; test: Expr; body: Stmt[] }
//   | { kind: "print"; expression: Expr };
//interpStatement(state: State, p: Stmt): State

function interpStatement(state, stmt) {
  switch (stmt.kind) {
    case "let": {
      if (stmt.name in state) {
        throw new Error("already declared");
      }
      state[stmt.name] = interpExpression(state, stmt.expression);
      return state;
    }
    case "assignment": {
      return assignVar(state, stmt.name, stmt.expression);
    }
    case "if": {
      if (interpExpression(state, stmt.test)) {
        let newState = { $$PAR: state };
        interpStatementArr(newState, stmt.truePart);
      } else {
        let newState = { $$PAR: state };
        interpStatementArr(newState, stmt.falsePart);
      }
      return state;
    }
    case "while": {
      while (interpExpression(state, stmt.test)) {
        let newState = { $$PAR: state };
        interpStatementArr(newState, stmt.body);
      }
      return state;
    }
    case "print": {
      console.log(interpExpression(state, stmt.expression));
      return state;
    }
    default: {
      throw new Error("invalid statement");
    }
  }
}
function interpStatementArr(state, stmts) {
  stmts.forEach((element) => interpStatement(state, element));
  return state;
}

function interpProgram(stmts) {
  let states = {};
  stmts.forEach((st) => interpStatement(states, st));
  return states;
}

// DO NOT REMOVE
module.exports = {
  interpExpression,
  interpStatement,
  interpProgram,
};
