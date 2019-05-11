import fs from 'fs';
import path from 'path';
import parse from './parsers';

const getAst = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keysRemoved = keys1.filter(n => !keys2.includes(n));
  const keysAdded = keys2.filter(n => !keys1.includes(n));
  const keysDoubled = keys1.filter(n => keys2.includes(n));
  let keysUnchanged = [];
  let keysChanged = [];
  let keysOfObjects = [];
  if (keysDoubled) {
    const f = (a, b) => (a instanceof Object) && (b instanceof Object);
    keysUnchanged = keysDoubled.filter(n => !f(obj1[n], obj2[n]) && (obj1[n] === obj2[n]));
    keysChanged = keysDoubled.filter(n => !f(obj1[n], obj2[n]) && (obj1[n] !== obj2[n]));
    keysOfObjects = keysDoubled.filter(n => f(obj1[n], obj2[n]));
  }
  //  console.log('KEYS:', keysRemoved, keysAdded, keysUnchanged, keysChanged, keysOfObjects);
  const kr = keysRemoved.reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
  const ka = keysAdded.reduce((acc, key) => ({ ...acc, [key]: obj2[key] }), {});
  const ku = keysUnchanged.reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
  const kc = keysChanged.reduce((acc, key) => (
    { ...acc, [key]: { old: obj1[key], new: obj2[key] } }), {});
  // console.log('KEYS1:', kr, ka, ku, kc);
  if (keysOfObjects === []) {
    return {
      removed: kr, added: ka, unchanged: ku, changed: kc, children: {},
    };
  }
  const ch = keysOfObjects.reduce((acc, n) => ({ ...acc, [n]: getAst(obj1[n], obj2[n]) }), {});
  // console.log('CH', ch);
  return {
    removed: kr, added: ka, unchanged: ku, changed: kc, children: ch,
  };
};

const readAst = (tree, tab = 1) => {
  const t = Object.values(tree);
  const keysRemoved = t[0];
  const keysAdded = t[1];
  const keysUnchanged = t[2];
  const keysChanged = t[3];
  const keysOfObjects = t[4];

  const space = tabs => ' '.repeat(tabs * 2);

  const readValue = (a, tabs) => {
    if (!(a instanceof Object)) {
      return a;
    }
    const openingSpaces = space(tabs + 2);
    const closingSpaces = space(tabs);
    return `{\n${openingSpaces}${Object.keys(a)}: ${Object.values(a)}\n${closingSpaces}}`;
  };

  const a = Object.keys(keysRemoved).reduce((acc, key) => acc.concat(`${space(tab)}- ${key}: ${readValue(keysRemoved[key], tab)}\n`), '');
  const b = Object.keys(keysAdded).reduce((acc, key) => acc.concat(`${space(tab)}+ ${key}: ${readValue(keysAdded[key], tab)}\n`), a);
  const c = Object.keys(keysUnchanged).reduce((acc, key) => acc.concat(`${space(tab)}  ${key}: ${readValue(keysUnchanged[key], tab)}\n`), b);
  const d = Object.keys(keysChanged).reduce((acc, key) => acc.concat(`${space(tab)}- ${key}: ${readValue(keysChanged[key].old, tab)}\n${space(tab)}+ ${key}: ${readValue(keysChanged[key].new, tab)}\n`), c);

  if (keysOfObjects === []) {
    return d;
  }
  const ch = Object.keys(keysOfObjects).reduce((acc, key) => acc.concat(`${space(tab)}${key}: {\n${readAst(keysOfObjects[key], tab + 2)}\n${space(tab)}}\n`), '');
  //  console.log('TREE', t);
  return d + ch;
//  return `{\n${c}}`;
};

export default (pathToFile1, pathToFile2) => {
  const content1 = fs.readFileSync(pathToFile1, 'utf8');
  const content2 = fs.readFileSync(pathToFile2, 'utf8');
  const extname = path.extname(pathToFile1);
  const j1 = parse(content1, extname);
  const j2 = parse(content2, extname);
  const ast = getAst(j1, j2);
  //  console.log('AST', ast);
  const out = readAst(ast);
  //  console.log('READ AST', out);
  return `{\n${out}}`;
};
