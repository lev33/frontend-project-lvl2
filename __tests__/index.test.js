import genDiff from '../src';

test('55555', () => {
  const b = 'before.json';
  const a = 'after.json';
  expect(genDiff(b, a)).toBe('{\n - proxy: 123.234.53.22\n - follow: false\n + verbose: true\n   host: hexlet.io\n - timeout: 50\n + timeout: 20\n}');
});
