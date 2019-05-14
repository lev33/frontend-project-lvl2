const renderTree = (tree, tab = 1) => {
  const t = Object.values(tree);
  const keysRemoved = t[0];
  const keysAdded = t[1];
  const keysUnchanged = t[2];
  const keysChanged = t[3];
  const keysOfObjects = t[4];

  const space = tabs => ' '.repeat(tabs * 2);

  const stringify = (a, tabs) => {
    if (!(a instanceof Object)) {
      return a;
    }
    const openingSpaces = space(tabs + 2);
    const closingSpaces = space(tabs);
    return `{\n${openingSpaces}${Object.keys(a)}: ${Object.values(a)}\n${closingSpaces}}`;
  };

  const a = Object.keys(keysRemoved).reduce((acc, key) => acc.concat(`\n${space(tab)}- ${key}: ${stringify(keysRemoved[key], tab)}`), '');
  const b = Object.keys(keysAdded).reduce((acc, key) => acc.concat(`\n${space(tab)}+ ${key}: ${stringify(keysAdded[key], tab)}`), a);
  const c = Object.keys(keysUnchanged).reduce((acc, key) => acc.concat(`\n${space(tab)}  ${key}: ${stringify(keysUnchanged[key], tab)}`), b);
  const d = Object.keys(keysChanged).reduce((acc, key) => acc.concat(`\n${space(tab)}- ${key}: ${stringify(keysChanged[key].old, tab)}\n${space(tab)}+ ${key}: ${stringify(keysChanged[key].new, tab)}`), c);

  if (keysOfObjects === []) {
    return d;
  }
  const ch = Object.keys(keysOfObjects).reduce((acc, key) => acc.concat(`\n${space(tab)}  ${key}: {${renderTree(keysOfObjects[key], tab + 2)}\n${space(tab)}}`), '');
  return d + ch;
};

export default renderTree;
