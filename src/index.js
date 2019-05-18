import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import render from './formatters';

const getAst = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const union = _.union(keysObj1, keysObj2);

  const ast = union.map((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { node: 'removed', [key]: obj1[key] };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { node: 'added', [key]: obj2[key] };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const valuesIsObjects = obj1[key] instanceof Object && obj2[key] instanceof Object;
      if (!valuesIsObjects && (obj1[key] === obj2[key])) {
        return { node: 'unchanged', [key]: obj1[key] };
      }
      if (!valuesIsObjects && (obj1[key] !== obj2[key])) {
        return { node: 'changed', [key]: { old: obj1[key], new: obj2[key] } };
      }
      if (valuesIsObjects) {
        return { node: 'children', [key]: getAst(obj1[key], obj2[key]) };
      }
    }
    return 'error';
  });
  return ast;
};

export default (pathToFile1, pathToFile2, format = '') => {
  const content1 = { key: path.extname(pathToFile1), value: fs.readFileSync(pathToFile1, 'utf8') };
  const content2 = { key: path.extname(pathToFile2), value: fs.readFileSync(pathToFile2, 'utf8') };
  const obj1 = parse(content1);
  const obj2 = parse(content2);
  const ast = getAst(obj1, obj2);

  return render(ast, format);
};
