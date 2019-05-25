import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = fileName => path.join(__dirname, '__fixtures__', fileName);

const formats = ['.json', '.yml', '.ini'];

let result;
let resultTree;
let resultPlain;
let resultJson;

beforeAll(() => {
  result = fs.readFileSync(getFixturePath('result'), 'utf8').trim();
  resultTree = fs.readFileSync(getFixturePath('resultTree'), 'utf8').trim();
  resultPlain = fs.readFileSync(getFixturePath('resultPlain'), 'utf8').trim();
  resultJson = fs.readFileSync(getFixturePath('resultJson'), 'utf-8').trim();
});

test.each(formats)(
  'genDiff(%s)',
  (format) => {
    expect(genDiff(getFixturePath('before'.concat(format)), getFixturePath('after'.concat(format)))).toBe(result);
  },
);

test.each(formats)(
  'genDiff(%s, tree)',
  (format) => {
    expect(genDiff(getFixturePath('beforeTree'.concat(format)), getFixturePath('afterTree'.concat(format)))).toBe(resultTree);
  },
);

test.each(formats)(
  'genDiff(%s, plain)',
  (format) => {
    expect(genDiff(getFixturePath('beforeTree'.concat(format)), getFixturePath('afterTree'.concat(format)), 'plain')).toBe(resultPlain);
  },
);

test.each(formats)(
  'genDiff(%s, json)',
  (format) => {
    expect(genDiff(getFixturePath('beforeTree'.concat(format)), getFixturePath('afterTree'.concat(format)), 'json')).toBe(resultJson);
  },
);
