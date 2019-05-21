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

    switch (value.type) {
      case 'removed':
        return `${space(tab)}- ${key}: ${stringify(value.value, tab)}`;
      case 'added':
        return `${space(tab)}+ ${key}: ${stringify(value.value, tab)}`;
      case 'unchanged':
        return `${space(tab)}  ${key}: ${stringify(value.value, tab)}`;
      case 'changed':
        return `${space(tab)}- ${key}: ${stringify(value.old, tab)}\n${space(tab)}+ ${key}: ${stringify(value.new, tab)}`;
      case 'children':
        return `${space(tab)}  ${key}: {\n${render(value.value, tab + 2)}\n${space(tab)}}`;
      default:
        return 'Error: missing selector';
    }
  });

  return result.join('\n');
};

const renderTree = tree => `{\n${render(tree)}\n}`;

export default renderTree;
