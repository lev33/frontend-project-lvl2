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
  resultJson = fs.readFileSync(getFixturePath('resultJson'), 'utf-8').trim();
});

test.each([
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
])(
  'genDiff(%s, %s)',
  (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b))).toBe(result);
  },
);

test.each([
  ['beforeTree.json', 'afterTree.json'],
  ['beforeTree.yml', 'afterTree.yml'],
  ['beforeTree.ini', 'afterTree.ini'],
])(
  'genDiff(%s, %s, tree)',
  (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b))).toBe(resultTree);
  },
);

test.each([
  ['beforeTree.json', 'afterTree.json'],
  ['beforeTree.yml', 'afterTree.yml'],
  ['beforeTree.ini', 'afterTree.ini'],
])(
  'genDiff(%s, %s, plain)',
  (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'plain')).toBe(resultPlain);
  },
);

test.each([
  ['beforeTree.json', 'afterTree.json'],
  ['beforeTree.yml', 'afterTree.yml'],
  ['beforeTree.ini', 'afterTree.ini'],
])(
  'genDiff(%s, %s, json)',
  (a, b) => {
    expect(genDiff(getFixturePath(a), getFixturePath(b), 'json')).toBe(resultJson);
  },
);
