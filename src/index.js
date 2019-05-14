import fs from 'fs';
import path from 'path';
import parse from './parsers';
import renderTree from './formatters/renderTree';
import renderPlain from './formatters/renderPlain';

const getAst = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const keysRemoved = keysObj1.filter(n => !keysObj2.includes(n));
  const keysAdded = keysObj2.filter(n => !keysObj1.includes(n));
  const keysDoubled = keysObj1.filter(n => keysObj2.includes(n));

  const f = (a, b) => (a instanceof Object) && (b instanceof Object);

  const keysUnchanged = keysDoubled
    ? keysDoubled.filter(n => !f(obj1[n], obj2[n]) && (obj1[n] === obj2[n])) : [];
  const keysChanged = keysDoubled
    ? keysDoubled.filter(n => !f(obj1[n], obj2[n]) && (obj1[n] !== obj2[n])) : [];
  const keysOfObjects = keysDoubled ? keysDoubled.filter(n => f(obj1[n], obj2[n])) : [];

  const nodesRemoved = keysRemoved.reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
  const nodesAdded = keysAdded.reduce((acc, key) => ({ ...acc, [key]: obj2[key] }), {});
  const nodesUnchanged = keysUnchanged.reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
  const nodesChanged = keysChanged.reduce((acc, key) => (
    { ...acc, [key]: { old: obj1[key], new: obj2[key] } }), {});

  if (keysOfObjects === []) {
    return {
      removed: nodesRemoved,
      added: nodesAdded,
      unchanged: nodesUnchanged,
      changed: nodesChanged,
      childrens: {},
    };
  }
  const children = keysOfObjects.reduce(
    (acc, n) => ({ ...acc, [n]: getAst(obj1[n], obj2[n]) }
    ), {},
  );
  return {
    removed: nodesRemoved,
    added: nodesAdded,
    unchanged: nodesUnchanged,
    changed: nodesChanged,
    childrens: children,
  };
};

export default (pathToFile1, pathToFile2, format = '') => {
  const content1 = fs.readFileSync(pathToFile1, 'utf8');
  const content2 = fs.readFileSync(pathToFile2, 'utf8');
  const extname = path.extname(pathToFile1);
  const obj1 = parse(content1, extname);
  const obj2 = parse(content2, extname);
  const ast = getAst(obj1, obj2);
  if (format === 'plain') {
    return renderPlain(ast);
  }
  if (format === 'json') {
    return JSON.stringify(ast);
  }
  return `{${renderTree(ast)}\n}`;
};
