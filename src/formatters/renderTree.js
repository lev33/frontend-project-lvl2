const render = (tree, tab = 1) => {
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
    const [key] = Object.keys(item);
    const [value] = Object.values(item);
    if (value.type === 'removed') {
      return `${space(tab)}- ${key}: ${stringify(value.value, tab)}`;
    }
    if (value.type === 'added') {
      return `${space(tab)}+ ${key}: ${stringify(value.value, tab)}`;
    }
    if (value.type === 'unchanged') {
      return `${space(tab)}  ${key}: ${stringify(value.value, tab)}`;
    }
    if (value.type === 'changed') {
      return `${space(tab)}- ${key}: ${stringify(value.old, tab)}\n${space(tab)}+ ${key}: ${stringify(value.new, tab)}`;
    }
    if (value.type === 'children') {
      return `${space(tab)}  ${key}: {\n${render(value.value, tab + 2)}\n${space(tab)}}`;
    }
    return 'error';
  });

  return result.join('\n');
};

const renderTree = tree => `{\n${render(tree)}\n}`;

export default renderTree;
