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
      return { [key]: { value: obj1[key], type: 'removed' } };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { [key]: { value: obj2[key], type: 'added' } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const valuesAreObjects = obj1[key] instanceof Object && obj2[key] instanceof Object;
      if (!valuesAreObjects && (obj1[key] === obj2[key])) {
        return { [key]: { value: obj1[key], type: 'unchanged' } };
      }
      if (!valuesAreObjects && (obj1[key] !== obj2[key])) {
        return { [key]: { old: obj1[key], new: obj2[key], type: 'changed' } };
      }
      if (valuesAreObjects) {
        return { [key]: { value: getAst(obj1[key], obj2[key]), type: 'children' } };
      }
    }
    return 'error';
  });
  return ast;
};

export default (pathToFile1, pathToFile2, format = '') => {
  const content1 = fs.readFileSync(pathToFile1, 'utf8');
  const content2 = fs.readFileSync(pathToFile2, 'utf8');
  const format1 = path.extname(pathToFile1);
  const format2 = path.extname(pathToFile2);

  const obj1 = parse(content1, format1);
  const obj2 = parse(content2, format2);

  const ast = getAst(obj1, obj2);

  return render(ast, format);
};
