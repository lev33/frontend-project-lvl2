import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const getAst = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const union = _.union(keysObj1, keysObj2);

  const keysRemoved = union.filter(n => !keysObj2.includes(n));
  const keysAdded = union.filter(n => !keysObj1.includes(n));
  const keysDoubled = union.filter(n => keysObj1.includes(n) && keysObj2.includes(n));

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
      children: {},
    };
  }
  const nodesChildren = keysOfObjects.reduce(
    (acc, n) => ({ ...acc, [n]: getAst(obj1[n], obj2[n]) }
    ), {},
  );
  return {
    removed: nodesRemoved,
    added: nodesAdded,
    unchanged: nodesUnchanged,
    changed: nodesChanged,
    children: nodesChildren,
  };
};

export default (pathToFile1, pathToFile2, format = '') => {
  const content1 = { key: path.extname(pathToFile1), value: fs.readFileSync(pathToFile1, 'utf8') };
  const content2 = { key: path.extname(pathToFile2), value: fs.readFileSync(pathToFile2, 'utf8') };
  const obj1 = parse(content1);
  const obj2 = parse(content2);
  const ast = getAst(obj1, obj2);

  return render(ast, format);
};
