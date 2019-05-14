const renderPlain = (tree, prefix = '') => {
  const stringify = (a) => {
    if (!(a instanceof Object)) {
      return a;
    }
    return '[complex value]';
  };

  const t = Object.values(tree);
  const keysRemoved = t[0];
  const keysAdded = t[1];
  const keysUnchanged = t[2];
  const keysChanged = t[3];
  const keysOfObjects = t[4];
  const a = Object.keys(keysRemoved).reduce((acc, key) => acc.concat(`\nProperty '${prefix}${key}' was removed`), '');
  const b = Object.keys(keysAdded).reduce((acc, key) => acc.concat(`\nProperty '${prefix}${key}' was added with value: ${stringify(keysAdded[key])}`), a);
  const c = Object.keys(keysUnchanged).reduce((acc, key) => acc.concat(`\nProperty '${prefix}${key}' was unchanged with value: ${stringify(keysUnchanged[key])}`), b);
  const d = Object.keys(keysChanged).reduce((acc, key) => acc.concat(`\nProperty '${prefix}${key}' was updated. From ${stringify(keysChanged[key].old)} to ${stringify(keysChanged[key].new)}`), c);

  if (keysOfObjects === []) {
    return d;
  }
  const ch = Object.keys(keysOfObjects).reduce((acc, key) => acc.concat(`${renderPlain(keysOfObjects[key], (prefix === '') ? `${key}.` : `${prefix}${key}.`)}`), '');
  return d + ch;
};

export default renderPlain;
