const renderTree = (tree, tab = 1) => {
  const space = tabs => ' '.repeat(tabs * 2);

  const stringify = (a, tabs) => {
    if (!(a instanceof Object)) {
      return a;
    }
    const openingSpaces = space(tabs + 2);
    const closingSpaces = space(tabs);
    return `{\n${openingSpaces}${Object.keys(a)}: ${Object.values(a)}\n${closingSpaces}}`;
  };


  const result = tree.map((item) => {
    const [, key] = Object.keys(item);
    const [status, value] = Object.values(item);
    if (status === 'removed') {
      return `\n${space(tab)}- ${key}: ${stringify(value, tab)}`;
    }
    if (status === 'added') {
      return `\n${space(tab)}+ ${key}: ${stringify(value, tab)}`;
    }
    if (status === 'unchanged') {
      return `\n${space(tab)}  ${key}: ${stringify(value, tab)}`;
    }
    if (status === 'changed') {
      return `\n${space(tab)}- ${key}: ${stringify(value.old, tab)}\n${space(tab)}+ ${key}: ${stringify(value.new, tab)}`;
    }
    if (status === 'children') {
      return `\n${space(tab)}  ${key}: {${renderTree(value, tab + 2)}\n${space(tab)}}`;
    }
    return 'error';
  });

  return result.join('');
};

export default renderTree;
