const STYLES = {
  "width": { canvas: "wide" },
  "height": { canvas: "high" },
  "margin": { canvas: "small" },
};

// Testing the old code

const oldCtx = function () {};

oldCtx.prototype.__applyStyleState = function (styleState) {
  var keys = Object.keys(styleState), i, key;
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    this[key] = styleState[key];
  }
};

oldCtx.prototype.__setDefaultStyles = function () {
  var keys = Object.keys(STYLES), i, key; // keys of object - object selection
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    this[key] = STYLES[key].canvas; // field selection
  }
};

oldCtx.prototype.__getStyleState = function () {
  var i, styleState = {}, keys = Object.keys(STYLES), key;
  for (i = 0; i < keys.length; i++) {
    key = keys[i];
    styleState[key] = this[key];
  }
  return styleState;
};

let a = new oldCtx();
a.__applyStyleState({ width: "narrow", height: "low", margin: "big" })
console.log(a);

let b = new oldCtx();
b.__setDefaultStyles();
console.log(b);

console.log(a.__getStyleState())
console.log(b.__getStyleState())

// Testing the new code to check that everything works
import { ctx } from "./task1.js"

let c = new ctx();
c.__applyStyleState({ width: "narrow", height: "low", margin: "big" })
console.log(c);

let d = new ctx();
d.__setDefaultStyles();
console.log(d);

console.log(c.__getStyleState())
console.log(d.__getStyleState())
