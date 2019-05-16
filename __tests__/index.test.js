import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

let result;
let resultTree;
let resultPlain;
let resultJson;

beforeAll(() => {
  result = fs.readFileSync(getFixturePath('result'), 'utf8').trim();
  resultTree = fs.readFileSync(getFixturePath('resultTree'), 'utf8').trim();
  resultPlain = fs.readFileSync(getFixturePath('resultPlain'), 'utf8').trimEnd();
  resultJson = fs.readFileSync(getFixturePath('resultJson'), 'utf8').trim();
});

test.each([
  [getFixturePath('before.json'), getFixturePath('after.json')],
  [getFixturePath('before.yml'), getFixturePath('after.yml')],
  [getFixturePath('before.ini'), getFixturePath('after.ini')],
])(
  'genDiff(%s, %s)',
  (a, b) => {
    expect(genDiff(a, b)).toBe(result);
  },
);

test.each([
  [getFixturePath('beforeTree.json'), getFixturePath('afterTree.json')],
  [getFixturePath('beforeTree.yml'), getFixturePath('afterTree.yml')],
  [getFixturePath('beforeTree.ini'), getFixturePath('afterTree.ini')],
])(
  'genDiff(%s, %s, tree)',
  (a, b) => {
    expect(genDiff(a, b)).toBe(resultTree);
  },
);

test.each([
  [getFixturePath('beforeTree.json'), getFixturePath('afterTree.json')],
  [getFixturePath('beforeTree.yml'), getFixturePath('afterTree.yml')],
  [getFixturePath('beforeTree.ini'), getFixturePath('afterTree.ini')],
])(
  'genDiff(%s, %s, plain)',
  (a, b) => {
    expect(genDiff(a, b, 'plain')).toBe(resultPlain);
  },
);

test.each([
  [getFixturePath('beforeTree.json'), getFixturePath('afterTree.json')],
  [getFixturePath('beforeTree.yml'), getFixturePath('afterTree.yml')],
  [getFixturePath('beforeTree.ini'), getFixturePath('afterTree.ini')],
])(
  'genDiff(%s, %s, json)',
  (a, b) => {
    expect(genDiff(a, b, 'json')).toBe(resultJson);
  },
);
