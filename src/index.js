import fs from 'fs';
import path from 'path';
import parse from './parsers';

export default (pathToFile1, pathToFile2) => {
  const content1 = fs.readFileSync(pathToFile1, 'utf8');
  const content2 = fs.readFileSync(pathToFile2, 'utf8');
  const extname = path.extname(pathToFile1);
  const j1 = parse(content1, extname);
  const j2 = parse(content2, extname);
  const keys1 = Object.keys(j1);
  const keys2 = Object.keys(j2);
  const k1 = keys1.filter(n => !keys2.includes(n));
  const k2 = keys2.filter(n => !keys1.includes(n));
  const k3 = keys1.filter(n => keys2.includes(n));
  const a = k1.reduce((acc, n) => acc.concat(` - ${n}: ${j1[n]}\n`), '');
  const b = k2.reduce((acc, n) => acc.concat(` + ${n}: ${j2[n]}\n`), a);
  const c = k3.reduce((acc, n) => {
    const e = j1[n] === j2[n];
    return e ? acc.concat(`   ${n}: ${j1[n]}\n`) : acc.concat(` - ${n}: ${j1[n]}\n + ${n}: ${j2[n]}\n`);
  }, b);
  return `{\n${c}}`;
};
