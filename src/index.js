import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParse from './parsers';
import render from './formatters';

const getAst = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const union = _.union(keysObj1, keysObj2);

  const ast = union.map((key) => {
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return { removed: { key: [key], value: obj1[key] } };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { added: { key: [key], value: obj2[key] } };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const valuesAreObjects = obj1[key] instanceof Object && obj2[key] instanceof Object;
      if (!valuesAreObjects && (obj1[key] === obj2[key])) {
        return { unchanged: { key: [key], value: obj1[key] } };
      }
      if (!valuesAreObjects && (obj1[key] !== obj2[key])) {
        return { changed: { key: [key], oldValue: obj1[key], newValue: obj2[key] } };
      }
      if (valuesAreObjects) {
        return { children: { key: [key], value: getAst(obj1[key], obj2[key]) } };
      }
    }
    return 'error';
  });
  return ast;
};

export default (pathToFile1, pathToFile2, format = '') => {
  const content1 = fs.readFileSync(pathToFile1, 'utf8');
  const content2 = fs.readFileSync(pathToFile2, 'utf8');
  const parse1 = getParse(path.extname(pathToFile1));
  const parse2 = getParse(path.extname(pathToFile2));

  const obj1 = parse1(content1);
  const obj2 = parse2(content2);

  const ast = getAst(obj1, obj2);

  return render(ast, format);
};
