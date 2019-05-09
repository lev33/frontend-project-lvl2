// import path from 'path';
// import fs from 'fs';
import genDiff from '../src';

// const result = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');

// console.log(result);

test('555', () => {
  expect(genDiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json')).toBe('{\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n}');
});

test.each([
  ['__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json', '{\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n}'],
  ['__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml', '{\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n}'],
  ['__tests__/__fixtures__/before.ini', '__tests__/__fixtures__/after.ini', '{\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n}'],
])(
  '.genDiff(%s, %s)',
  (a, b, expected) => {
    expect(genDiff(a, b)).toBe(expected);
  },
);
